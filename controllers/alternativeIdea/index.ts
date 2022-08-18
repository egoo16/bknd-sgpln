'use strict'

import { Request, Response } from "express";
import models from "../../db/connection";
import { FcreateIdeaAlternativeComplete, FgetPreinversion } from './feature';


import ideaAlternative from "../../models/BancoIdeas/ideaAlternative";
import preliminaryName from "../../models/BancoIdeas/preliminaryName";
import responsibleEntity from "../../models/BancoIdeas/responsibleEntity";
import populationDelimitation from "../../models/BancoIdeas/populationDelimitation";
import geographicArea from '../../models/BancoIdeas/geographicArea';
import projectDescription from '../../models/BancoIdeas/projectDescription';
import referencePopulation from "../../models/BancoIdeas/referencePopulation";
import denomination from "../../models/BancoIdeas/denomination";
import coordinates from "../../models/BancoIdeas/coordinates";
import executionTime from "../../models/BancoIdeas/executionTime";
import generalInformation from "../../models/BancoIdeas/generalInformation";
import qualification from "../../models/BancoIdeas/qualification";


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
export async function getPreinversion(req: Request, res: Response) {
    try {
        let preInversion = await FgetPreinversion(req.params.id)
        return res.status(200).send(preInversion)
    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}


export const getDenomination = async (req: Request, res: Response) => {
    let transaction = await models.transaction()
    try {
        let data = await denomination.findAll();
        if (data.length <= 0) {
            let den1 = { name: 'Alumnos' };
            let denCreated = await denomination.create(den1, { transaction })
            den1.name = 'Pacientes'
            denCreated = await denomination.create(den1, { transaction })
            den1.name = 'Agricultores'
            denCreated = await denomination.create(den1, { transaction })
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
    let transaction = await models.transaction()
    try {
        let data = await referencePopulation.findAll();
        if (data.length <= 0) {
            let ref = { name: 'Nacional' };
            let denCreated = await referencePopulation.create(ref, { transaction })
            ref.name = 'Departamental'
            denCreated = await referencePopulation.create(ref, { transaction })
            ref.name = 'Municipal'
            denCreated = await referencePopulation.create(ref, { transaction })
            ref.name = 'Comunal'
            denCreated = await referencePopulation.create(ref, { transaction })
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
    let transaction = await models.transaction()
    try {
        let idAlternative = req.params.id;

        let data = await ideaAlternative.findAll({
            where: {
                sectionBIId: idAlternative
            },
            include: [
                {
                    required: false,
                    model: preliminaryName
                },
                {
                    required: false,
                    model: responsibleEntity
                },

                {
                    required: false,
                    model: qualification
                },
            ]
        });

        let popDelimitation = await populationDelimitation.findAll({
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
        })

        let gArea = await geographicArea.findAll({
            include: [
                {
                    required: false,
                    model: coordinates
                },
            ]
        })

        let pDescription = await projectDescription.findAll({
            include: [
                {
                    required: false,
                    model: executionTime
                },
            ]
        })



        res.status(200).json({
            msg: "Datos Obtenidos",
            data,
            popDelimitation,
            gArea,
            pDescription
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
};


export const getPertinencia = async (req: Request, res: Response) => {
    let transaction = await models.transaction()
    try {
        let idAlternative = req.params.id;

        let alternative = await ideaAlternative.findOne({
            where: {
                codigo: idAlternative
            },
            include: [
                {
                    required: false,
                    model: populationDelimitation,
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
                },
                {
                    required: false,
                    model: geographicArea,
                    attributes: ['availableTerrain', 'oneAvailableTerrain', 'investPurchase', 'registerGovernmentTerrain', 'statusDescribe'],
                },
                {
                    required: false,
                    model: projectDescription,
                    include: [
                        {
                            required: false,
                            model: executionTime
                        },
                    ]
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
            totalPopulation: alternative.popDelimit.totalPopulation,
            gender: alternative.popDelimit.gender,
            estimateBeneficiaries: alternative.popDelimit.estimateBeneficiaries,
            preliminaryCharacterization: alternative.popDelimit.preliminaryCharacterization,
            coverage: alternative.popDelimit.coverage,
            referencePopulation: alternative.popDelimit.refPop.name,
            denomination: alternative.popDelimit.denmtion.name,

        };

        let criterio4 = {
            availableTerrain: alternative.geoArea.availableTerrain,
            oneAvailableTerrain: alternative.geoArea.oneAvailableTerrain,
            investPurchase: alternative.geoArea.investPurchase,
        };

        let criterio5 = {
            registerGovernmentTerrain: alternative.geoArea.registerGovernmentTerrain,
            statusDescribe: alternative.geoArea.statusDescribe,
        };

        let criterio6 = {
            projectType: alternative.projDesc.projectType,
            formulationProcess: alternative.projDesc.formulationProcess,
            descriptionInterventions: alternative.projDesc.descriptionInterventions,
            complexity: alternative.projDesc.complexity,

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