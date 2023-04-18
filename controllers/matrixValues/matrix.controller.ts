import { Request, Response } from 'express';
import { IAdmissionConfig, admissionConfig } from '../../models';
import { IRelevanceInvestment, relevanceBeneficiaries, relevanceComplexy, relevanceInvestment, IRelevanceBeneficiaries, IRelevanceComplexy, relevanceStage, IRelevanceStage } from '../../models/matrixModels/relevanceConfig';


export async function getAdmissionMatrixValues(req: Request, res: Response) {
    try {
        let data = await admissionConfig.findAll()
        if (data.length <= 0) {
            let config: IAdmissionConfig = {
                beneficiariestMaxValue: 10,
                costMaxValue: 10,
                goalsMaxValue: 20,
                scheduleMaxValue: 10,
                statementMaxValue: 20,
                tdrMaxValue: 30
            };

            let resConfig = await admissionConfig.create(config);

            data = await admissionConfig.findAll()
            return res.status(200).send(data[0])
        }

        return res.status(200).send(data[0])


    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}

export const updateAdmissionValues = async (req: Request, res: Response) => {
    try {
        if (req.body) {

            const admissionUp: IAdmissionConfig = req.body;

            const verifyAdmissionC = await admissionConfig.findOne({ where: { id: admissionUp.id } })
            if (!verifyAdmissionC) {
                throw `Error al encontrar Regla`;
            }


            const admissionUpdated = await admissionConfig.update(admissionUp, {
                where: {
                    id: admissionUp.id
                }
            });
            const verifyAdmissionUpdated = await admissionConfig.findOne({ where: { id: admissionUp.id } })

            return res.status(200).json({
                msg: 'Reglas actualizadas correctamente',
                data: verifyAdmissionUpdated
            });
        }
        else {
            throw `Error al Modificar Reglas`;
        }

    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
}

export async function getRelevanceMatrixValues(req: Request, res: Response) {
    try {
        let investmentV = await relevanceInvestment.findAll();
        let beneficiariesV = await relevanceBeneficiaries.findAll();
        let complexyV = await relevanceComplexy.findAll();
        let stageV = await relevanceStage.findAll();

        if (investmentV.length <= 0) {

            let config: IRelevanceInvestment[] = [
                { rangeMin: 0, rangeMax: 300000, rangeValue: 6 },
                { rangeMin: 300001, rangeMax: 500000, rangeValue: 12 },
                { rangeMin: 500001, rangeMax: 699999, rangeValue: 18 },
                { rangeMin: 700000, rangeMax: 900000, rangeValue: 24 },
                { rangeMin: 900001, rangeMax: 10000000, rangeValue: 30 },
                { rangeMin: 10000001, rangeMax: 19000000, rangeValue: 38 },
                { rangeMin: 19000001, rangeMax: 30000000, rangeValue: 46 },
                { rangeMin: 30000001, rangeMax: 40000000, rangeValue: 54 },
                { rangeMin: 40000001, rangeMax: 50000000, rangeValue: 62 },
                { rangeMin: 50000001, rangeMax: 50000001, rangeValue: 100 },
            ];

            let resConfig = await relevanceInvestment.bulkCreate(config).then(function () {
                console.log('resConfig created');
            }).catch(function (err: any) {
                console.error(err)
            });

            investmentV = await relevanceInvestment.findAll()
        }

        if (beneficiariesV.length <= 0) {

            let config: IRelevanceBeneficiaries[] = [
                { rangeMin: 1, rangeMax: 1000, rangeValue: 20 },
                { rangeMin: 1001, rangeMax: 10000, rangeValue: 40 },
                { rangeMin: 10001, rangeMax: 20000, rangeValue: 60 },
                { rangeMin: 20001, rangeMax: 50000, rangeValue: 80 },
                { rangeMin: 50001, rangeMax: 50001, rangeValue: 100 },
            ];

            let resConfig = await relevanceBeneficiaries.bulkCreate(config).then(function () {
                console.log('resConfig created');
            }).catch(function (err: any) {
                console.error(err)
            });

            beneficiariesV = await relevanceBeneficiaries.findAll()
        }

        if (complexyV.length <= 0) {

            let config: IRelevanceComplexy[] = [
                { name: 'ALTA', rangeValue: 100 },
                { name: 'MEDIA', rangeValue: 67 },
                { name: 'BAJA', rangeValue: 34 },
            ];

            let resConfig = await relevanceComplexy.bulkCreate(config).then(function () {
                console.log('resConfig created');
            }).catch(function (err: any) {
                console.error(err)
            });

            complexyV = await relevanceComplexy.findAll()
        }

        if (stageV.length <= 0) {

            let config: IRelevanceStage[] = [
                { rangeMin: 0, rangeMax: 40, suggestedStage: 'PERFIL' },
                { rangeMin: 41, rangeMax: 69, suggestedStage: 'PREFACTIBILIDAD' },
                { rangeMin: 70, rangeMax: 100, suggestedStage: 'FACTIBILIDAD' },
            ];

            let resConfig = await relevanceStage.bulkCreate(config).then(function () {
                console.log('resConfig created');
            }).catch(function (err: any) {
                console.error(err)
            });

            stageV = await relevanceStage.findAll()
        }


        return res.status(200).send({
            investmentValues: investmentV,
            beneficiaresValues: beneficiariesV,
            complexyValues: complexyV,
            stageValues: stageV
        })


    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}

export const updateRelevanceInvestment = async (req: Request, res: Response) => {
    try {
        if (req.body) {

            const relevanceI: IRelevanceInvestment = req.body;

            const verifyRelevanceI = await relevanceInvestment.findOne({ where: { id: relevanceI.id } })
            if (!verifyRelevanceI) {
                throw `Error al encontrar Regla`;
            }

            const relevanceIUpdated = await relevanceInvestment.update(relevanceI, {
                where: {
                    id: relevanceI.id
                }
            });

            const verifyRelevanceUpdted = await relevanceInvestment.findOne({ where: { id: relevanceI.id } })

            return res.status(200).json({
                msj: 'Reglas actualizadas correctamente',
                data: verifyRelevanceUpdted
            });
        }
        else {
            throw `Error al Modificar Reglas`;
        }

    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
}

export const updateRelevanceBeneficiaries = async (req: Request, res: Response) => {
    try {
        if (req.body) {

            const relevanceB: IRelevanceBeneficiaries = req.body;

            const verifyRelevanceB = await relevanceBeneficiaries.findOne({ where: { id: relevanceB.id } })
            if (!verifyRelevanceB) {
                throw `Error al encontrar Regla`;
            }

            const relevanceBUpdated = await relevanceBeneficiaries.update(relevanceB, {
                where: {
                    id: relevanceB.id
                }
            });
            const verifyRelevanceBUpdated = await relevanceBeneficiaries.findOne({ where: { id: relevanceB.id } })

            return res.status(200).json({
                msj: 'Reglas actualizadas correctamente',
                data: verifyRelevanceBUpdated
            });
        }
        else {
            throw `Error al Modificar Reglas`;
        }

    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
}

export const updateRelevanceComplexy = async (req: Request, res: Response) => {
    try {
        if (req.body) {

            const relevanceC: IRelevanceComplexy = req.body;

            const verifyRelevanceC = await relevanceComplexy.findOne({ where: { id: relevanceC.id } })
            if (!verifyRelevanceC) {
                throw `Error al encontrar Regla`;
            }

            const relevanceCUpdated = await relevanceComplexy.update(relevanceC, {
                where: {
                    id: relevanceC.id
                }
            });

            const verifyRelevanceCUpdated = await relevanceComplexy.findOne({ where: { id: relevanceC.id } })

            return res.status(200).json({
                msj: 'Reglas actualizadas correctamente',
                data: verifyRelevanceCUpdated
            });
        }
        else {
            throw `Error al Modificar Reglas`;
        }

    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
}

export const updateRelevanceStage = async (req: Request, res: Response) => {
    try {
        if (req.body) {

            const relevanceS: IRelevanceStage = req.body;

            const verifyRelevanceS = await relevanceStage.findOne({ where: { id: relevanceS.id } })
            if (!verifyRelevanceS) {
                throw `Error al encontrar Regla`;
            }

            const relevanceSUpdated = await relevanceStage.update(relevanceS, {
                where: {
                    id: relevanceS.id
                }
            });
            const verifyRelevanceSUpdated = await relevanceStage.findOne({ where: { id: relevanceS.id } })

            return res.status(200).json({
                msj: 'Reglas actualizadas correctamente',
                data: verifyRelevanceSUpdated
            });
        }
        else {
            throw `Error al Modificar Reglas`;
        }

    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
}