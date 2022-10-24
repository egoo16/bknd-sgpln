import { entity } from './../../models/sinafip/entity.entity';
import {
    requestEntity,
    institutionEntity,
    investmentProjectEntity,
    studyDescriptionEntity,
    delimitEntity,
    requiredDocumentEntity,
    stimatedBudgetEntity,
    activitiesEntity
} from '../../models/sinafip';
import { Request, Response } from 'express';
import models from "../../db/connection";
import moment from 'moment';
import { admissionQuanty } from '../../models/sinafip/admisionQualification';
import { povertyIndex } from '../../models/sinafip/povertyIndex.entity';



export async function createRequestSinafip(req: Request, res: Response) {
    // let transaction = await models.transaction()
    try {
        let allActivities: any = []
        let { status, author, institution, investment, studyDescription, delimit, requirementsDocuments } = req.body;
        status = 'CREADA';
        const created = moment().format('L');
        const { totalStimated, activities } = requirementsDocuments.stimatedBudget
        const requestCreated = await requestEntity.create({ status, author, created });
        const institutionCreated = await institutionEntity.create({ ...institution, requestId: requestCreated.id });
        const investmentCreated = await investmentProjectEntity.create({ ...investment, requestId: requestCreated.id });
        const studyDescriptionCreated = await studyDescriptionEntity.create({ ...studyDescription, requestId: requestCreated.id });
        const delimitCreated = await delimitEntity.create({ ...delimit, requestId: requestCreated.id });
        const requiredDocumentCreated = await requiredDocumentEntity.create({ requestId: requestCreated.id });
        const stimatedBugdetCreated = await stimatedBudgetEntity.create({ totalStimated, docId: requiredDocumentCreated.id })


        if (activities?.length > 0) {
            const allData = await Promise.all(activities.map(async (activity: any) => {
                const res = await activitiesEntity.create({ ...activity, stimatedId: stimatedBugdetCreated.id });
                return res;
            }));
            allActivities = [...allData];
        }

        let reqStruct = {
            id: requestCreated.id,
            result: requestCreated.result,
            status: requestCreated.status,
            author: requestCreated.author,
            advser: requestCreated.advser,
            reviewd: requestCreated.reviewd,
            created: requestCreated.created,
        }

        const response = {
            request: {
                ...reqStruct,
                institution: institutionCreated,
                investment: investmentCreated,
                studyDescription: studyDescriptionCreated,
                delimit: delimitCreated,
                requirementsDocuments: {
                    id: requiredDocumentCreated.id,
                    stimatedBudget: {
                        id: stimatedBugdetCreated.id,
                        totalStimated: stimatedBugdetCreated.totalStimated,
                        activities: allActivities
                    }

                }
            },

        }
        // transaction.commit()
        return res.status(201).send(response)
    } catch (error: any) {
        //transaction.rollback()
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}


export async function getAllRequest(req: Request, res: Response) {

    try {
        const requests = await requestEntity.findAll();

        let stimatedBudget = null;
        let requirementsDocuments: any = null;

        const allRequest = await Promise.all(requests.map(async (request: any) => {
            const institution = await institutionEntity.findOne({ where: { requestId: request.id } });
            const investment = await investmentProjectEntity.findOne({ where: { requestId: request.id } });
            const studyDescription = await studyDescriptionEntity.findOne({ where: { requestId: request.id } });
            const addmision = await admissionQuanty.findOne({ where: { requestId: request.id } })

            const delimit = await delimitEntity.findOne({ where: { requestId: request.id } });
            const requirementsDocumentsGet = await requiredDocumentEntity.findOne({ where: { requestId: request.id } });

            if (requirementsDocumentsGet) {

                const stimatedBudgetGet = await stimatedBudgetEntity.findOne({ where: { docId: requirementsDocumentsGet.id }, });

                const getActivities = await activitiesEntity.findAll({ where: { stimatedId: stimatedBudgetGet.id } })
                let stimatedBudget = {
                    id: stimatedBudgetGet.id,
                    totalStimated: stimatedBudgetGet.totalStimated,
                    docId: stimatedBudgetGet.docId,
                    activities: getActivities
                }

                requirementsDocuments = {
                    id: requirementsDocumentsGet.id,
                    tdr: requirementsDocumentsGet.tdr,
                    scheduleActiv: requirementsDocumentsGet.scheduleActiv,
                    requestId: requirementsDocumentsGet.requestId,
                    stimatedBudget
                }
            }

            let reqStruct = {
                id: request.id,
                result: request.result,
                status: request.status,
                author: request.author,
                advser: request.advser,
                reviewd: request.reviewd,
                created: request.created,
            }


            if (addmision) {
                return {
                    ...reqStruct,
                    institution,
                    investment,
                    studyDescription,
                    delimit,
                    requirementsDocuments,
                    admissionQuanty: addmision
                };
            } else {
                return {
                    ...reqStruct,
                    institution,
                    investment,
                    studyDescription,
                    delimit,
                    requirementsDocuments
                };
            }


        }));

        const finalAllRequest = allRequest.sort((a, b) => a.created - b.created)


        return res.status(201).send({
            msg: 'Datos Obtenidos',
            data: finalAllRequest
        })


    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}

export async function getOneRequest(req: Request, res: Response) {

    try {
        const { id } = req.params

        if (id) {
            const response = await getSolicitudCompleta(id);
            return res.status(201).send(response);
        } else {
            res.status(500).send({
                msj: 'No se encontro la solicitud con ID: ' + id
            });
        }


    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}
export async function updateState(req: Request, res: Response) {
    try {
        let statusOptions = ['reception', 'analysis', 'denied'];
        let idSolicitud = req.params.id;
        let banderaSolicitud = req.params.status;
        if (idSolicitud) {
            let getSolicitud = await requestEntity.findOne({
                where: {
                    id: idSolicitud
                }
            });
            if (getSolicitud) {
                if (banderaSolicitud) {
                    let statusFount = statusOptions.find((e: any) => banderaSolicitud == e);
                    if (statusFount) {
                        if (banderaSolicitud == 'reception') {
                            getSolicitud.status = 'EN RECEPCIÓN';
                        }
                        if (banderaSolicitud == 'analysis') {
                            getSolicitud.status = 'EN ANÁLISIS';
                        }
                        if (banderaSolicitud == 'denied') {
                            getSolicitud.status = 'RECHAZADA';
                        }

                        await getSolicitud.save();

                        let solicitud = await getSolicitudCompleta(getSolicitud.id)
                        res.status(200).send({
                            solicitud
                        });
                    } else {
                        res.status(404).send({
                            msj: 'El estado que se envío no pertenece a las opciones validas: ' + banderaSolicitud
                        });
                    }
                }
            } else {
                res.status(500).send({
                    msj: 'No se encontro la solicitud con ID: ' + idSolicitud
                });
            }
        } else {
            res.status(400).send({
                msj: 'Es necesario enviar un ID'
            });
        }


    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
    }
}

export async function createAdmissionQuanty(req: Request, res: Response) {
    try {

        let idSolicitud = req.params.id;
        if (idSolicitud) {
            let getSolicitud = await requestEntity.findOne({
                where: {
                    id: idSolicitud
                }
            });
            if (getSolicitud) {

                if (req.body.total >= 60) {
                    getSolicitud.result = 'ADMITIDA'
                } else {
                    getSolicitud.result = 'NO ADMITIDA'
                }
                await getSolicitud.save()
                let admissionObj = req.body;
                admissionObj.requestId = idSolicitud;
                const admissionCreated = await admissionQuanty.create(admissionObj);
                const response = await getSolicitudCompleta(idSolicitud);
                return res.status(201).send(response);
            } else {
                res.status(500).send({
                    msj: 'No se encontro la solicitud con ID: ' + idSolicitud
                });
            }
        } else {
            res.status(400).send({
                msj: 'Es necesario enviar un ID'
            });
        }


        // transaction.commit()
        // return res.status(201).send(response)
    } catch (error: any) {
        //transaction.rollback()
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}

export async function createPriorizationMatrix(req: Request, res: Response) {
    try {

        let idSolicitud = req.params.id;
        if (idSolicitud) {
            let getSolicitud = await getSolicitudCompleta(idSolicitud)

            if (getSolicitud) {

                let admission = getSolicitud.admissionQuanty;
                if (admission) {



                    let value1 = 20;
                    let value2 = admission.objetivesGoalsValue;
                    let value3 = admission.numberBeneficiariesValue * 2;
                    let value5 = 20

                    let indice = await getIndiceByMunicipio(getSolicitud.delimit.municipality);

                    let totalvalueIndice = await verifyIndiceTotal(indice.indice);
                    let value4 = totalvalueIndice;
                    let prioritizationMatrix = {
                        value1,
                        value2,
                        value3,
                        value5,
                        value4,
                    }

                    res.status(200).json({
                        msg: "Matriz Generada",
                        data: prioritizationMatrix,
                    });


                } else {
                    res.status(500).send({
                        msj: 'No se encontro la una Matriz de Admision otorgada con ID: ' + idSolicitud
                    });
                }


            } else {
                res.status(500).send({
                    msj: 'No se encontro la solicitud con ID: ' + idSolicitud
                });
            }
        } else {
            res.status(400).send({
                msj: 'Es necesario enviar un ID'
            });
        }


        // transaction.commit()
        // return res.status(201).send(response)
    } catch (error: any) {
        //transaction.rollback()
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}

async function getIndiceByMunicipio(municipio: string) {
    try {
        let mncipio;
        // let query = `DELETE FROM "povertyIndex"`;

        // let resultado;
        // await models.query(query).spread((result: any) => { resultado = result; }).catch((error: any) => {
        // });

        // console.log(resultado)
        let municipios = await povertyIndex.findAll();
        if (municipios?.length <= 0) {

            let resMuni = await Promise.all(indicesProbreza.map(async (indexMuni: any) => {
                let res = await povertyIndex.create(indexMuni);
            }));

            mncipio = await povertyIndex.findOne({
                where: {
                    name: municipio
                }
            });

            if (mncipio) { return mncipio }
            else {
                throw `Error al obtener Indices de Pobreza para : ${municipio}`;
            }
        } else {
            mncipio = await povertyIndex.findOne({
                where: {
                    name: municipio
                }
            });
            if (mncipio) { return mncipio }
            else {
                throw `Error al obtener Indices de Pobreza para : ${municipio}`;
            }
        }

    } catch (error: any) {
        //transaction.rollback()
        throw `Error al obtener Indices de Pobreza: ${error}`;
    }

}

async function verifyIndiceTotal(indice: any) {
    try {
        if (indice >= 20){
            return 20;
        } else if (indice >= 10 || indice <= 19.99){
            return 10;
        } else if (indice <= 9.99) {
            return 7;
        }

    } catch (error: any) {
        //transaction.rollback()
        throw `Error al obtener Indices de Pobreza: ${error}`;
    }

}


async function getSolicitudCompleta(idSolicitud: string) {
    try {
        const request = await requestEntity.findOne({ where: { id: idSolicitud } });
        if (request) {
            const institution = await institutionEntity.findOne({ where: { requestId: request.id } });
            const investment = await investmentProjectEntity.findOne({ where: { requestId: request.id } });
            const studyDescription = await studyDescriptionEntity.findOne({ where: { requestId: request.id } });
            const delimit = await delimitEntity.findOne({ where: { requestId: request.id } });
            const requiredDoc = await requiredDocumentEntity.findOne({ where: { requestId: request.id } });
            const addmision = await admissionQuanty.findOne({ where: { requestId: request.id } })
            const stimated = await stimatedBudgetEntity.findOne({ where: { docId: requiredDoc.id } })
            const activ = await activitiesEntity.findAll({ where: { stimatedId: stimated.id } })
            let reqStruct = {
                id: request.id,
                result: request.result,
                status: request.status,
                author: request.author,
                advser: request.advser,
                reviewd: request.reviewd,
                created: request.created,
            }
            const response: any = {
                ...reqStruct,
                institution,
                investment,
                studyDescription,
                delimit,
                requiredDocuments: {
                    id: requiredDoc.id,
                    tdr: requiredDoc.tdr,
                    scheduleActiv: requiredDoc.scheduleActiv,
                    stimatedBudget: {
                        id: stimated.id,
                        totalStimated: stimated.totalStimated,
                        activities: activ
                    }
                },
            }
            if (addmision) {
                response.admissionQuanty = addmision;
            }

            return response;
        } else {
            throw `Solicitud no encontrada`;
        }

    } catch (error) {
        throw `Error al obtener solicitud: ${error}`;
    }

}


const indicesProbreza = [
    { name: 'El Progreso', indice: 6.11, isMunicipio: false },

    { name: 'Guastatoya', indice: 2.88, isMunicipio: true },
    { name: 'Morazán', indice: 4.62, isMunicipio: true },
    { name: 'San Agustín Acasaguastlán', indice: 12.67, isMunicipio: true },
    { name: 'San Cristóbal Acasaguastlán', indice: 6.23, isMunicipio: true },
    { name: 'El Jícaro', indice: 7.60, isMunicipio: true },
    { name: 'Sansare', indice: 15.71, isMunicipio: true },
    { name: 'Sanarate', indice: 6.71, isMunicipio: true },
    { name: 'San Antonio La Paz', indice: 11.22, isMunicipio: true },

    { name: 'Sacatepéquez', indice: 11.40, isMunicipio: false },

    { name: 'Antigua Guatemala', indice: 9.27, isMunicipio: true },
    { name: 'Jocotenango', indice: 7.05, isMunicipio: true },
    { name: 'Pastores', indice: 4.64, isMunicipio: true },
    { name: 'Sumpango', indice: 20.91, isMunicipio: true },
    { name: 'Santo Domingo Xenacoj', indice: 21.25, isMunicipio: true },
    { name: 'San Bartolomé Milpas Altas', indice: 0.91, isMunicipio: true },
    { name: 'Magdalena Milpas Altas', indice: 13.49, isMunicipio: true },
    { name: 'Santa Maria De Jesus', indice: 21.10, isMunicipio: true },
    { name: 'Ciudad Vieja', indice: 4.65, isMunicipio: true },
    { name: 'Alotenango', indice: 4.05, isMunicipio: true },
    { name: 'Santa Catarina Barahona', indice: 9.78, isMunicipio: true },

    { name: 'Chimaltenango', indice: 16.37, isMunicipio: false },

    { name: 'Chimaltenango', indice: 19.76, isMunicipio: true },
    { name: 'San José Poaquil', indice: 13.46, isMunicipio: true },
    { name: 'San Martín Jilotepeque', indice: 17.30, isMunicipio: true },
    { name: 'Comalapa', indice: 7.00, isMunicipio: true },
    { name: 'Santa Apolonia', indice: 27.76, isMunicipio: true },
    { name: 'Tecpán Guatemala', indice: 20.96, isMunicipio: true },
    { name: 'Patzún', indice: 9.61, isMunicipio: true },
    { name: 'Pochuta', indice: 31.06, isMunicipio: true },
    { name: 'Patzicia', indice: 11.58, isMunicipio: true },
    { name: 'Santa Cruz Balanyá', indice: 5.71, isMunicipio: true },
    { name: 'Acatenango', indice: 16.59, isMunicipio: true },
    { name: 'Yepocapa', indice: 24.45, isMunicipio: true },
    { name: 'San Andrés Itzapa', indice: 20.05, isMunicipio: true },
    { name: 'Parramos', indice: 17.14, isMunicipio: true },
    { name: 'Zaragoza', indice: 11.59, isMunicipio: true },
    { name: 'El Tejar', indice: 21.73, isMunicipio: true },

    { name: 'Escuintla', indice: 3.04, isMunicipio: false },

    { name: 'Escuintla', indice: 5.49, isMunicipio: true },
    { name: 'Santa Lucáa Cotzumalguapa', indice: 4.91, isMunicipio: true },
    { name: 'La Democracia', indice: 1.40, isMunicipio: true },
    { name: 'Siquinalá', indice: 9.22, isMunicipio: true },
    { name: 'Masagua', indice: 6.48, isMunicipio: true },
    { name: 'Tiquisate', indice: 2.87, isMunicipio: true },
    { name: 'La Gomera', indice: 3.53, isMunicipio: true },
    { name: 'Guanagazapa', indice: 16.17, isMunicipio: true },
    { name: 'San José', indice: 1.39, isMunicipio: true },
    { name: 'Iztapa', indice: 2.21, isMunicipio: true },
    { name: 'Palín', indice: 3.06, isMunicipio: true },
    { name: 'San Vicente Pacaya', indice: 2.77, isMunicipio: true },
    { name: 'Nueva Concepción', indice: 4.95, isMunicipio: true },

    { name: 'Santa Rosa', indice: 14.27, isMunicipio: false },

    { name: 'Cuilapa', indice: 11.05, isMunicipio: true },
    { name: 'Barberena', indice: 6.03, isMunicipio: true },
    { name: 'Santa Rosa De Lima', indice: 8.72, isMunicipio: true },
    { name: 'Casillas', indice: 10.47, isMunicipio: true },
    { name: 'San Rafael Las Flores', indice: 11.08, isMunicipio: true },
    { name: 'Oratorio', indice: 15.97, isMunicipio: true },
    { name: 'San Juan Tecuaco', indice: 19.64, isMunicipio: true },
    { name: 'Chiquimulilla', indice: 15.94, isMunicipio: true },
    { name: 'Taxisco', indice: 13.84, isMunicipio: true },
    { name: 'Santa Maráa Ixhuatán', indice: 19.36, isMunicipio: true },
    { name: 'Guazacapán', indice: 10.25, isMunicipio: true },
    { name: 'Santa Cruz Naranjo', indice: 8.12, isMunicipio: true },
    { name: 'Pueblo Nuevo Viñas', indice: 15.41, isMunicipio: true },
    { name: 'Nueva Santa Rosa', indice: 13.17, isMunicipio: true },

    { name: 'Sololá', indice: 14.57, isMunicipio: false },

    { name: 'Sololá', indice: 17.40, isMunicipio: true },
    { name: 'San José Chacayá', indice: 6.30, isMunicipio: true },
    { name: 'Santa María Visitación', indice: 13.45, isMunicipio: true },
    { name: 'Santa Lucía Utatlán', indice: 17.29, isMunicipio: true },
    { name: 'Nahualá', indice: 13.13, isMunicipio: true },
    { name: 'Santa Catarina Ixtahuacán', indice: 12.84, isMunicipio: true },
    { name: 'Santa Clara La Laguna', indice: 7.25, isMunicipio: true },
    { name: 'Concepción', indice: 8.65, isMunicipio: true },
    { name: 'San Andrés Semetabaj', indice: 19.17, isMunicipio: true },
    { name: 'Panajachel', indice: 11.15, isMunicipio: true },
    { name: 'Santa Catarina Palopó', indice: 28.17, isMunicipio: true },
    { name: 'San Antonio Palopó', indice: 14.72, isMunicipio: true },
    { name: 'San Lucas Tolimán', indice: 29.42, isMunicipio: true },
    { name: 'Santa Cruz La Laguna', indice: 30.78, isMunicipio: true },
    { name: 'San Juan La Laguna', indice: 9.72, isMunicipio: true },
    { name: 'San Pedro La Laguna', indice: 8.22, isMunicipio: true },
    { name: 'Santiago Atitlán', indice: 43.74, isMunicipio: true },

    { name: 'Totonicapán', indice: 24.50, isMunicipio: false },

    { name: 'Totonicapán', indice: 22.58, isMunicipio: true },
    { name: 'San Cristóbal Totonicapán', indice: 18.89, isMunicipio: true },
    { name: 'San Francisco El Alto', indice: 20.21, isMunicipio: true },
    { name: 'San Andrés Xecul', indice: 22.16, isMunicipio: true },
    { name: 'Momostenango', indice: 46.97, isMunicipio: true },
    { name: 'Santa María Chiquimula', indice: 30.91, isMunicipio: true },
    { name: 'Santa Lucía La Reforma', indice: 70.13, isMunicipio: true },
    { name: 'San Bartolo Aguas Calientes', indice: 35.79, isMunicipio: true },

    { name: 'Quetzaltenango', indice: 17.31, isMunicipio: false },

    { name: 'Quetzaltenango', indice: 15.73, isMunicipio: true },
    { name: 'San Carlos Sija', indice: 13.10, isMunicipio: true },
    { name: 'Cabrican', indice: 15.57, isMunicipio: true },
    { name: 'Cajolá', indice: 54.75, isMunicipio: true },
    { name: 'San Miguel Siguilá', indice: 39.26, isMunicipio: true },
    { name: 'Ostuncalco', indice: 39.47, isMunicipio: true },
    { name: 'Concepción Chiquirichapa', indice: 11.43, isMunicipio: true },
    { name: 'San Martín Sacatepéquez', indice: 21.05, isMunicipio: true },
    { name: 'Cantel', indice: 22.70, isMunicipio: true },
    { name: 'Huitán', indice: 16.52, isMunicipio: true },
    { name: 'Colomba', indice: 13.32, isMunicipio: true },
    { name: 'San Francisco La Unión', indice: 26.62, isMunicipio: true },
    { name: 'El Palmar', indice: 8.95, isMunicipio: true },
    { name: 'Coatepeque', indice: 15.71, isMunicipio: true },
    { name: 'Génova', indice: 25.72, isMunicipio: true },
    { name: 'Flores Costa Cuca', indice: 9.33, isMunicipio: true },
    { name: 'Palestina De Los Altos', indice: 22.72, isMunicipio: true },

    { name: 'Suchitepéquez', indice: 29.53, isMunicipio: false },

    { name: 'Mazatenango', indice: 35.20, isMunicipio: true },
    { name: 'Cuyotenango', indice: 23.76, isMunicipio: true },
    { name: 'San Francisco Zapotitlán', indice: 18.66, isMunicipio: true },
    { name: 'San Bernardino', indice: 5.46, isMunicipio: true },
    { name: 'San José El Ídolo', indice: 23.16, isMunicipio: true },
    { name: 'Santo Domingo Suchitepéquez', indice: 16.08, isMunicipio: true },
    { name: 'San Lorenzo', indice: 50.52, isMunicipio: true },
    { name: 'Samayac', indice: 17.12, isMunicipio: true },
    { name: 'San Pablo Jocopilas', indice: 10.08, isMunicipio: true },
    { name: 'San Antonio Suchitepéquez', indice: 11.32, isMunicipio: true },
    { name: 'San Miguel Panán', indice: 11.58, isMunicipio: true },
    { name: 'San Gabriel', indice: 36.50, isMunicipio: true },
    { name: 'Chicacao', indice: 76.60, isMunicipio: true },
    { name: 'Patulul', indice: 33.18, isMunicipio: true },
    { name: 'Santa Bárbara', indice: 37.54, isMunicipio: true },
    { name: 'San Juan Bautista', indice: 20.11, isMunicipio: true },
    { name: 'Santo Tomás La Unión', indice: 26.89, isMunicipio: true },
    { name: 'Zunilito', indice: 12.97, isMunicipio: true },
    { name: 'Pueblo Nuevo', indice: 52.53, isMunicipio: true },
    { name: 'Rio Bravo', indice: 37.57, isMunicipio: true },

    { name: 'Retalhuleu', indice: 15.04, isMunicipio: false },

    { name: 'Retalhuleu', indice: 13.90, isMunicipio: true },
    { name: 'Santa Cruz Muluá', indice: 10.72, isMunicipio: true },
    { name: 'San Andres Villa Seca', indice: 6.58, isMunicipio: true },
    { name: 'Champerico', indice: 13.61, isMunicipio: true },
    { name: 'Nuevo San Carlos', indice: 17.44, isMunicipio: true },
    { name: 'El Asintal', indice: 24.61, isMunicipio: true },

    { name: 'San Marcos', indice: 18.73, isMunicipio: false },

    { name: 'San Marcos', indice: 2.36, isMunicipio: true },
    { name: 'San Pedro Sacatepéquez', indice: 3.85, isMunicipio: true },
    { name: 'San Antonio Sacatepéquez', indice: 4.23, isMunicipio: true },
    { name: 'Comitancillo', indice: 26.62, isMunicipio: true },
    { name: 'San Miguel Ixtahuacán', indice: 27.87, isMunicipio: true },
    { name: 'Concepción Tutuapa', indice: 37.42, isMunicipio: true },
    { name: 'Tacaná', indice: 37.85, isMunicipio: true },
    { name: 'Sibinal', indice: 46.91, isMunicipio: true },
    { name: 'Tajumulco', indice: 21.43, isMunicipio: true },
    { name: 'Tejutla', indice: 40.98, isMunicipio: true },
    { name: 'San Rafael Pie De La Cuesta', indice: 9.37, isMunicipio: true },
    { name: 'Nuevo Progreso', indice: 24.05, isMunicipio: true },
    { name: 'El Tumbador', indice: 14.34, isMunicipio: true },
    { name: 'El Rodeo', indice: 30.26, isMunicipio: true },
    { name: 'Malacatán', indice: 18.42, isMunicipio: true },
    { name: 'Catarina', indice: 15.54, isMunicipio: true },
    { name: 'Ayutla', indice: 1.40, isMunicipio: true },
    { name: 'Ocós', indice: 10.44, isMunicipio: true },
    { name: 'San Pablo', indice: 14.37, isMunicipio: true },
    { name: 'El Quetzal', indice: 27.11, isMunicipio: true },
    { name: 'La Reforma', indice: 30.85, isMunicipio: true },
    { name: 'Pajapita', indice: 22.67, isMunicipio: true },
    { name: 'Ixchiguán', indice: 27.57, isMunicipio: true },
    { name: 'San José Ojetenam', indice: 53.85, isMunicipio: true },
    { name: 'San Cristóbal Cucho', indice: 16.89, isMunicipio: true },
    { name: 'Sipacapa', indice: 36.74, isMunicipio: true },
    { name: 'Esquipulas Palo Gordo', indice: 11.56, isMunicipio: true },
    { name: 'Río Blanco', indice: 7.08, isMunicipio: true },
    { name: 'San Lorenzo', indice: 33.81, isMunicipio: true },

    { name: 'Huehuetenango', indice: 11.27, isMunicipio: false },

    { name: 'Huehuetenango', indice: 1.69, isMunicipio: true },
    { name: 'Chiantla', indice: 8.99, isMunicipio: true },
    { name: 'Malacatancito', indice: 9.15, isMunicipio: true },
    { name: 'Cuilco', indice: 16.79, isMunicipio: true },
    { name: 'Nentón', indice: 17.86, isMunicipio: true },
    { name: 'San Pedro Necta', indice: 10.17, isMunicipio: true },
    { name: 'Jacaltenango', indice: 8.52, isMunicipio: true },
    { name: 'Soloma', indice: 9.91, isMunicipio: true },
    { name: 'San Ildefonso Ixtahuacán', indice: 23.04, isMunicipio: true },
    { name: 'Santa Bárbara', indice: 15.89, isMunicipio: true },
    { name: 'La Libertad', indice: 14.28, isMunicipio: true },
    { name: 'La Democracia', indice: 15.00, isMunicipio: true },
    { name: 'San Miguel Acatán', indice: 22.47, isMunicipio: true },
    { name: 'San Rafael La Independencia', indice: 31.16, isMunicipio: true },
    { name: 'Todos Santos Cuchumatán', indice: 6.54, isMunicipio: true },
    { name: 'San Juan Atitán', indice: 8.34, isMunicipio: true },
    { name: 'Santa Eulalia', indice: 7.77, isMunicipio: true },
    { name: 'San Mateo Ixtatán', indice: 9.72, isMunicipio: true },
    { name: 'Colotenango', indice: 16.78, isMunicipio: true },
    { name: 'San Sebastían Huehuetenango', indice: 8.99, isMunicipio: true },
    { name: 'Tectitán', indice: 12.40, isMunicipio: true },
    { name: 'Concepción Huista', indice: 16.66, isMunicipio: true },
    { name: 'San Juan Ixcoy', indice: 18.92, isMunicipio: true },
    { name: 'San Antonio Huista', indice: 13.86, isMunicipio: true },
    { name: 'San Sebastián Coatán', indice: 6.41, isMunicipio: true },
    { name: 'Barillas', indice: 5.76, isMunicipio: true },
    { name: 'Aguacatán', indice: 2.43, isMunicipio: true },
    { name: 'San Rafael Petzal', indice: 2.88, isMunicipio: true },
    { name: 'San Gaspar Ixchil', indice: 33.06, isMunicipio: true },
    { name: 'Santiago Chimaltenango', indice: 18.94, isMunicipio: true },
    { name: 'Santa Ana Huista', indice: 9.93, isMunicipio: true },
    { name: 'Union Cantinil', indice: 15.92, isMunicipio: true },

    { name: 'Quiché', indice: 20.15, isMunicipio: false },

    { name: 'Santa Cruz Del Quiché', indice: 15.49, isMunicipio: true },
    { name: 'Chiché', indice: 10.73, isMunicipio: true },
    { name: 'Chinique', indice: 31.93, isMunicipio: true },
    { name: 'Zacualpa', indice: 23.44, isMunicipio: true },
    { name: 'Chajul', indice: 26.78, isMunicipio: true },
    { name: 'Chichicastenango', indice: 28.44, isMunicipio: true },
    { name: 'Patzité', indice: 26.52, isMunicipio: true },
    { name: 'San Antonio Ilotenango', indice: 9.94, isMunicipio: true },
    { name: 'San Pedro Jocopilas', indice: 9.60, isMunicipio: true },
    { name: 'Cunén', indice: 9.18, isMunicipio: true },
    { name: 'San Juan Cotzal', indice: 67.34, isMunicipio: true },
    { name: 'Joyabaj', indice: 32.16, isMunicipio: true },
    { name: 'Nebaj', indice: 12.11, isMunicipio: true },
    { name: 'San Andrés Sajcabaja', indice: 21.41, isMunicipio: true },
    { name: 'Uspantán', indice: 19.29, isMunicipio: true },
    { name: 'Sacapulas', indice: 22.71, isMunicipio: true },
    { name: 'San Bartolomé Jocotenango', indice: 55.86, isMunicipio: true },
    { name: 'Canillá', indice: 17.76, isMunicipio: true },
    { name: 'Chicamán', indice: 21.49, isMunicipio: true },
    { name: 'Ixcán', indice: 16.85, isMunicipio: true },
    { name: 'Pachalum', indice: 55.40, isMunicipio: true },

    { name: 'Baja Verapaz', indice: 27.30, isMunicipio: false },

    { name: 'Salamá', indice: 16.82, isMunicipio: true },
    { name: 'San Miguel Chicaj', indice: 25.36, isMunicipio: true },
    { name: 'Rabinal', indice: 17.27, isMunicipio: true },
    { name: 'Cubulco', indice: 16.78, isMunicipio: true },
    { name: 'Granados', indice: 16.78, isMunicipio: true },
    { name: 'El Chol', indice: 6.54, isMunicipio: true },
    { name: 'San Jerónimo', indice: 16.10, isMunicipio: true },
    { name: 'Purulhá', indice: 71.34, isMunicipio: true },

    { name: 'Alta Verapaz', indice: 46.65, isMunicipio: false },

    { name: 'Cobán', indice: 25.52, isMunicipio: true },
    { name: 'Santa Cruz Verapaz', indice: 37.13, isMunicipio: true },
    { name: 'San Cristóbal Verapaz', indice: 53.59, isMunicipio: true },
    { name: 'Tactic', indice: 10.07, isMunicipio: true },
    { name: 'Tamahú', indice: 50.31, isMunicipio: true },
    { name: 'Tucurú', indice: 65.09, isMunicipio: true },
    { name: 'Panzós', indice: 75.75, isMunicipio: true },
    { name: 'Senahú', indice: 27.95, isMunicipio: true },
    { name: 'San Pedro Carchá', indice: 45.59, isMunicipio: true },
    { name: 'San Juan Chamelco', indice: 3.08, isMunicipio: true },
    { name: 'Lanquín', indice: 28.75, isMunicipio: true },
    { name: 'Cahabón', indice: 26.28, isMunicipio: true },
    { name: 'Chisec', indice: 65.45, isMunicipio: true },
    { name: 'Chahal', indice: 11.99, isMunicipio: true },
    { name: 'Fray Bartolomé De Las Casas', indice: 39.81, isMunicipio: true },
    { name: 'Santa Catalina La Tinta', indice: 61.24, isMunicipio: true },
    { name: 'Raxruha', indice: 36.68, isMunicipio: true },

    { name: 'Petén', indice: 19.79, isMunicipio: false },

    { name: 'Flores', indice: 11.16, isMunicipio: true },
    { name: 'San José', indice: 31.95, isMunicipio: true },
    { name: 'San Benito', indice: 16.21, isMunicipio: true },
    { name: 'San Andrés', indice: 19.82, isMunicipio: true },
    { name: 'La Libertad', indice: 13.72, isMunicipio: true },
    { name: 'San Francisco', indice: 17.44, isMunicipio: true },
    { name: 'Santa Ana', indice: 12.46, isMunicipio: true },
    { name: 'Dolores', indice: 13.07, isMunicipio: true },
    { name: 'San Luis', indice: 45.04, isMunicipio: true },
    { name: 'Sayaxché', indice: 29.36, isMunicipio: true },
    { name: 'Melchor De Mencos', indice: 11.51, isMunicipio: true },
    { name: 'Poptún', indice: 12.49, isMunicipio: true },

    { name: 'Izabal', indice: 28.90, isMunicipio: false },

    { name: 'Puerto Barrios', indice: 9.22, isMunicipio: true },
    { name: 'Livingston', indice: 53.87, isMunicipio: true },
    { name: 'El Estor', indice: 19.68, isMunicipio: true },
    { name: 'Morales', indice: 22.14, isMunicipio: true },
    { name: 'Los Amates', indice: 30.02, isMunicipio: true },

    { name: 'Zacapa', indice: 36.72, isMunicipio: false },

    { name: 'Zacapa', indice: 37.06, isMunicipio: true },
    { name: 'Estanzuela', indice: 17.57, isMunicipio: true },
    { name: 'Río Hondo', indice: 12.37, isMunicipio: true },
    { name: 'Gualán', indice: 43.13, isMunicipio: true },
    { name: 'Teculután', indice: 10.89, isMunicipio: true },
    { name: 'Usumatlán', indice: 10.78, isMunicipio: true },
    { name: 'Cabañas', indice: 16.33, isMunicipio: true },
    { name: 'San Diego', indice: 20.41, isMunicipio: true },
    { name: 'La Unión', indice: 66.23, isMunicipio: true },
    { name: 'Huité', indice: 15.98, isMunicipio: true },

    { name: 'Chiquimula', indice: 37.00, isMunicipio: false },

    { name: 'Chiquimula', indice: 34.88, isMunicipio: true },
    { name: 'San José La Arada', indice: 18.88, isMunicipio: true },
    { name: 'San Juan Ermita', indice: 39.64, isMunicipio: true },
    { name: 'Jocotán', indice: 59.84, isMunicipio: true },
    { name: 'Camotán', indice: 41.38, isMunicipio: true },
    { name: 'Olopa', indice: 39.58, isMunicipio: true },
    { name: 'Esquipulas', indice: 39.44, isMunicipio: true },
    { name: 'Concepción Las Minas', indice: 8.63, isMunicipio: true },
    { name: 'Quezaltepeque', indice: 27.82, isMunicipio: true },
    { name: 'San Jacinto', indice: 31.62, isMunicipio: true },
    { name: 'Ipala', indice: 8.37, isMunicipio: true },

    { name: 'Jalapa', indice: 22.75, isMunicipio: false },

    { name: 'Jalapa', indice: 36.28, isMunicipio: true },
    { name: 'San Pedro Pinula', indice: 31.54, isMunicipio: true },
    { name: 'San Luis Jilotepeque', indice: 24.40, isMunicipio: true },
    { name: 'San Manuel Chaparrón', indice: 8.50, isMunicipio: true },
    { name: 'San Carlos Alzatate', indice: 33.66, isMunicipio: true },
    { name: 'Monjas', indice: 18.93, isMunicipio: true },
    { name: 'Mataquescuintla', indice: 10.99, isMunicipio: true },

    { name: 'Jutiapa', indice: 16.27, isMunicipio: false },

    { name: 'Jutiapa', indice: 5.74, isMunicipio: true },
    { name: 'El Progreso', indice: 8.92, isMunicipio: true },
    { name: 'Santa Catarina Mita', indice: 6.29, isMunicipio: true },
    { name: 'Agua Blanca', indice: 10.35, isMunicipio: true },
    { name: 'Asunción Mita', indice: 13.03, isMunicipio: true },
    { name: 'Yupiltepeque', indice: 10.44, isMunicipio: true },
    { name: 'Atescatempa', indice: 10.10, isMunicipio: true },
    { name: 'Jerez', indice: 7.45, isMunicipio: true },
    { name: 'El Adelanto', indice: 9.58, isMunicipio: true },
    { name: 'Zapotitlán', indice: 27.46, isMunicipio: true },
    { name: 'Comapa', indice: 28.18, isMunicipio: true },
    { name: 'Jalpatagua', indice: 27.01, isMunicipio: true },
    { name: 'Conguaco', indice: 57.04, isMunicipio: true },
    { name: 'Moyuta', indice: 53.92, isMunicipio: true },
    { name: 'Pasaco', indice: 73.11, isMunicipio: true },
    { name: 'San José Acatempa', indice: 1.47, isMunicipio: true },
    { name: 'Quezada', indice: 5.37, isMunicipio: true }
]
