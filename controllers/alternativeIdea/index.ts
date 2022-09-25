'use strict'

import { Request, Response } from "express";
import models from "../../db/connection";
import { FaddPertinenceQuality, FcreateIdeaAlternativeComplete, FgetPreinversion, fupdateIdeaAlternativeComplete, getAlternatives } from './feature';


import ideaAlternative from "../../models/BancoIdeas/ideaAlternative";

import populationDelimitation from "../../models/BancoIdeas/populationDelimitation";
import geographicArea from '../../models/BancoIdeas/geographicArea';
import projectDescription from '../../models/BancoIdeas/projectDescription';
import referencePopulation from "../../models/BancoIdeas/referencePopulation";
import denomination from "../../models/BancoIdeas/denomination";
import executionTime from "../../models/BancoIdeas/executionTime";
import generalInformation from "../../models/BancoIdeas/generalInformation";



/**
 * Funcion para  listar las configuraciones globales
 * @param {*} req
 */
export async function createIdeaAlternativeComplete(req: Request, res: Response) {
    let transaction = await models.transaction()
    try {
        let ideaAlternative = await FcreateIdeaAlternativeComplete(req.body, transaction)
        transaction.commit()
        return res.status(200).send(ideaAlternative)
    } catch (error: any) {
        transaction.rollback()
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}

/**
 * Funcion para  listar las configuraciones globales
 * @param {*} req
 */
export async function addPertinenceQuality(req: Request, res: Response) {
    let transaction = await models.transaction()
    try {
        let pertinence = await FaddPertinenceQuality(req.body, transaction)
        transaction.commit()
        return res.status(200).send(pertinence)
    } catch (error: any) {
        transaction.rollback()
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}



/**
 * Funcion para  listar las configuraciones globales
 * @param {*} req
 */
export async function getPreinversion(req: Request, res: Response) {
    try {
        let preInversion = await FgetPreinversion(req.params.id)
        return res.status(200).send(preInversion)
    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}


export const getDenomination = async (req: Request, res: Response) => {
    try {
        let data = await denomination.findAll();
        if (data.length <= 0) {
            let den1 = { name: 'Alumnos' };
            let denCreated = await denomination.create(den1)
            den1.name = 'Pacientes'
            denCreated = await denomination.create(den1)
            den1.name = 'Agricultores'
            denCreated = await denomination.create(den1)
        }
        data = await denomination.findAll();


        res.status(200).json({
            msg: "Datos Obtenidos",
            data,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
};

export const getReferencePopulation = async (req: Request, res: Response) => {
    try {
        let data = await referencePopulation.findAll();
        if (data.length <= 0) {
            let ref = { name: 'Nacional' };
            let denCreated = await referencePopulation.create(ref)
            ref.name = 'Departamental'
            denCreated = await referencePopulation.create(ref)
            ref.name = 'Municipal'
            denCreated = await referencePopulation.create(ref)
            ref.name = 'Comunal'
            denCreated = await referencePopulation.create(ref)
        }
        data = await referencePopulation.findAll();


        res.status(200).json({
            msg: "Datos Obtenidos",
            data,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
};

export const getAlternative = async (req: Request, res: Response) => {
    try {
        let idAlternative = req.params.id;

        let datosResult: any[] = [];

        datosResult = await getAlternatives(idAlternative);

        res.status(200).json({
            msg: "Datos Obtenidos",
            data: datosResult,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
};


export const getPertinencia = async (req: Request, res: Response) => {
    try {
        let idAlternative = req.params.id;


        let alternative = await ideaAlternative.findOne({
            where: {
                codigo: idAlternative
            }
        });

        let population = await populationDelimitation.findOne({
            where: {
                AlterId: alternative.codigo
            },
            include: [
                {
                    required: false,
                    model: referencePopulation
                },
                {
                    required: false,
                    model: denomination
                },
            ]
        });


        let geograficArea = await geographicArea.findOne({
            where: {
                AlterId: alternative.codigo
            },
            attributes: ['availableTerrain', 'oneAvailableTerrain', 'investPurchase', 'registerGovernmentTerrain', 'statusDescribe'],
        });

        let projectDes = await projectDescription.findOne({
            where: {
                AlterId: alternative.codigo
            },
            include: [
                {
                    required: false,
                    model: executionTime
                },
            ]
        });

        let generalInformations = await generalInformation.findOne({
            where: {
                codigo: alternative.sectionBIId
            },
            attributes: ['baseLine', 'generalObjective', 'expectedChange'],
        });

        let criterio1 = { baseLine: generalInformations.baseLine };
        let criterio2 = {
            generalObjective: generalInformations.generalObjective,
            expectedChange: generalInformations.expectedChange
        };
        let criterio3 = {
            totalPopulation: population.totalPopulation,
            gender: population.gender,
            estimateBeneficiaries: population.estimateBeneficiaries,
            preliminaryCharacterization: population.preliminaryCharacterization,
            coverage: population.coverage,
            referencePopulation: population.refPop.name,
            denomination: population.denmtion.name,

        };

        let criterio4 = {
            availableTerrain: geograficArea.availableTerrain,
            oneAvailableTerrain: geograficArea.oneAvailableTerrain,
            investPurchase: geograficArea.investPurchase,
        };

        let criterio5 = {
            registerGovernmentTerrain: geograficArea.registerGovernmentTerrain,
            statusDescribe: geograficArea.statusDescribe,
        };

        let criterio6 = {
            projectType: projectDes.projectType,
            formulationProcess: projectDes.formulationProcess,
            descriptionInterventions: projectDes.descriptionInterventions,
            complexity: projectDes.complexity,

        };

        let criterios = {
            criterio1, criterio2, criterio3, criterio4, criterio5, criterio6
        }

        res.status(200).json({
            msg: "Datos Obtenidos",
            data: criterios,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
};


/**
 * Funcion para  actualizar Alternativa
 * @param {*} req
 */
export async function updateIdeaAlternativeComplete(req: Request, res: Response) {
    let transaction;
    try {
        let ideaAlternative;
        transaction = await models.transaction()

        ideaAlternative = await fupdateIdeaAlternativeComplete(req.body, transaction)
        // await transaction.commit()
        return res.status(200).send(ideaAlternative)
    } catch (error: any) {
        await transaction.rollback();
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}