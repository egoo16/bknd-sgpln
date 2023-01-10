import { Request, Response } from 'express';
import moment from 'moment';
import { accessRoads, advisoryDoc, advisoryEpi, availableOrg, comment, disasters, imgVisit, meansTransport, project, serviceInf, threatTypes, track, visitCard } from '../../models/seguimiento';


export async function createProject(req: Request, res: Response) {
    try {

        let projectModel = req.body;
        projectModel.advance = 0;
        projectModel.status = 'REGISTER';
        console.log("🚀 ~ file: seguimiento.controller.ts:20 ~ createProject ~ projectModel", projectModel)
        let allTracks: any = [];


        const projectCreated = await project.create({ ...projectModel });
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

                const res = await createTrack(prog, projectCreated.id);
                return res;

            }));

            allTracks = [...resTracking]

            const response = {
                project: {
                    ...proj,
                    tracking: allTracks
                }
            }
            return res.status(201).send(response)
        } else {
            const response = {
                project: {
                    ...proj,
                    tracking: allTracks
                }
            }
            return res.status(201).send(response)

        }

    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}

export async function addTrack(req: Request, res: Response) {
    try {
        const idProject = req.params.id
        const trackModel = req.body;

        let trackCreated = await createTrack(trackModel, idProject);

        const response = await getProjectCompleto(idProject)
        return res.status(201).send(response)


    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}

async function createTrack(trackModel: any, projectId: string) {

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
        throw new Error("No se Encontro el proyecto ");
    }

    const trackCreated = await track.create({ ...trackModel, projectId });
    if (trackModel.advisoryEpi) {
        let advEpi = trackModel.advisoryEpi;
        advEpi.doc = '';
        let advEpiCreated = await advisoryEpi.create({ ...advEpi, trackId: trackCreated.id });
    }
    if (trackModel.advisoryDoc) {
        let advDoc = trackModel.advisoryDoc;
        let cments = []
        cments = trackModel.advisoryDoc.comments;
        let advEpiCreated = await advisoryDoc.create({ ...advDoc, trackId: trackCreated.id });
        if (cments.length > 0) {
            const cmProm = await Promise.all(cments.map(async (cmt: any) => {
                cmt.advisoryDocId = advEpiCreated.id
                const response = await comment.create({ ...cmt });
            }))
        }
    }
    if (trackModel.visitCard) {

        let vsCard = trackModel.visitCard;
        let vsCardCreated = await visitCard.create({ ...vsCard });
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
        mtransport = trackModel.visitCard.meansTransport
        srvInf = trackModel.visitCard.serviceInf
        dsters = trackModel.visitCard.disasters
        thrTypes = trackModel.visitCard.threatTypes
        imgVst = trackModel.visitCard.imgVisit
        avlOrg = trackModel.visitCard.availableOrg

        // Creacion de Registros
        if (accessRds.length > 0) {
            const resProm = await Promise.all(accessRds.map(async (obj: any) => {
                obj.visitCardId = vsCardCreated.id
                const response = await accessRoads.create({ ...obj });
            }))
        }

        if (mtransport.length > 0) {
            const resProm = await Promise.all(mtransport.map(async (obj: any) => {
                obj.visitCardId = vsCardCreated.id
                const response = await meansTransport.create({ ...obj });
            }))
        }

        if (srvInf.length > 0) {
            const resProm = await Promise.all(srvInf.map(async (obj: any) => {
                obj.visitCardId = vsCardCreated.id
                const response = await serviceInf.create({ ...obj });
            }))
        }

        if (dsters.length > 0) {
            const resProm = await Promise.all(dsters.map(async (obj: any) => {
                obj.visitCardId = vsCardCreated.id
                const response = await disasters.create({ ...obj });
            }))
        }

        if (thrTypes.length > 0) {
            const resProm = await Promise.all(thrTypes.map(async (obj: any) => {
                obj.visitCardId = vsCardCreated.id
                const response = await threatTypes.create({ ...obj });
            }))
        }

        if (imgVst.length > 0) {
            const resProm = await Promise.all(imgVst.map(async (obj: any) => {
                obj.visitCardId = vsCardCreated.id
                const response = await imgVisit.create({ ...obj });
            }))
        }
        if (avlOrg.length > 0) {
            const resProm = await Promise.all(avlOrg.map(async (obj: any) => {
                obj.visitCardId = vsCardCreated.id
                const response = await availableOrg.create({ ...obj });
            }))
        }

    }
    return trackCreated;

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
                where.depto = filtros.departamento;
            }
            if (filtros.municipio) {
                where.munic = filtros.municipio;
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
                            entity: advDocFind.entity,
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
