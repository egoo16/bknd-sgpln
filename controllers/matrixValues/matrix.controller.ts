import { Request, Response } from 'express';
import { IAdmisionConfig, admisionConfig } from '../../models';
import { IRelevanceInvestment, relevanceBeneficiaries, relevanceComplexy, relevanceInvestment, IRelevanceBeneficiaries, IRelevanceComplexy, relevanceStage, IRelevanceStage } from '../../models/matrixModels/relevanceConfig';


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

        return res.status(200).send(data[0])


    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
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

