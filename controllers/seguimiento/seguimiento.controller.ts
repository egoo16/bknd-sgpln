import { Request, Response } from 'express';
import moment from 'moment';
import project from '../../models/seguimiento/project.entity';
import track from '../../models/seguimiento/track.entity';

export async function createProject(req: Request, res: Response) {
    try {

        const projectModel = req.body;
        let allTracks: any = [];


        const projectCreated = await project.create({...projectModel});

        // const tracking = req.body.tracking;
        // if (tracking?.length > 0) {
        //     // const resTracking = await Promise.all(tracking.map(async (prog: any) => {
        //     //     const res = await track.create({...prog, projectId: projectCreated.id});
        //     //     return res;
        //     // }));

        //     // allTracks = [...resTracking]

        //     // const response = {
        //     //     project: {
        //     //         ...projectCreated,
        //     //         tracking: allTracks
        //     //     }
        //     // }
        //     // return res.status(201).send(response)

        // } else {
            console.log('Passed')
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
            const response = {
                project: {
                    ...proj,
                    tracking: allTracks
                }
            }
            return res.status(201).send(response)

        // }

    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}