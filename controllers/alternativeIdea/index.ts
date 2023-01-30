'use strict'

import { Request, Response } from "express";
import models from "../../db/connection";
import { denomination, referencePopulation, ideaAlternative, populationDelimitation, geographicArea, projectDescription, executionTime, generalInformation } from "../../models/BancoIdeas";
import dataGeo from "../../models/BancoIdeas/datageo.model";
import { createSecondPartAlternative, createFirstPartAlternative, FaddPertinenceQuality, FcreateIdeaAlternativeComplete, FgetPreinversion, fupdateIdeaAlternativeComplete, getAlternativeComplete, getAlternatives } from './feature';


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

export async function createIdeaAlternativeFirstPart(req: Request, res: Response) {
    let transaction = await models.transaction()
    console.log("🚀 ~ file: index.ts:27 ~ createIdeaAlternativeFirstPart ~ req", req.body)
    try {
        let ideaAlternative = await createFirstPartAlternative(req.body, transaction)
        transaction.commit()
        return res.status(200).send(ideaAlternative)
    } catch (error: any) {
        transaction.rollback()
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}

export async function createIdeaAlternativeSecondPart(req: Request, res: Response) {
    let transaction = await models.transaction()
    try {
        console.log("🚀 ~ file: index.ts:40 ~ createIdeaAlternativeSecondPart ~ req", req.body)
        const idAlternative = req.params.id
        let preInversion = await createSecondPartAlternative(idAlternative, req.body, transaction)
        return res.status(200).send(preInversion)
    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}

/**
 * Funcion para  listar las configuraciones globales
 * @param {*} req
 */
export async function addPertinenceQuality(req: any, res: Response) {
    let transaction = await models.transaction()
    try {
        console.log(req.body)
        let matrixPertinence = {...req.body}
        matrixPertinence.terreno = JSON.stringify(req.body.terreno)
        let pertinence = await FaddPertinenceQuality(matrixPertinence, transaction, req.user)
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
        });

        let terrains;

        if (geograficArea) {
            terrains = await dataGeo.findAll({
                where: {
                    geoAreaId: geograficArea.codigo
                },
            });
        }


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

        //TODO: Agregar Criterios

        let criterio4 = {
            availableTerrain: geograficArea.availableTerrain,
            oneAvailableTerrain: geograficArea.oneAvailableTerrain,
            investPurchase: geograficArea.investPurchase,
        };

        let criterio5 = { 
            terrenos: terrains
        }

        // let criterio5 = {
        //     registerGovernmentTerrain: geograficArea.registerGovernmentTerrain,
        //     statusDescribe: geograficArea.statusDescribe,
        // };

        let criterio6 = {
            projectType: projectDes.projectType,
            formulationProcess: projectDes.formulationProcess,
            descriptionInterventions: projectDes.descriptionInterventions,
            complexity: projectDes.complexity,

        };

        let criterios = {
            // TODO: Agregar Criterios 4 y 5
            criterio1, criterio2, criterio3, criterio4, criterio5, criterio6
            // criterio1, criterio2, criterio3, criterio4, criterio6
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
        let ideaAlternative: any;
        let fullIdeaAlternative;
        transaction = await models.transaction()

        ideaAlternative = await fupdateIdeaAlternativeComplete(req.body, transaction)

        console.log("🚀 ~ file: index.ts:272 ~ updateIdeaAlternativeComplete ~ ideaAlternative", ideaAlternative.alternative.codigo)
        if (ideaAlternative) {
            fullIdeaAlternative = await getAlternativeComplete(ideaAlternative.alternative.codigo)
            console.log("🚀 ~ file: index.ts:274 ~ updateIdeaAlternativeComplete ~ fullIdeaAlternative", fullIdeaAlternative)
            return res.status(200).send(fullIdeaAlternative)
        } else {
            return res.status(500).send({ message: `No se pudo a.ctualizar la alternativa` })
        }
        // await transaction.commit()
    } catch (error: any) {
        await transaction.rollback();
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}