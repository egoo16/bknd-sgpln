import { Request, Response } from 'express';
import moment from 'moment';
import project from '../../models/seguimiento/project.entity';
import track from '../../models/seguimiento/track.entity';
import advisoryEpi from '../../models/seguimiento/advisoryEpi';
import advisoryDoc from '../../models/seguimiento/advisoryDoc';

export async function createProject(req: Request, res: Response) {
    try {

        const projectModel = req.body;
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

    const trackCreated = await track.create({ ...trackModel, projectId });
    if (trackModel.advisoryEpi) {
        let advEpi = trackModel.advisoryEpi;
        let advEpiCreated = await advisoryEpi.create({ ...advEpi, trackId: trackCreated.id });
    }
    if (trackModel.advisoryDoc) {
        let advDoc = trackModel.advisoryDoc;
        let advEpiCreated = await advisoryDoc.create({ ...advDoc, trackId: trackCreated.id });
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
        let projectsResponse: any[] = [];
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
        console.log(projectFind.tracks.length);
        if (projectFind) {
            let allData = []
            if (projectFind?.tracks?.length > 0) {

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
                            advisoryEpi: advDocFind
                        }
                        return trackResult;
                    }
                    if (!advEpiFind && !advDocFind) {
                        return trackI;
                    }
                }));
            }

            const allTracks = await track.findAll({
                where: { id: projectFind.id },
                order: '"createdAt" DESC'
            })

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
                observations: projectFind.observations,
                tracking: allData
            }

            const response = {
                project: {
                    ...proj,
                }
            }
            return response
        } else {
            throw `Proyecto no encontrado`;
        }

    } catch (error) {
        throw `Error al obtener Proyecto completo: ${error}`;

    }
}