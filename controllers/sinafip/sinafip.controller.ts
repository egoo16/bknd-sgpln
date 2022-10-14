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
                let admissionObj = req.body;
                admissionObj.requestId = idSolicitud;
                const admissionCreated = await  admissionQuanty.create(admissionObj);
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