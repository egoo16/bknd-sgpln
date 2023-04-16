import { Request, Response } from 'express';
import { IAdmisionConfig, admisionConfig } from '../../models';


export async function getAdmissionMatrixValues(req: Request, res: Response) {
    try {
        let data = await admisionConfig.findAll()
        if (data.length <= 0) {
            let config: IAdmisionConfig = {
                beneficiariestMaxValue: 10,
                costMaxValue: 10,
                goalsMaxValue: 20,
                scheduleMaxValue: 10,
                statementMaxValue: 20,
                tdrMaxValue: 30
            };

            let resConfig = await admisionConfig.create(config);

            data = await admisionConfig.findAll()
            return res.status(200).send(data[0])
        }

        return res.status(200).send(data)


    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}