'use strict'
import models from "../../db/connection";
import { projectDescription, populationDelimitation, ideaAlternative, qualification, generalInformation, preInvestment, preliminaryName, denomination, executionTime, geographicArea, responsibleEntity, possibleAlternatives, possibleCauses, possibleEffects, stage, referencePopulation } from "../../models/BancoIdeas";
import dataGeo from "../../models/BancoIdeas/datageo.model";
import { IPopulationAlt } from '../../models/BancoIdeas/populationAlt';
import populationAlt from '../../models/BancoIdeas/populationAlt';
import { relevanceBeneficiaries, relevanceComplexy, relevanceInvestment, relevanceStage } from '../../models/matrixModels/relevanceConfig';



export async function FgetPreinversion(idAlternativa: any) {
    try {

        const rango = {
            valor: '',
            resultado: '',
        }
        const estimacion = {
            valor: '',
            resultado: '',
        }
        const complejidad = {
            valor: '',
            resultado: '',
        }
        const etapa = {
            valor: '',
            resultado: '',
        }




        const proDes = await projectDescription.findOne({ where: { AlterId: idAlternativa } })
        const popDel = await populationDelimitation.findOne({ where: { AlterId: idAlternativa } })
        let costo = proDes.investmentCost
        let rangoInversion = 0
        let resRangoInversion = ''



        //RANGO DE INVERSIÓN

        let relInvestmenRes = await relevanceInvestment.findAll({
            where: {
                rangeMin: { lte: +costo },
                rangeMax: { gte: +costo },
            },
        });

        if (relInvestmenRes.length <= 0) {
            const relInvestmenResMax = await relevanceInvestment.max('rangeMax');
            if (+costo >= +relInvestmenResMax) {
                const investmentMaxFind = await relevanceInvestment.findOne({
                    where: {
                        rangeMax: +relInvestmenResMax
                    }
                });
                rango.resultado = `La cantidad es mayor a ${investmentMaxFind.rangeMax} `;
                rango.valor = investmentMaxFind.rangeValue;
            } else {
                throw `Ocurrio un error mientras se calculaba la matriz. El rango de Inversión no fue encontrado.`;
            }

        } else {
            rango.resultado = `Entre ${relInvestmenRes[0].rangeMin} y ${relInvestmenRes[0].rangeMax} `;
            rango.valor = relInvestmenRes[0].rangeValue;
        }





        //ESTIMACIÓN BENEFICIARIOS 
        let benefits = popDel.estimateBeneficiaries

        let relBeneficiariesRes = await relevanceBeneficiaries.findAll({
            where: {
                rangeMin: { lte: +benefits },
                rangeMax: { gte: +benefits },
            },
        });

        if (relBeneficiariesRes.length <= 0) {
            const relBeneficiariesMaxRes = await relevanceBeneficiaries.max('rangeMax');
            if (+benefits >= +relBeneficiariesMaxRes) {
                const beneficiariesMaxFind = await relevanceBeneficiaries.findOne({
                    where: {
                        rangeMax: +relBeneficiariesMaxRes
                    }
                });
                estimacion.resultado = `La cantidad es mayor a ${beneficiariesMaxFind.rangeMax} `;
                estimacion.valor = beneficiariesMaxFind.rangeValue;
            } else {
                throw `Ocurrio un error mientras se calculaba la matriz. El rango de Beneficiarios no fue encontrado.`;
            }

        } else {
            estimacion.resultado = `Entre ${relBeneficiariesRes[0].rangeMin} y ${relBeneficiariesRes[0].rangeMax} `;
            estimacion.valor = relBeneficiariesRes[0].rangeValue;
        }



        //COMPLEJIDAD
        let complejidadToFind = proDes.complexity
        complejidadToFind = complejidadToFind.toUpperCase();

        let relComplexyRes = await relevanceComplexy.findAll({
            where: {
                name: complejidadToFind
            },
        });
        if (relComplexyRes.length <= 0) {
        } else {
            complejidad.resultado = `Complejidad definida como: ${complejidadToFind} `;
            complejidad.valor = relComplexyRes[0].rangeValue;
        }



        const totalSuma = (+rango.valor + +estimacion.valor + +complejidad.valor);
        const valueCalculated = totalSuma / 3

        //Stage
        let relStageRes = await relevanceStage.findAll({
            where: {
                rangeMin: { lte: +valueCalculated },
                rangeMax: { gte: +valueCalculated },
            },
        });

        if (relStageRes.length <= 0) {
            throw `Ocurrio un error mientras se calculaba la matriz. El rango de Etapa no fue encontrado.`;
        } else {
            etapa.resultado = `Entre ${relStageRes[0].rangeMin} y ${relStageRes[0].rangeMax} `;
            etapa.valor = relStageRes[0].suggestedStage;
        }

        //RESULTADO
        let preInversion = {
            rango,
            estimacion,
            complejidad,
            etapa
        }
        await FcreatePreInvestment(preInversion, proDes.AlterId)
        return { preInversion };
    } catch (error) {
        //devuelve errores al cliente
        throw `Error al ingresar Idea alternativa: ${error}`;
    }
}
export async function FcreateIdeaAlternativeComplete(ideaAlt: any, transaction: any) {
    try {
        let alternative;
        ideaAlt.state = 'CREADA';
        let ideaAlternativeCreated = await ideaAlternative.create(ideaAlt, { transaction })
        let codigoAlternativa = ideaAlternativeCreated.codigo
        await FcreatePreleminaryName(ideaAlt.preName, codigoAlternativa, transaction)
        await FcresponsableEntity(ideaAlt.resEntity, codigoAlternativa, transaction)
        await FcreatePopulationDemilitation(ideaAlt.popDelimit, codigoAlternativa, transaction)
        await FcreateGeographicArea(ideaAlt.geoArea, codigoAlternativa, transaction)
        await FcreateProjectDescription(ideaAlt.projDesc, codigoAlternativa, transaction)
        if (ideaAlternativeCreated) {
            alternative = await getAlternativeComplete(ideaAlternativeCreated.codigo)
        }

        return {
            message: `Idea alternativa creada correctamente`,
            alternative
        };
    } catch (error) {
        transaction.rollback()
        //devuelve errores al cliente
        throw `Error al ingresar Idea alternativa: ${error}`;
    }
}

export async function createFirstPartAlternative(ideaAlt: any, transaction: any) {
    try {
        let alternativeToCreate = {
            sectionBIId: ideaAlt.sectionBIId,
            state: 'CREADA'
        }
        console.log("🚀 ~ file: feature.ts:146 ~ createFirstPartAlternative ~ alternativeToCreate", alternativeToCreate)
        let ideaAlternativeCreated = await ideaAlternative.create(alternativeToCreate, { transaction })
        let codigoAlternativa = ideaAlternativeCreated.codigo
        await FcreatePreleminaryName(ideaAlt.preName, codigoAlternativa, transaction)
        await FcresponsableEntity(ideaAlt.resEntity, codigoAlternativa, transaction)
        await FcreatePopulationDemilitation(ideaAlt.popDelimit, codigoAlternativa, transaction)

        let alternative;
        if (ideaAlternativeCreated) {
            alternative = await getAlternativeComplete(ideaAlternativeCreated.codigo)
        }

        return {
            message: `Idea alternativa creada correctamente`,
            alternative
        };
    } catch (error) {
        transaction.rollback()
        //devuelve errores al cliente
        throw `Error al ingresar Idea alternativa: ${error}`;
    }
}


export async function createSecondPartAlternative(idAlternative: string, ideaAlt: any, transaction: any) {
    try {
        let alternative;

        await FcreateGeographicArea(ideaAlt.geoArea, idAlternative, transaction)
        await FcreateProjectDescription(ideaAlt.projDesc, idAlternative, transaction)
        alternative = await getAlternativeComplete(idAlternative)

        return {
            message: `Idea alternativa creada correctamente`,
            alternative
        };
    } catch (error) {
        transaction.rollback()
        //devuelve errores al cliente
        throw `Error al ingresar Idea alternativa: ${error}`;
    }
}

export async function FaddPertinenceQuality(pertinence: any, transaction: any, user?: any) {
    try {

        let total = pertinence.total;
        let result = '';

        if (total >= 60) {
            pertinence.result = 'PERTINENTE';
            result = 'PERTINENTE';
        } else {
            pertinence.result = 'NO PERTINENTE';
            result = 'NO PERTINENTE';
        }


        let pertinenceMatrix = await qualification.findOne({
            where: {
                AlterId: pertinence.AlterId
            }
        })

        if (!pertinenceMatrix) {

            let pertinenceResult = await qualification.create(pertinence, { transaction });

            let alternative = await ideaAlternative.findOne({
                where: {
                    codigo: pertinence.AlterId
                }
            });

            alternative.state = 'CALIFICADA';
            alternative.analizer = user.id;
            alternative.save();

            let generalIdea = await generalInformation.findOne({
                where: {
                    codigo: alternative.sectionBIId
                }
            })

            let state = generalIdea.result;

            if (state == 'PENDIENTE') {
                generalIdea.result = result;
                generalIdea.analizer = user.id;
                generalIdea.save();
            } else if (state == 'NO PERTINENTE') {
                if (result != 'NO PERTINENTE') {
                    generalIdea.result = result;
                    generalIdea.analizer = user.id;
                    generalIdea.save();
                }
            }

            return { message: `Matriz de Pertinencia agregada correctamente` };
        } else {

            pertinenceMatrix.descProblem = pertinence.pertinenceMatrix;
            pertinenceMatrix.descProblemComment = pertinence.pertinenceMatrix;
            pertinenceMatrix.generalObjct = pertinence.pertinenceMatrix;
            pertinenceMatrix.generalObjctComment = pertinence.pertinenceMatrix;
            pertinenceMatrix.anlysDelimitation = pertinence.pertinenceMatrix;
            pertinenceMatrix.anlysDelimitationComment = pertinence.pertinenceMatrix;
            pertinenceMatrix.terrainIdent = pertinence.pertinenceMatrix;
            pertinenceMatrix.terrainIdentComment = pertinence.pertinenceMatrix;
            pertinenceMatrix.legalSituation = pertinence.pertinenceMatrix;
            pertinenceMatrix.legalSituationComment = pertinence.pertinenceMatrix;
            pertinenceMatrix.descAnlys = pertinence.pertinenceMatrix;
            pertinenceMatrix.descAnlysComment = pertinence.pertinenceMatrix;
            pertinenceMatrix.descriptionGeneral = pertinence.pertinenceMatrix;
            pertinenceMatrix.total = pertinence.pertinenceMatrix;
            pertinenceMatrix.result = pertinence.pertinenceMatrix;
            pertinenceMatrix.save();
            return { message: `Matriz de Pertinencia actualizada correctamente` };
        }
    } catch (error) {
        //devuelve errores al cliente
        throw `Error al ingresar Idea alternativa: ${error}`;
    }
}


export async function FcreatePreInvestment(preInversion: any, idAlternativa: any) {
    try {
        let preInversionCreate = {
            AlterId: idAlternativa,
            rangoValor: preInversion.rango.valor,
            rangoResultado: preInversion.rango.resultado,
            estimacionValor: preInversion.estimacion.valor,
            estimacionResultado: preInversion.estimacion.resultado,
            complejidadValor: preInversion.complejidad.valor,
            complejidadResultado: preInversion.complejidad.resultado,
            etapaValor: preInversion.etapa.valor,
            etapaResultado: preInversion.etapa.resultado
        }

        let preInvestmentLoad = await preInvestment.findOne({
            where: {
                AlterId: idAlternativa
            }
        })

        if (!preInvestmentLoad) {
            preInversion.AlterId = idAlternativa
            let preInvestmentHistoryCreated = await preInvestment.create(preInversionCreate);
            return { preInvestmentHistoryCreated, message: `Pre inversion historico creado correctamente` };
        } else {
            preInvestmentLoad.rangoValor = preInversion.rango.valor;
            preInvestmentLoad.rangoResultado = preInversion.rango.resultado;
            preInvestmentLoad.estimacionValor = preInversion.estimacion.valor;
            preInvestmentLoad.estimacionResultado = preInversion.estimacion.resultado;
            preInvestmentLoad.complejidadValor = preInversion.complejidad.valor;
            preInvestmentLoad.complejidadResultado = preInversion.complejidad.resultado;
            preInvestmentLoad.etapaValor = preInversion.etapa.valor;
            preInvestmentLoad.etapaResultado = preInversion.etapa.resultad;
            preInvestmentLoad.save()
            return { preInvestmentLoad, message: `Pre inversion historico creado correctamente` };

        }

    } catch (error) {
        //devuelve errores al cliente
        throw `Error al ingresar Pre inversion historico: ${error}`;
    }
}

export async function FcreatePreleminaryName(prName: any, idAlternativa: string, transaction: any) {
    try {
        prName.AlterId = idAlternativa
        let preliminaryNameCreated = await preliminaryName.create(prName, { transaction })
        return { preliminaryNameCreated, message: `Nombre preliminar ingresado correctamente` };
    } catch (error) {
        transaction.rollback()
        //devuelve errores al cliente
        throw `Error al ingresar nombre preliminar de proyecto: ${error}`;
    }
}

export async function FcresponsableEntity(resEntity: any, idAlternativa: string, transaction: any) {
    try {
        resEntity.AlterId = idAlternativa
        let responsableEntityCreated = await responsibleEntity.create(resEntity, { transaction })
        return { responsableEntityCreated, message: `Entidad responsable ingresada correctamente` };
    } catch (error) {
        transaction.rollback()
        //devuelve errores al cliente
        throw `Error al ingresar entidad responsable: ${error}`;
    }
}

export async function FcreatePopulationDemilitation(popDemiliation: any, idAlternativa: string, transaction: any) {
    try {
        popDemiliation.AlterId = idAlternativa;
        // let refModel = await referencePopulation.findAll();
        // popDemiliation.refPopId = refModel[0].codigo;

        // let DenModel = await denomination.findAll();
        // popDemiliation.denId = DenModel[0].codigo;

        let referenceName = popDemiliation.refPopId;
        let reference = await referencePopulation.findOne({
            where: {
                name: referenceName
            }
        });

        popDemiliation.refPopId = reference.codigo;

        let denominationName = popDemiliation.denId;
        let denmtion = await denomination.findOne({
            where: {
                name: denominationName
            }
        });
        popDemiliation.denId = denmtion.codigo;


        if (popDemiliation.estimateBeneficiaries && popDemiliation.totalPopulation) {
            let estimateBeneficiaries = parseInt(popDemiliation.estimateBeneficiaries, 10);
            let totalPopulation = parseInt(popDemiliation.totalPopulation, 10);
            let multCov = (estimateBeneficiaries / totalPopulation);
            let resCov = (multCov * 100);
            popDemiliation.coverage = resCov;
        }

        let populationDelimitationCreated = await populationDelimitation.create(popDemiliation, { transaction })


        if (popDemiliation.populations) {

            let populations: IPopulationAlt[] = popDemiliation.populations;
            if (populations && populations.length > 0) {

                let resPop = await Promise.all(populations.map(async (population: IPopulationAlt) => {
                    population.popId = populationDelimitationCreated.codigo;
                    let res = await populationAlt.create(population, {
                        transaction,
                    });
                    return res;
                }));
            }
        }
        return { populationDelimitationCreated, message: `Delimitación preliminar ingresada correctamente` };
    } catch (error) {
        //devuelve errores al cliente
        transaction.rollback()
        throw `Error al ingresar delimitación preliminar: ${error}`;
    }
}

export async function FcreateProjectDescription(proDescription: any, idAlternativa: string, transaction: any) {
    try {
        proDescription.AlterId = idAlternativa
        if (proDescription.annual || proDescription.annual == true) { proDescription.annual = 1 }
        else if (!proDescription.annual || proDescription.annual == false) { proDescription.annual = 0 }
        let proDesctiptionCreated = await projectDescription.create(proDescription, { transaction })
        proDescription.execTime.projDescId = proDesctiptionCreated.codigo
        await executionTime.create(proDescription.execTime, { transaction })

        return { proDesctiptionCreated, message: `Descripción preliminar de la idea proyecto ingresada correctamente` };
    } catch (error) {
        transaction.rollback()
        //devuelve errores al cliente
        throw `Error al ingresar descripción preliminar de la idea proyecto preliminar: ${error}`;
    }
}

export async function FcreateGeographicArea(geograpicArea: any, idAlternativa: string, transaction: any) {
    try {
        geograpicArea.AlterId = idAlternativa
        let geographicAreaCreated = await geographicArea.create(geograpicArea, { transaction })
        if (geograpicArea.dataGeo) {
            for (let data of geograpicArea.dataGeo) {
                data.geoAreaId = geographicAreaCreated.codigo
                await dataGeo.create(data, { transaction })
            }
        }
        return { geographicAreaCreated, message: `Area geografica del proyecto ingresada correctamente` };
    } catch (error) {
        transaction.rollback()
        //devuelve errores al cliente
        throw `Error al ingresar area geografica del proyecto: ${error}`;
    }
}

export async function getAlternatives(idIdea: string) {
    try {


        let idAlternative = idIdea;

        let datosResult: any[] = [];

        let data = await ideaAlternative.findAll({
            where: {
                sectionBIId: idAlternative
            },
            order: '"createdAt" DESC',
            include: [
                {
                    required: false,
                    model: preliminaryName
                },
                {
                    required: false,
                    model: responsibleEntity
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

                let quali = await qualification.findOne({
                    where: {
                        AlterId: idAlt
                    },
                });

                let preInv = await preInvestment.findOne({
                    where: {
                        AlterId: idAlt
                    },
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
                    executionUnit: alter.resEntity.executionUnit,
                    leaderName: alter.resEntity.leaderName,
                    email: alter.resEntity.email,
                    phone: alter.resEntity.phone,
                    createdAt: alter.resEntity.createdAt,
                    updatedAt: alter.resEntity.updatedAt,
                    deletedAt: alter.resEntity.deletedAt,

                }

                if (popDelimitation) {
                    let pops = await populationAlt.findAll({
                        where: {
                            popId: popDelimitation.codigo
                        }
                    })

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
                        populations: [...pops]
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

                    let datageo = await dataGeo.findAll({
                        where: {
                            geoAreaId: gArea.codigo
                        }
                    })


                    alternativa.geoArea = {
                        codigo: gArea.codigo,
                        AlterId: gArea.AlterId,
                        availableTerrain: gArea.availableTerrain,
                        oneAvailableTerrain: gArea.oneAvailableTerrain,
                        investPurchase: gArea.investPurchase,
                        createdAt: gArea.createdAt,
                        updatedAt: gArea.updatedAt,
                        deletedAt: gArea.deletedAt,
                    };
                    alternativa.geoArea.dataGeo = []
                    if (datageo) {
                        datageo.map((dta: any) => {
                            let coord = {
                                id: dta.id,
                                geoAreaId: dta.geoAreaId,

                                governmentTerrain: dta.governmentTerrain,
                                registerGovernmentTerrain: dta.registerGovernmentTerrain,
                                statusDescribe: dta.statusDescribe,
                                finca: dta.finca,
                                folio: dta.folio,
                                libro: dta.libro,

                                plano: dta.plano,
                                slightIncline: dta.slightIncline,
                                broken: dta.broken,
                                image: dta.image,
                                imageUrl: dta.imageUrl,
                                description: dta.description,

                                basicServices: dta.basicServices,
                                descriptionBasicServices: dta.descriptionBasicServices,

                                degreesx: dta.degreesx,
                                minutesx: dta.minutesx,
                                secondsx: dta.secondsx,
                                degreesy: dta.degreesy,
                                minutesy: dta.minutesy,
                                secondsy: dta.secondsy,
                                descriptionLocation: dta.descriptionLocation,
                                createdAt: dta.createdAt,
                                updatedAt: dta.updatedAt,
                                deletedAt: dta.deletedAt,
                            }
                            alternativa.geoArea.dataGeo.push(coord);
                        });
                    }
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
                        execTime: null,
                    };
                    if (pDescription.execTime)
                        alternativa.projDesc.execTime = {
                            codigo: pDescription.execTime.codigo,
                            projDescId: pDescription.execTime.projDescId,
                            tentativeTermMonth: pDescription.execTime.tentativeTermMonth,
                            tentativeTermYear: pDescription.execTime.tentativeTermYear,
                            executionDateMonth: pDescription.execTime.executionDateMonth,
                            executionDateYear: pDescription.execTime.executionDateYear,
                            finishDateMonth: pDescription.execTime.finishDateMonth,
                            finishDateYear: pDescription.execTime.finishDateYear,
                            annual: pDescription.execTime.annual,
                            createdAt: pDescription.execTime.createdAt,
                            updatedAt: pDescription.execTime.updatedAt,
                            deletedAt: pDescription.execTime.deletedAt,
                        }
                }
                if (quali) {
                    alternativa.qualification = quali
                }

                if (preInv) {
                    alternativa.preInvestment = {
                        codigo: preInv.codigo,
                        AlterId: preInv.AlterId,
                        rangoValor: preInv.rangoValor,
                        rangoResultado: preInv.rangoResultado,
                        estimacionValor: preInv.estimacionValor,
                        estimacionResultado: preInv.estimacionResultado,
                        complejidadValor: preInv.complejidadValor,
                        complejidadResultado: preInv.complejidadResultado,
                        etapaValor: preInv.etapaValor,
                        etapaResultado: preInv.etapaResultado,
                    }
                }
                datosResult.push(alternativa);
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

        return datosResult;

    } catch (error) {
        throw `Error al obtener alternativas: ${error}`;
    }


}


export async function getAlternativeComplete(idAlternative: string) {

    try {


        let datosResult;

        let data = await ideaAlternative.findOne({
            where: {
                codigo: idAlternative
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
            ]
        });

        if (data) {
            let idAlt = data.codigo;
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

            let quali = await qualification.findOne({
                where: {
                    AlterId: idAlt
                },
            });

            let preInv = await preInvestment.findOne({
                where: {
                    AlterId: idAlt
                },
            });

            let alternativa: any = {
                codigo: data.codigo,
                sectionBIId: data.sectionBIId,
                state: data.data,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
                deletedAt: data.deletedAt,
            }
            alternativa.preName = {
                codigo: data.preName.codigo,
                AlterId: data.preName.AlterId,
                typeProject: data.preName.typeProject,
                proccess: data.preName.proccess,
                object: data.preName.object,
                departament: data.preName.departament,
                municipality: data.preName.municipality,
                village: data.preName.village,
                preliminaryName: data.preName.preliminaryName,
                createdAt: data.preName.createdAt,
                updatedAt: data.preName.updatedAt,
                deletedAt: data.preName.deletedAt,
            }
            alternativa.resEntity = {
                codigo: data.resEntity.codigo,
                AlterId: data.resEntity.AlterId,
                nameEPI: data.resEntity.nameEPI,
                executionUnit: data.resEntity.executionUnit,
                leaderName: data.resEntity.leaderName,
                email: data.resEntity.email,
                phone: data.resEntity.phone,
                createdAt: data.resEntity.createdAt,
                updatedAt: data.resEntity.updatedAt,
                deletedAt: data.resEntity.deletedAt,

            }

            if (popDelimitation) {

                let pops = await populationAlt.findAll({
                    where: {
                        popId: popDelimitation.codigo
                    }
                })
                // let populations: IPopulationAlt[] = []
                // if (pops.length > 0) {
                //     pops.forEach((pop: IPopulationAlt) => {
                //         let population: IPopulationAlt = {
                //             id: pop.id,
                //             type: pop.type,
                //             total: pop.total,
                //             popId: pop.popId
                //         }
                //         populations.push(population)
                //     })
                // }

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
                    populations: [...pops]
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

                let datageo = await dataGeo.findAll({
                    where: {
                        geoAreaId: gArea.codigo
                    }
                })


                alternativa.geoArea = {
                    codigo: gArea.codigo,
                    AlterId: gArea.AlterId,
                    availableTerrain: gArea.availableTerrain,
                    oneAvailableTerrain: gArea.oneAvailableTerrain,
                    investPurchase: gArea.investPurchase,
                    createdAt: gArea.createdAt,
                    updatedAt: gArea.updatedAt,
                    deletedAt: gArea.deletedAt,
                };
                alternativa.geoArea.dataGeo = []
                if (datageo) {
                    datageo.map((dta: any) => {
                        let coord = {
                            id: dta.id,
                            geoAreaId: dta.geoAreaId,

                            governmentTerrain: dta.governmentTerrain,
                            registerGovernmentTerrain: dta.registerGovernmentTerrain,
                            statusDescribe: dta.statusDescribe,
                            finca: dta.finca,
                            folio: dta.folio,
                            libro: dta.libro,

                            plano: dta.plano,
                            slightIncline: dta.slightIncline,
                            broken: dta.broken,
                            image: dta.image,
                            imageUrl: dta.imageUrl,
                            description: dta.description,

                            basicServices: dta.basicServices,
                            descriptionBasicServices: dta.descriptionBasicServices,

                            degreesx: dta.degreesx,
                            minutesx: dta.minutesx,
                            secondsx: dta.secondsx,
                            degreesy: dta.degreesy,
                            minutesy: dta.minutesy,
                            secondsy: dta.secondsy,
                            descriptionLocation: dta.descriptionLocation,
                            createdAt: dta.createdAt,
                            updatedAt: dta.updatedAt,
                            deletedAt: dta.deletedAt,
                        }
                        alternativa.geoArea.dataGeo.push(coord);
                    });
                }
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
                    execTime: null,
                };
                if (pDescription.execTime)
                    alternativa.projDesc.execTime = {
                        codigo: pDescription.execTime.codigo,
                        projDescId: pDescription.execTime.projDescId,
                        tentativeTermMonth: pDescription.execTime.tentativeTermMonth,
                        tentativeTermYear: pDescription.execTime.tentativeTermYear,
                        executionDateMonth: pDescription.execTime.executionDateMonth,
                        executionDateYear: pDescription.execTime.executionDateYear,
                        finishDateMonth: pDescription.execTime.finishDateMonth,
                        finishDateYear: pDescription.execTime.finishDateYear,
                        annual: pDescription.execTime.annual,
                        createdAt: pDescription.execTime.createdAt,
                        updatedAt: pDescription.execTime.updatedAt,
                        deletedAt: pDescription.execTime.deletedAt,
                    }
            }
            if (quali) {
                alternativa.qualification = quali

            }

            if (preInv) {
                alternativa.preInvestment = {
                    codigo: preInv.codigo,
                    AlterId: preInv.AlterId,
                    rangoValor: preInv.rangoValor,
                    rangoResultado: preInv.rangoResultado,
                    estimacionValor: preInv.estimacionValor,
                    estimacionResultado: preInv.estimacionResultado,
                    complejidadValor: preInv.complejidadValor,
                    complejidadResultado: preInv.complejidadResultado,
                    etapaValor: preInv.etapaValor,
                    etapaResultado: preInv.etapaResultado,
                }
            }
            datosResult = alternativa;
            ;
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

        return datosResult;
    } catch (error) {
        throw `Error al obtener alternativa: ${error}`;
    }

}


export async function fupdateIdeaAlternativeComplete(ideaAlt: any, transaction: any) {
    console.log("🚀 ~ file: feature.ts:1033 ~ fupdateIdeaAlternativeComplete ~ ideaAlt", ideaAlt)
    try {
        let alternative;

        let altActive = await ideaAlternative.findOne({
            where: {
                codigo: ideaAlt.codigo
            }
        });
        let ideaAlternativeCreated;
        let alternativeCreatedAsync: any;
        if (altActive) {
            ideaAlt.codigo = undefined;
            ideaAlt.state = 'CREADA';
            ideaAlternativeCreated = await ideaAlternative.create(ideaAlt, { transaction }).then(async (alternativeCreated: any) => {
                alternativeCreatedAsync = { ...alternativeCreated }
                await altActive.destroy({ transaction });
                let codigoAlternativa = alternativeCreated.codigo
                await FcreatePreleminaryName(ideaAlt.preName, codigoAlternativa, transaction)
                await FcresponsableEntity(ideaAlt.resEntity, codigoAlternativa, transaction)
                await FcreatePopulationDemilitation(ideaAlt.popDelimit, codigoAlternativa, transaction)
                await FcreateGeographicArea(ideaAlt.geoArea, codigoAlternativa, transaction)
                await FcreateProjectDescription(ideaAlt.projDesc, codigoAlternativa, transaction)

            }).catch(async (err: any) => {
                await transaction.rollback();
            })
            if (alternativeCreatedAsync) {
                return {
                    message: `Idea alternativa Actualizada correctamente`,
                    alternative: alternativeCreatedAsync
                };
            }
        } else {
            throw `Error al actualizar Alternativa, no existe el ID enviado`
        }


    } catch (error) {
        //devuelve errores al cliente
        throw `Error al Actualizada Idea alternativa: ${error}`;
    }
}





export async function getIdeaCompleta(codigo: string) {
    try {
        const idea = await generalInformation.findOne({
            where: {
                codigo,
            },
            include: [
                {
                    required: false,
                    model: possibleEffects,
                },
                {
                    required: false,
                    model: possibleCauses,
                },
                {
                    required: false,
                    model: possibleAlternatives,
                },
                {
                    required: false,
                    model: stage
                },
            ]
        });

        const alternativeF = await getAlternatives(idea.codigo);
        let ideaFind: any = {
            codigo: idea.codigo,
            author: idea.author,
            analizer: idea.analizer,
            idStage: idea.idStage,
            productId: idea.productId,
            productName: idea.productName,
            date: idea.date,
            correlation: idea.correlation,
            registerCode: idea.registerCode,
            planningInstrument: idea.planningInstrument,
            description: idea.description,
            dateOut: idea.dateOut,
            punctuation: idea.punctuation,
            state: idea.state,
            result: idea.result,
            idEntity: idea.idEntity,
            nameEntity: idea.nameEntity,
            responsibleName: idea.responsibleName,
            email: idea.email,
            phone: idea.phone,
            definitionPotentiality: idea.definitionPotentiality,
            baseLine: idea.baseLine,
            descriptionCurrentSituation: idea.descriptionCurrentSituation,
            generalObjective: idea.generalObjective,
            expectedChange: idea.expectedChange,
            createdAt: idea.createdAt,
            updatedAt: idea.updatedAt,
            deletedAt: idea.deletedAt,
        }
        ideaFind.Effects = idea.Effects;
        ideaFind.Causes = idea.Causes;
        ideaFind.Alternatives = idea.Alternatives;
        ideaFind.stage = idea.stage;
        ideaFind.alternatives = alternativeF;

        return ideaFind;

    }
    catch (error) {
        throw `Error al obtener Idea completa: ${error}`;
    }
}