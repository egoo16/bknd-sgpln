import { Request, Response } from 'express';
import models from "../../db/connection";
import moment from 'moment';
import { accessRoads, advisoryDoc, advisoryEpi, availableOrg, comment, disasters, imgVisit, meansTransport, project, serviceInf, threatTypes, track, visitCard } from '../../models/seguimiento';


export async function createProject(req: Request, res: Response) {
    let transaction = await models.transaction()
    try {

        let projectModel = req.body;
        projectModel.advance = 0;
        projectModel.status = 'REGISTER';
        console.log("🚀 ~ file: seguimiento.controller.ts:20 ~ createProject ~ projectModel", projectModel)
        let allTracks: any = [];
        let resultQuery: any;


        let maxCorrelative = 0


        if (req.body.isMinistry == 1) {
            const querySend = `SELECT MAX("project"."correlative") AS FROM "project" WHERE "project"."isMinistry" = 1`
            await models.query(querySend).spread((result: any) => { resultQuery = result; }).catch((error: any) => {
                throw `Error, en la consulta consulta ${error}`;

            });
            const max = resultQuery![0]["MAX(\"PROJECT\".\"CORRELATIVE\")AS"];

            maxCorrelative = max
        }
        if (req.body.isMinistry == 0) {
            const querySend = `SELECT MAX("project"."correlative") AS FROM "project" WHERE "project"."isMinistry" = 0`
            await models.query(querySend).spread((result: any) => { resultQuery = result; }).catch((error: any) => {
                throw `Error, en la consulta consulta ${error}`;

            });
            const max = resultQuery![0]["MAX(\"PROJECT\".\"CORRELATIVE\")AS"];

            maxCorrelative = max
        }


        req.body.correlative = maxCorrelative + 1



        const projectCreated = await project.create({ ...projectModel }, { transaction });
        let proj = {
            id: projectCreated.id,
            author: projectCreated.author,
            correlative: projectCreated.correlative,
            process: projectCreated.process,
            sector: projectCreated.sector,
            depto: projectCreated.depto,
            munic: projectCreated.munic,
            nameProject: projectCreated.nameProject,
            ministry: projectCreated.ministry,
            isMinistry: projectCreated.isMinistry,
            legalLand: projectCreated.legalLand,
            agripManage: projectCreated.agripManage,
            snipCode: projectCreated.snipCode,
            observations: projectCreated.observations,
            advance: projectCreated.advance,
            status: projectCreated.status,
        }
        const tracking = req.body.tracking;
        if (tracking?.length > 0) {
            const resTracking = await Promise.all(tracking.map(async (prog: any) => {

                const res = await createTrack(prog, projectCreated.id, transaction);
                return res;

            }));

            allTracks = [...resTracking]

            const response = {
                project: {
                    ...proj,
                    tracking: allTracks
                }
            }
            transaction.commit()
            return res.status(201).send(response)
        } else {
            const response = {
                project: {
                    ...proj,
                    tracking: allTracks
                }
            }
            transaction.commit()
            return res.status(201).send(response)

        }

    } catch (error: any) {
        transaction.rollback()
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}

export async function editProject(req: Request, res: Response) {
    try {

        if (req.params.id) {

            let projectToEdit = await project.findOne({ where: { id: req.params.id } });


            if (projectToEdit) {

                const projectModel = req.body;
                console.log("🚀 ~ file: seguimiento.controller.ts:20 ~ createProject ~ projectModel", projectModel)

                projectToEdit.author = projectModel.author;
                projectToEdit.process = projectModel.process;
                projectToEdit.sector = projectModel.sector;
                projectToEdit.depto = projectModel.depto;
                projectToEdit.munic = projectModel.munic;
                projectToEdit.nameProject = projectModel.nameProject;
                projectToEdit.ministry = projectModel.ministry;
                projectToEdit.isMinistry = projectModel.isMinistry;
                projectToEdit.legalLand = projectModel.legalLand;
                projectToEdit.agripManage = projectModel.agripManage;
                projectToEdit.snipCode = projectModel.snipCode;
                projectToEdit.observations = projectModel.observations;

                const result = await projectToEdit.save()

                res.status(200).json({
                    msg: "Datos Editados Correctamente",
                    data: projectToEdit,
                    result,
                });

            } else {
                throw `No se encontró el registro`;
            }
        }

        else {
            throw `Error al eliminar Projecto`;
        }

    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}

export const deleteProject = async (req: Request, res: Response) => {
    try {
        if (req.params.id) {

            const projectToDelete = await project.findOne({ where: { id: req.params.id } });
            if (projectToDelete) {

                const codigo = req.params.id;
                let projCreated = await project.destroy({
                    where: {
                        id: projectToDelete.id
                    }
                })

                res.status(200).json({
                    msg: "Datos Eliminados",
                    data: projCreated
                });
            } else {
                throw `No se encontró el registro`;
            }
        }

        else {
            throw `Error al eliminar Projecto`;
        }

    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
}

export const deleteTrack = async (req: Request, res: Response) => {
    try {
        if (req.params.id) {


            let trackFind = await track.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (!trackFind) {
                throw new Error("No se Encontro el Track ");
            }

            let projectUd = await project.findOne({
                where: {
                    id: trackFind.projectId
                }
            })
            if (projectUd) {
                projectUd.advance = 0;
                await projectUd.save()

            } else {
                throw new Error("No se Encontro el proyecto ");
            }

            let trackDeleted = await track.destroy({
                where: {
                    id: trackFind.id
                }
            })

            res.status(200).json({
                msg: "Datos Eliminados",
                data: trackDeleted
            });
        }

        else {
            throw `Error: No se encontró ID`;
        }

    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
}

export async function addTrack(req: Request, res: Response) {
    let transaction = await models.transaction()
    try {
        const idProject = req.params.id
        const trackModel = req.body;

        let trackCreated = await createTrack(trackModel, idProject, transaction);

        const response = await getProjectCompleto(idProject)
        transaction.commit()
        return res.status(201).send(response)
    } catch (error: any) {
        transaction.rollback()
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}

async function createTrack(trackModel: any, projectId: string, transaction: any) {
    try {

        let projectUd = await project.findOne({
            where: {
                id: projectId
            }
        })
        if (projectUd) {
            const a = parseInt(trackModel.iapa);
            const b = parseInt(trackModel.iapb);
            const c = parseInt(trackModel.iapc);
            const totalProgress = a + b + c;
            if (totalProgress == 100) {
                projectUd.status = 'FINISHED';
            }
            projectUd.advance = totalProgress;
            await projectUd.save({ transaction })

        } else {
            throw new Error("No se Encontro el proyecto ");
        }

        const trackCreated = await track.create({ ...trackModel, projectId });
        if (trackModel.advisoryEpi) {
            let advEpi = trackModel.advisoryEpi;
            advEpi.doc = '';
            let advEpiCreated = await advisoryEpi.create({ ...advEpi, trackId: trackCreated.id }, { transaction });
        }
        if (trackModel.advisoryDoc) {
            let advDoc = trackModel.advisoryDoc;
            let cments = []
            cments = trackModel.advisoryDoc.comments;
            let advEpiCreated = await advisoryDoc.create({ ...advDoc, trackId: trackCreated.id }, { transaction });
            if (cments.length > 0) {
                const cmProm = await Promise.all(cments.map(async (cmt: any) => {
                    cmt.advisoryDocId = advEpiCreated.id
                    const response = await comment.create({ ...cmt }, { transaction });
                }))
            }
        }
        if (trackModel.visitCard) {

            let vsCard = trackModel.visitCard;
            let vsCardCreated = await visitCard.create({ ...vsCard, trackId: trackCreated.id }, { transaction });
            // Variables de otras tablas
            let accessRds = [];
            let mtransport = [];
            let srvInf = [];
            let dsters = [];
            let thrTypes = [];
            let imgVst = [];
            let avlOrg = [];

            // asignacion de variables 

            accessRds = trackModel.visitCard.accessRoads
            mtransport = trackModel.visitCard.meanstransport
            srvInf = trackModel.visitCard.serviceInf
            dsters = trackModel.visitCard.disasters
            thrTypes = trackModel.visitCard.threatTypes
            imgVst = trackModel.visitCard.imgVisit
            avlOrg = trackModel.visitCard.availableOrg

            // Creacion de Registros
            console.log("🚀 ~ file: seguimiento.controller.ts:157 ~ createTrack ~ accessRds.length", accessRds.length)
            if (accessRds.length > 0) {
                const resProm = await Promise.all(accessRds.map(async (obj: any) => {
                    obj.visitCardId = vsCardCreated.id
                    const response = await accessRoads.create({ ...obj }, { transaction });
                }))
            }

            console.log("🚀 ~ file: seguimiento.controller.ts:165 ~ createTrack ~ mtransport.length", mtransport)
            if (mtransport.length > 0) {
                const resProm = await Promise.all(mtransport.map(async (obj: any) => {
                    obj.visitCardId = vsCardCreated.id
                    const response = await meansTransport.create({ ...obj }, { transaction });
                }))
            }

            if (srvInf.length > 0) {
                const resProm = await Promise.all(srvInf.map(async (obj: any) => {
                    obj.visitCardId = vsCardCreated.id
                    const response = await serviceInf.create({ ...obj }, { transaction });
                }))
            }

            if (dsters.length > 0) {
                const resProm = await Promise.all(dsters.map(async (obj: any) => {
                    obj.visitCardId = vsCardCreated.id
                    const response = await disasters.create({ ...obj }, { transaction });
                }))
            }

            if (thrTypes.length > 0) {
                const resProm = await Promise.all(thrTypes.map(async (obj: any) => {
                    obj.visitCardId = vsCardCreated.id
                    const response = await threatTypes.create({ ...obj }, { transaction });
                }))
            }

            if (imgVst.length > 0) {
                const resProm = await Promise.all(imgVst.map(async (obj: any) => {
                    obj.visitCardId = vsCardCreated.id
                    const response = await imgVisit.create({ ...obj }, { transaction });
                }))
            }
            if (avlOrg.length > 0) {
                const resProm = await Promise.all(avlOrg.map(async (obj: any) => {
                    obj.visitCardId = vsCardCreated.id
                    const response = await availableOrg.create({ ...obj }, { transaction });
                }))
            }

        }
        return trackCreated;
    } catch (error: any) {
        throw `Error al ingresar Track: ${error}`;
    }
}

export async function editTrack(req: Request, res: Response) {
    try {
        if (!req.params.id) {
            throw `Error: No se encontró ID`;
        }
        const idProject = req.params.id
        const trackModel = req.body;
        console.log("🚀 ~ file: seguimiento.controller.ts:385 ~ editTrack ~ trackModel:", trackModel)

        let trackCreated = await updateTrack(trackModel, idProject);

        const response = await getProjectCompleto(idProject)
        return res.status(201).send(response)
    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}

async function updateTrack(trackModel: any, projectId: string) {
    try {

        let projectUd = await project.findOne({
            where: {
                id: projectId
            }
        })
        if (projectUd) {
            const a = parseInt(trackModel.iapa);
            const b = parseInt(trackModel.iapb);
            const c = parseInt(trackModel.iapc);
            const totalProgress = a + b + c;
            if (totalProgress == 100) {
                projectUd.status = 'FINISHED';
            }
            projectUd.advance = totalProgress;
            await projectUd.save()

        } else {
            throw new Error("No se Encontro la Asesoria ");
        }
        if (!trackModel.id) {
            throw new Error("No se Encontro ID para la Asesoria ");
        }

        const trackToEdit = await track.findOne({
            where: {
                id: trackModel.id
            }
        })
        if (!trackToEdit) {
            throw new Error("No se Encontro la Asesoria ");
        }
        trackToEdit.iapa = trackModel.iapa;
        trackToEdit.iapb = trackModel.iapb;
        trackToEdit.iapc = trackModel.iapc;
        trackToEdit.activity = trackModel.activity;
        trackToEdit.reportDate = trackModel.reportDate;
        await trackToEdit.save();

        // const trackCreated = await track.create({ ...trackModel, projectId });
        if (trackModel.advisoryEpi) {
            const advEpi = trackModel.advisoryEpi;

            const advEpiFind = await advisoryEpi.findOne({
                where: {
                    id: advEpi.id
                }
            })
            if (!advEpiFind) {
                throw new Error(`No se Encontro la Asesoria a la EPI con ID ${advEpi.id}`);
            }
            advEpiFind.goal = advEpi.goal;
            advEpiFind.action = advEpi.action;
            advEpiFind.unitSpecific = advEpi.unitSpecific;
            advEpiFind.sectorization = advEpi.sectorization;
            advEpiFind.subSectorization = advEpi.subSectorization;
            advEpiFind.advTheme = advEpi.advTheme;
            advEpiFind.participantName = advEpi.participantName;
            advEpiFind.participantPosition = advEpi.participantPosition;
            advEpiFind.menAttended = advEpi.menAttended;
            advEpiFind.womenAttended = advEpi.womenAttended;
            advEpiFind.totalAttended = advEpi.totalAttended;
            advEpiFind.advDate = advEpi.advDate;
            advEpiFind.reportDate = advEpi.reportDate;
            advEpiFind.counselingModality = advEpi.counselingModality;
            advEpiFind.place = advEpi.place;
            advEpiFind.objective = advEpi.objective;
            advEpiFind.devAdv = advEpi.devAdv;
            advEpiFind.conclusions = advEpi.conclusions;
            advEpiFind.commitments = advEpi.commitments;
            advEpiFind.specialist = advEpi.specialist;

            await advEpiFind.save();

            // advEpi.doc = '';
            // let advEpiCreated = await advisoryEpi.create({ ...advEpi, trackId: trackModel.id });
        }
        if (trackModel.advisoryDoc) {
            const advDoc = trackModel.advisoryDoc;

            const advDocFind = await advisoryDoc.findOne({
                where: {
                    id: advDoc.id
                }
            })
            if (!advDocFind) {
                throw new Error(`No se Encontro la Asesoria al Documento con ID: ${advDoc.id} `);
            }

            advDocFind.goal = advDoc.goal;
            advDocFind.action = advDoc.action;
            advDocFind.unitSpecific = advDoc.unitSpecific;
            advDocFind.sectorization = advDoc.sectorization;
            advDocFind.subSectorization = advDoc.subSectorization;
            advDocFind.menAttended = advDoc.menAttended;
            advDocFind.womenAttended = advDoc.womenAttended;
            advDocFind.totalAttended = advDoc.totalAttended;
            advDocFind.counselingModality = advDoc.counselingModality;
            advDocFind.advTheme = advDoc.advTheme;
            advDocFind.snipCode = advDoc.snipCode;
            advDocFind.projectName = advDoc.projectName;
            advDocFind.participant = advDoc.participant;
            advDocFind.analysisDate = advDoc.analysisDate;
            advDocFind.advDate = advDoc.advDate;
            advDocFind.assistant = advDoc.assistant;
            advDocFind.conclusions = advDoc.conclusions;
            advDocFind.recomend = advDoc.recomend;

            await advDocFind.save()

            // let advEpiCreated = await advisoryDoc.create({ ...advDoc, trackId: trackCreated.id });


            let cments = []
            cments = trackModel.advisoryDoc.comments;


            let commentsDeleted = await comment.destroy({
                where: {
                    advisoryDocId: advDoc.id
                }
            })

            if (cments.length > 0) {
                const cmProm = await Promise.all(cments.map(async (cmt: any) => {
                    delete cmt.id
                    cmt.advisoryDocId = advDoc.id
                    const response = await comment.create({ ...cmt });
                }))
            }
        }
        if (trackModel.visitCard) {

            const vsCard = trackModel.visitCard;

            const advVisitFind = await visitCard.findOne({
                where: {
                    id: vsCard.id
                }
            })
            if (!advVisitFind) {
                throw new Error(`No se Encontro la Visita de Campo con ID: ${vsCard.id} `);
            }

            advVisitFind.codePreinv = vsCard.codePreinv;
            advVisitFind.visitDate = vsCard.visitDate;
            advVisitFind.deptoDel = vsCard.deptoDel;
            advVisitFind.specialistName = vsCard.specialistName;
            advVisitFind.proposalName = vsCard.proposalName;
            advVisitFind.mountAprox = vsCard.mountAprox;
            advVisitFind.region = vsCard.region;
            advVisitFind.depto = vsCard.depto;
            advVisitFind.municip = vsCard.municip;
            advVisitFind.address = vsCard.address;
            advVisitFind.typeAddress = vsCard.typeAddress;
            advVisitFind.catLocation = vsCard.catLocation;
            advVisitFind.typeClimate = vsCard.typeClimate;
            advVisitFind.avgTemperature = vsCard.avgTemperature;
            advVisitFind.distanceKm = vsCard.distanceKm;
            advVisitFind.nameHeadboard = vsCard.nameHeadboard;
            advVisitFind.isDrinkingWater = vsCard.isDrinkingWater;
            advVisitFind.isDrainageNetwork = vsCard.isDrainageNetwork;
            advVisitFind.isElectricity = vsCard.isElectricity;
            advVisitFind.isPhoneService = vsCard.isPhoneService;
            advVisitFind.isDrinkableWhater = vsCard.isDrinkableWhater;
            advVisitFind.garbageDisposal = vsCard.garbageDisposal;
            advVisitFind.latitud = vsCard.latitud;
            advVisitFind.longitud = vsCard.longitud;
            advVisitFind.gtmx = vsCard.gtmx;
            advVisitFind.gtmy = vsCard.gtmy;
            advVisitFind.elevation = vsCard.elevation;
            advVisitFind.msnm = vsCard.msnm;
            advVisitFind.infRealEstate = vsCard.infRealEstate;
            advVisitFind.groundConditions = vsCard.groundConditions;
            advVisitFind.approximateSlope = vsCard.approximateSlope;
            advVisitFind.soilType = vsCard.soilType;
            advVisitFind.realEstateArea = vsCard.realEstateArea;
            advVisitFind.northMeasure = vsCard.northMeasure;
            advVisitFind.southMeasure = vsCard.southMeasure;
            advVisitFind.eastMeasure = vsCard.eastMeasure;
            advVisitFind.westMeasure = vsCard.westMeasure;
            advVisitFind.northBorder = vsCard.northBorder;
            advVisitFind.southBorder = vsCard.southBorder;
            advVisitFind.eastBorder = vsCard.eastBorder;
            advVisitFind.westBorder = vsCard.westBorder;
            advVisitFind.legalSituation = vsCard.legalSituation;
            advVisitFind.basicServRS = vsCard.basicServRS;
            advVisitFind.isElectricityRS = vsCard.isElectricityRS;
            advVisitFind.isPhoneRS = vsCard.isPhoneRS;
            advVisitFind.isDrainageRS = vsCard.isDrainageRS;
            advVisitFind.isDrinkingWRS = vsCard.isDrinkingWRS;
            advVisitFind.garbageRS = vsCard.garbageRS;
            advVisitFind.isReqFinance = vsCard.isReqFinance;
            advVisitFind.desReqFinance = vsCard.desReqFinance;
            advVisitFind.appStatus = vsCard.appStatus;
            advVisitFind.techNameEpi = vsCard.techNameEpi;
            advVisitFind.techPosEpi = vsCard.techPosEpi;
            advVisitFind.techProfEpi = vsCard.techProfEpi;
            advVisitFind.theirAgree = vsCard.theirAgree;
            advVisitFind.specifyAnswer = vsCard.specifyAnswer;
            advVisitFind.observationsGeneral = vsCard.observationsGeneral;

            await advVisitFind.save()


            // let vsCardCreated = await visitCard.create({ ...vsCard, trackId: trackCreated.id });
            
            
            
            // Variables de otras tablas
            let accessRds = [];
            let mtransport = [];
            let srvInf = [];
            let dsters = [];
            let thrTypes = [];
            let imgVst = [];
            let avlOrg = [];

            // asignacion de variables 

            accessRds = trackModel.visitCard.accessRoads
            mtransport = trackModel.visitCard.meanstransport
            srvInf = trackModel.visitCard.serviceInf
            dsters = trackModel.visitCard.disasters
            thrTypes = trackModel.visitCard.threatTypes
            imgVst = trackModel.visitCard.imgVisit
            avlOrg = trackModel.visitCard.availableOrg

            // Creacion de Registros
            console.log("🚀 ~ file: seguimiento.controller.ts:157 ~ createTrack ~ accessRds.length", accessRds.length)
            if (accessRds.length > 0) {

                let rowsDeleted = await accessRoads.destroy({
                    where: {
                        visitCardId: vsCard.id
                    }
                })

                const resProm = await Promise.all(accessRds.map(async (obj: any) => {
                    delete obj.id
                    obj.visitCardId = vsCard.id
                    const response = await accessRoads.create({ ...obj });
                }))
            }

            console.log("🚀 ~ file: seguimiento.controller.ts:165 ~ createTrack ~ mtransport.length", mtransport)
            if (mtransport.length > 0) {
                let rowsDeleted = await meansTransport.destroy({
                    where: {
                        visitCardId: vsCard.id
                    }
                })

                const resProm = await Promise.all(mtransport.map(async (obj: any) => {
                    delete obj.id
                    obj.visitCardId = vsCard.id
                    const response = await meansTransport.create({ ...obj });
                }))
            }

            if (srvInf.length > 0) {
                let rowsDeleted = await serviceInf.destroy({
                    where: {
                        visitCardId: vsCard.id
                    }
                })
                const resProm = await Promise.all(srvInf.map(async (obj: any) => {
                    delete obj.id
                    obj.visitCardId = vsCard.id
                    const response = await serviceInf.create({ ...obj });
                }))
            }

            if (dsters.length > 0) {
                let rowsDeleted = await disasters.destroy({
                    where: {
                        visitCardId: vsCard.id
                    }
                })
                const resProm = await Promise.all(dsters.map(async (obj: any) => {
                    delete obj.id
                    obj.visitCardId = vsCard.id
                    const response = await disasters.create({ ...obj });
                }))
            }

            if (thrTypes.length > 0) {
                let rowsDeleted = await threatTypes.destroy({
                    where: {
                        visitCardId: vsCard.id
                    }
                })
                const resProm = await Promise.all(thrTypes.map(async (obj: any) => {
                    delete obj.id
                    obj.visitCardId = vsCard.id
                    const response = await threatTypes.create({ ...obj });
                }))
            }

            if (imgVst.length > 0) {
                let rowsDeleted = await imgVisit.destroy({
                    where: {
                        visitCardId: vsCard.id
                    }
                })
                const resProm = await Promise.all(imgVst.map(async (obj: any) => {
                    delete obj.id
                    obj.visitCardId = vsCard.id
                    const response = await imgVisit.create({ ...obj });
                }))
            }
            if (avlOrg.length > 0) {
                let rowsDeleted = await availableOrg.destroy({
                    where: {
                        visitCardId: vsCard.id
                    }
                })
                const resProm = await Promise.all(avlOrg.map(async (obj: any) => {
                    delete obj.id
                    obj.visitCardId = vsCard.id
                    const response = await availableOrg.create({ ...obj });
                }))
            }

        }
        return trackToEdit;
    } catch (error: any) {
        throw `Error al Actualizar Track: ${error}`;
    }
}


export async function getProjectById(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (id) {
            const response = await getProjectCompleto(id);
            return res.status(201).send(response);
        } else {
            res.status(500).send({
                msj: 'No se encontro el Projecto con ID: ' + id
            });
        }


    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }

}

export async function getAllProjects(req: Request, res: Response) {
    try {
        let where: any = {};
        let filtros: any = req.query
        console.log("🚀 ~ file: seguimiento.controller.ts:155 ~ getAllProjects ~ filtros", filtros)
        let projectsResponse: any[] = [];

        if (filtros) {
            if (filtros.isMinistry) {
                let ministry = (filtros.isMinistry === 'true');
                where.isMinistry = ministry;
            }
            if (filtros.status) {
                where.status = filtros.status;
            }
            if (filtros.departamento) {
                where.depto = {
                    $like: `%${filtros.departamento}%`
                }
            }
            if (filtros.municipio) {
                where.munic = {
                    $like: `%${filtros.municipio}%`
                }
            }
            if (filtros.mes) {
                let year = 2022
                let nextYear = 2022
                if (filtros.year) {
                    year = parseInt(filtros.year)
                    nextYear = parseInt(filtros.year)
                } else {
                    year = 2022
                }
                let month = parseInt(filtros.mes)
                let nextMonth = month + 1;
                if (nextMonth > 12) {
                    nextMonth = 1;
                    nextYear = year + 1;
                }


                where.createdAt = { $between: [new Date(`${filtros.mes}-1-${year}`), new Date(`${nextMonth}-1-${nextYear}`)] };
            }

            if (filtros.entidad) {
                where.ministry = filtros.entidad;
            }

            const projects = await project.findAll({ where, order: '"createdAt" DESC' });
            if (projects.length > 0) {
                const resProm = await Promise.all(projects.map(async (project: any) => {
                    const response = await getProjectCompleto(project.id);
                    projectsResponse.push(response);
                }))

                projectsResponse.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                return res.status(201).send({ projects: projectsResponse });
            } else {
                return res.status(201).send({ projects: [] })
            }
        } else {

            const projects = await project.findAll({ order: '"createdAt" DESC' });
            if (projects.length > 0) {
                const resProm = await Promise.all(projects.map(async (project: any) => {
                    const response = await getProjectCompleto(project.id);
                    projectsResponse.push(response);
                }))

                return res.status(201).send({ projects: projectsResponse });
            } else {
                return res.status(201).send({ projects: [] })
            }
        }

    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })

    }
}

async function getProjectCompleto(idProject: string) {
    try {
        const projectFind = await project.findOne({
            where: { id: idProject },
            include: [
                {
                    required: false,
                    model: track
                },
            ],
            order: '"createdAt" DESC'
        });
        console.log(projectFind?.tracks?.length);
        if (projectFind) {
            let allData = []
            if (projectFind?.tracks?.length > 0 || projectFind?.tracks?.length) {

                allData = await Promise.all(projectFind?.tracks.map(async (trackI: any) => {
                    let advEpiFind = await advisoryEpi.findOne({ where: { trackId: trackI.id } })
                    if (advEpiFind) {
                        let trackResult = {
                            id: trackI.id,
                            iapa: trackI.iapa,
                            iapb: trackI.iapb,
                            iapc: trackI.iapc,
                            activity: trackI.activity,
                            reportDate: trackI.reportDate,
                            projectId: trackI.projectId,
                            createdAt: trackI.createdAt,
                            updatedAt: trackI.updatedAt,
                            deletedAt: trackI.deletedAt,
                            advisoryEpi: advEpiFind
                        }
                        return trackResult;
                    }
                    let advDocFind = await advisoryDoc.findOne({ where: { trackId: trackI.id } });
                    if (advDocFind) {
                        let cmnts = [];
                        cmnts = await comment.findAll({
                            where: {
                                advisoryDocId: advDocFind.id,
                            }
                        });
                        const advDocModel = {
                            id: advDocFind.id,
                            trackId: advDocFind.trackId,
                            goal: advDocFind.goal,
                            action: advDocFind.action,
                            unitSpecific: advDocFind.unitSpecific,
                            sectorization: advDocFind.sectorization,
                            subSectorization: advDocFind.subSectorization,
                            menAttended: advDocFind.menAttended,
                            womenAttended: advDocFind.womenAttended,
                            totalAttended: advDocFind.totalAttended,
                            counselingModality: advDocFind.counselingModality,
                            advTheme: advDocFind.advTheme,
                            snipCode: advDocFind.snipCode,
                            projectName: advDocFind.projectName,
                            participant: advDocFind.participant,
                            analysisDate: advDocFind.analysisDate,
                            advDate: advDocFind.advDate,
                            assistant: advDocFind.assistant,
                            conclusions: advDocFind.conclusions,
                            recomend: advDocFind.recomend,
                            comments: cmnts
                        }
                        let trackResult = {
                            id: trackI.id,
                            iapa: trackI.iapa,
                            iapb: trackI.iapb,
                            iapc: trackI.iapc,
                            activity: trackI.activity,
                            reportDate: trackI.reportDate,
                            projectId: trackI.projectId,
                            createdAt: trackI.createdAt,
                            updatedAt: trackI.updatedAt,
                            deletedAt: trackI.deletedAt,
                            advisoryDoc: advDocModel
                        }
                        return trackResult;
                    }
                    let findVsCard = await visitCard.findOne({ where: { trackId: trackI.id } });
                    if (findVsCard) {
                        let cardVisit = await getVisitCardComplete(findVsCard.id);
                        if (cardVisit) {
                            let trackResult = {
                                id: trackI.id,
                                iapa: trackI.iapa,
                                iapb: trackI.iapb,
                                iapc: trackI.iapc,
                                activity: trackI.activity,
                                reportDate: trackI.reportDate,
                                projectId: trackI.projectId,
                                createdAt: trackI.createdAt,
                                updatedAt: trackI.updatedAt,
                                deletedAt: trackI.deletedAt,
                                visitCard: cardVisit
                            }
                            return trackResult;
                        }
                    }

                    if (!advEpiFind && !advDocFind) {
                        return trackI;
                    }
                }));

                // const allTracks = await track.findAll({
                //     where: { id: projectFind.id },
                //     order: '"createdAt" DESC'
                // })

                let proj = {
                    id: projectFind.id,
                    author: projectFind.author,
                    correlative: projectFind.correlative,
                    process: projectFind.process,
                    sector: projectFind.sector,
                    depto: projectFind.depto,
                    munic: projectFind.munic,
                    nameProject: projectFind.nameProject,
                    ministry: projectFind.ministry,
                    isMinistry: projectFind.isMinistry,
                    legalLand: projectFind.legalLand,
                    agripManage: projectFind.agripManage,
                    snipCode: projectFind.snipCode,
                    advance: projectFind.advance,
                    status: projectFind.status,
                    observations: projectFind.observations,
                    createdAt: projectFind.createdAt,
                    updatedAt: projectFind.updatedAt,
                    deletedAt: projectFind.deletedAt,
                    tracking: allData
                }

                const response = {
                    ...proj,
                }
                return response
            } else {

                let proj = {
                    id: projectFind.id,
                    author: projectFind.author,
                    correlative: projectFind.correlative,
                    process: projectFind.process,
                    sector: projectFind.sector,
                    depto: projectFind.depto,
                    munic: projectFind.munic,
                    nameProject: projectFind.nameProject,
                    ministry: projectFind.ministry,
                    isMinistry: projectFind.isMinistry,
                    legalLand: projectFind.legalLand,
                    agripManage: projectFind.agripManage,
                    snipCode: projectFind.snipCode,
                    advance: projectFind.advance,
                    status: projectFind.status,
                    observations: projectFind.observations,
                    createdAt: projectFind.createdAt,
                    updatedAt: projectFind.updatedAt,
                    deletedAt: projectFind.deletedAt,
                    tracking: []
                }

                const response = {
                    ...proj,
                }
                return response
            }

        } else {

            throw `Proyecto no encontrado`;
        }

    } catch (error) {
        throw `Error al obtener Proyecto completo: ${error}`;

    }
}

async function getVisitCardComplete(idVisitCard: string) {
    try {
        let findVisitCard = await visitCard.findOne({ where: { id: idVisitCard } });
        let accessRoadsResult = [];
        let meansTransportResult = [];
        let serviceInfResult = [];
        let disastersResult = [];
        let threatTypesResult = [];
        let imgVisitResult = [];
        let availableOrgResult = [];

        accessRoadsResult = await accessRoads.findAll({ where: { visitCardId: findVisitCard.id } });
        meansTransportResult = await meansTransport.findAll({ where: { visitCardId: findVisitCard.id } });
        serviceInfResult = await serviceInf.findAll({ where: { visitCardId: findVisitCard.id } });
        disastersResult = await disasters.findAll({ where: { visitCardId: findVisitCard.id } });
        threatTypesResult = await threatTypes.findAll({ where: { visitCardId: findVisitCard.id } });
        imgVisitResult = await imgVisit.findAll({ where: { visitCardId: findVisitCard.id } });
        availableOrgResult = await availableOrg.findAll({ where: { visitCardId: findVisitCard.id } });


        if (findVisitCard) {
            let card = {
                id: findVisitCard.id,
                trackId: findVisitCard.trackId,
                codePreinv: findVisitCard.codePreinv,
                visitDate: findVisitCard.visitDate,
                deptoDel: findVisitCard.deptoDel,
                specialistName: findVisitCard.specialistName,
                proposalName: findVisitCard.proposalName,
                mountAprox: findVisitCard.mountAprox,
                region: findVisitCard.region,
                depto: findVisitCard.depto,
                municip: findVisitCard.municip,
                address: findVisitCard.address,
                typeAddress: findVisitCard.typeAddress,
                catLocation: findVisitCard.catLocation,
                typeClimate: findVisitCard.typeClimate,
                avgTemperature: findVisitCard.avgTemperature,
                distanceKm: findVisitCard.distanceKm,
                nameHeadboard: findVisitCard.nameHeadboard,
                isDrinkingWater: findVisitCard.isDrinkingWater,
                isDrainageNetwork: findVisitCard.isDrainageNetwork,
                isElectricity: findVisitCard.isElectricity,
                isPhoneService: findVisitCard.isPhoneService,
                isDrinkableWhater: findVisitCard.isDrinkableWhater,
                garbageDisposal: findVisitCard.garbageDisposal,
                latitud: findVisitCard.latitud,
                longitud: findVisitCard.longitud,
                gtmx: findVisitCard.gtmx,
                gtmy: findVisitCard.gtmy,
                elevation: findVisitCard.elevation,
                msnm: findVisitCard.msnm,
                infRealEstate: findVisitCard.infRealEstate,
                groundConditions: findVisitCard.groundConditions,
                approximateSlope: findVisitCard.approximateSlope,
                soilType: findVisitCard.soilType,
                realEstateArea: findVisitCard.realEstateArea,
                northMeasure: findVisitCard.northMeasure,
                southMeasure: findVisitCard.southMeasure,
                eastMeasure: findVisitCard.eastMeasure,
                westMeasure: findVisitCard.westMeasure,
                northBorder: findVisitCard.northBorder,
                southBorder: findVisitCard.southBorder,
                eastBorder: findVisitCard.eastBorder,
                westBorder: findVisitCard.westBorder,
                legalSituation: findVisitCard.legalSituation,
                basicServRS: findVisitCard.basicServRS,
                isElectricityRS: findVisitCard.isElectricityRS,
                isPhoneRS: findVisitCard.isPhoneRS,
                isDrainageRS: findVisitCard.isDrainageRS,
                isDrinkingWRS: findVisitCard.isDrinkingWRS,
                garbageRS: findVisitCard.garbageRS,
                isReqFinance: findVisitCard.isReqFinance,
                desReqFinance: findVisitCard.desReqFinance,
                appStatus: findVisitCard.appStatus,
                techNameEpi: findVisitCard.techNameEpi,
                techPosEpi: findVisitCard.techPosEpi,
                techProfEpi: findVisitCard.techProfEpi,
                theirAgree: findVisitCard.theirAgree,
                specifyAnswer: findVisitCard.specifyAnswer,
                observationsGeneral: findVisitCard.observationsGeneral,
                createdAt: findVisitCard.createdAt,
                updatedAt: findVisitCard.updatedAt,
                deletedAt: findVisitCard.deletedAt,

                accessRoads: accessRoadsResult,
                meanstransport: meansTransportResult,
                serviceInf: serviceInfResult,
                disasters: disastersResult,
                threatTypes: threatTypesResult,
                imgVisit: imgVisitResult,
                availableOrg: availableOrgResult,
            }
            return card;
        } else {
            return null;
        }
    } catch (error) {
        throw `Error al obtener Hoja de Visita completa: ${error}`;
    }

}
