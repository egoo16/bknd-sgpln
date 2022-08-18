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

        let datosResult: any[] = [];

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

        if (data || data.length > 0) {
            let resPopDel = await Promise.all(data.map(async (alter: any) => {
                let idAlt = alter.codigo;
                let popDelimitation = await populationDelimitation.findOne({
                    where: {
                        AlterId: idAlt
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

                let gArea = await geographicArea.findOne({
                    where: {
                        AlterId: idAlt
                    },
                    include: [
                        {
                            required: false,
                            model: coordinates
                        },
                    ]
                });
                let pDescription = await projectDescription.findOne({
                    where: {
                        AlterId: idAlt
                    },
                    include: [
                        {
                            required: false,
                            model: executionTime
                        },
                    ]
                });

                let alternativa: any = {
                    codigo: alter.codigo,
                    sectionBIId: alter.sectionBIId,
                    state: alter.state,
                    createdAt: alter.createdAt,
                    updatedAt: alter.updatedAt,
                    deletedAt: alter.deletedAt,
                }
                alternativa.preName = {
                    codigo: alter.preName.codigo,
                    AlterId: alter.preName.AlterId,
                    typeProject: alter.preName.typeProject,
                    proccess: alter.preName.proccess,
                    object: alter.preName.object,
                    departament: alter.preName.departament,
                    municipality: alter.preName.municipality,
                    village: alter.preName.village,
                    preliminaryName: alter.preName.preliminaryName,
                    createdAt: alter.preName.createdAt,
                    updatedAt: alter.preName.updatedAt,
                    deletedAt: alter.preName.deletedAt,
                }
                alternativa.resEntity = {
                    codigo: alter.resEntity.codigo,
                    AlterId: alter.resEntity.AlterId,
                    nameEPI: alter.resEntity.nameEPI,
                    leaderName: alter.resEntity.leaderName,
                    email: alter.resEntity.email,
                    phone: alter.resEntity.phone,
                    createdAt: alter.resEntity.createdAt,
                    updatedAt: alter.resEntity.updatedAt,
                    deletedAt: alter.resEntity.deletedAt,

                }

                if (popDelimitation) {
                    alternativa.popDelimit = {
                        codigo: popDelimitation.codigo,
                        AlterId: popDelimitation.AlterId,
                        refPopId: popDelimitation.refPopId,
                        denId: popDelimitation.denId,
                        totalPopulation: popDelimitation.totalPopulation,
                        gender: popDelimitation.gender,
                        estimateBeneficiaries: popDelimitation.estimateBeneficiaries,
                        preliminaryCharacterization: popDelimitation.preliminaryCharacterization,
                        coverage: popDelimitation.coverage,
                        createdAt: popDelimitation.createdAt,
                        updatedAt: popDelimitation.updatedAt,
                        deletedAt: popDelimitation.deletedAt,
                    };
                }

                if (popDelimitation?.refPop) {
                    alternativa.popDelimit.refPop = {
                        codigo: popDelimitation.refPop.codigo,
                        name: popDelimitation.refPop.name,
                        createdAt: popDelimitation.refPop.createdAt,
                        updatedAt: popDelimitation.refPop.updatedAt,
                        deletedAt: popDelimitation.refPop.deletedAt,
                    };
                }

                if (popDelimitation?.denmtion) {
                    alternativa.popDelimitdenmtion = {
                        codigo: popDelimitation.denmtion.codigo,
                        name: popDelimitation.denmtion.name,
                        createdAt: popDelimitation.denmtion.createdAt,
                        updatedAt: popDelimitation.denmtion.updatedAt,
                        deletedAt: popDelimitation.denmtion.deletedAt,
                    };
                }

                if (gArea) {
                    alternativa.geoArea = {
                        codigo: gArea.codigo,
                        AlterId: gArea.AlterId,
                        availableTerrain: gArea.availableTerrain,
                        oneAvailableTerrain: gArea.oneAvailableTerrain,
                        investPurchase: gArea.investPurchase,
                        governmentTerrain: gArea.governmentTerrain,
                        registerGovernmentTerrain: gArea.registerGovernmentTerrain,
                        statusDescribe: gArea.statusDescribe,
                        finca: gArea.finca,
                        folio: gArea.folio,
                        libro: gArea.libro,
                        plano: gArea.plano,
                        slightIncline: gArea.slightIncline,
                        broken: gArea.broken,
                        image: gArea.image,
                        imageUrl: gArea.imageUrl,
                        description: gArea.description,
                        basicServices: gArea.basicServices,
                        descriptionBasicServices: gArea.descriptionBasicServices,
                        descriptionLocation: gArea.descriptionLocation,
                        createdAt: gArea.createdAt,
                        updatedAt: gArea.updatedAt,
                        deletedAt: gArea.deletedAt,
                    };
                    alternativa.geoArea.coordinates = []
                }

                if (gArea?.coordinates || gArea?.coordinates.length > 0) {
                    gArea.coordinates.map((coordinate: any) => {
                        let coord = {
                            codigo: coordinate.codigo,
                            geoAreaId: coordinate.geoAreaId,
                            latitude: coordinate.latitude,
                            createdAt: coordinate.createdAt,
                            updatedAt: coordinate.updatedAt,
                            deletedAt: coordinate.deletedAt,
                        }
                        alternativa.geoArea.coordinates.push(coordinate);
                    });
                }

                if (pDescription) {

                    alternativa.projDesc = {
                        codigo: pDescription.codigo,
                        AlterId: pDescription.AlterId,
                        projectType: pDescription.projectType,
                        formulationProcess: pDescription.formulationProcess,
                        formulationProcessDescription: pDescription.formulationProcessDescription,
                        descriptionInterventions: pDescription.descriptionInterventions,
                        complexity: pDescription.complexity,
                        estimatedCost: pDescription.estimatedCost,
                        investmentCost: pDescription.investmentCost,
                        fundingSources: pDescription.fundingSources,
                        foundingSourcesName: pDescription.foundingSourcesName,
                        createdAt: pDescription.createdAt,
                        updatedAt: pDescription.updatedAt,
                        deletedAt: pDescription.deletedAt,
                    };
                }


                // alternativa.geoArea = gArea;
                // alternativa.projDesc = pDescription;
                console.log('Alterantiivaaaaa', alternativa);
                datosResult.push(alternativa);

                return res;
            }));
        }

        // let datosResult = await ideaAlternative.findAll({
        //     where: {
        //         sectionBIId: idAlternative
        //     },
        //     include: [
        //         {
        //             required: false,
        //             model: preliminaryName
        //         },
        //         {
        //             required: false,
        //             model: responsibleEntity
        //         },

        //         {
        //             required: false,
        //             model: populationDelimitation,
        //             include: [
        //                 {
        //                     required: false,
        //                     model: referencePopulation
        //                 },
        //                 {
        //                     required: false,
        //                     model: denomination
        //                 },
        //             ]
        //         },
        //         {
        //             required: false,
        //             model: geographicArea,
        //             include: [
        //                 {
        //                     required: false,
        //                     model: coordinates
        //                 },
        //             ]

        //         },
        //         {
        //             required: false,
        //             model: projectDescription,
        //             include: [
        //                 {
        //                     required: false,
        //                     model: executionTime
        //                 },
        //             ]
        //         },
        //         {
        //             required: false,
        //             model: qualification
        //         },
        //     ]
        // });

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