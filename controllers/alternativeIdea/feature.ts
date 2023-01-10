'use strict'
import models from "../../db/connection";
import { projectDescription, populationDelimitation, ideaAlternative, qualification, generalInformation, preInvestment, preliminaryName, referencePopulation, denomination, executionTime, geographicArea, responsibleEntity, possibleAlternatives, possibleCauses, possibleEffects, stage } from "../../models/BancoIdeas";
import dataGeo from "../../models/BancoIdeas/datageo.model";



export async function FgetPreinversion(idAlternativa: any) {
    try {
        const proDes = await projectDescription.findOne({ where: { AlterId: idAlternativa } })
        const popDel = await populationDelimitation.findOne({ where: { AlterId: idAlternativa } })
        let costo = proDes.investmentCost
        let rangoInversion = 0
        let resRangoInversion = ''
        //RANGO DE INVERSIÓN
        if (costo <= 300000) {
            rangoInversion = 2
            resRangoInversion = '<=300,000'
        } else if (costo >= 300001 && costo <= 500000) {
            rangoInversion = 5
            resRangoInversion = '>300,001<=500,000'
        } else if (costo >= 500001 && costo <= 699999) {
            rangoInversion = 7
            resRangoInversion = '>500,001<=699,999'
        } else if (costo >= 700000 && costo <= 900000) {
            rangoInversion = 10
            resRangoInversion = '>700,000<=900,000'
        } else if (costo >= 900001 && costo <= 10000000) {
            rangoInversion = 12
            resRangoInversion = '>900,001<=10,000,000'
        } else if (costo >= 10000001 && costo <= 19000000) {
            rangoInversion = 15
            resRangoInversion = '>10,000,001<=19,000,000'
        } else if (costo >= 19000001 && costo <= 30000000) {
            rangoInversion = 18
            resRangoInversion = '>19,000,001<=30,000,000'
        } else if (costo >= 30000001 && costo <= 40000000) {
            rangoInversion = 22
            resRangoInversion = '>30,000,001<=40,000,000'
        } else if (costo >= 40000001 && costo <= 50000000) {
            rangoInversion = 25
            resRangoInversion = '>40,000,001<=50,000,000'
        } else if (costo >= 50000001) {
            rangoInversion = 40
            resRangoInversion = '>=50,000,001'
        }
        //ESTIMACIÓN BENEFICIARIOS 
        let benefits = popDel.estimateBeneficiaries
        let estBenefits = 0
        let resEstBenefits = ''
        if (benefits <= 1000) {
            estBenefits = 6
            resEstBenefits = '1 <= 1,000'
        } else if (benefits >= 1001 && benefits <= 10000) {
            estBenefits = 12
            resEstBenefits = '>1,001 <= 10,000'
        } else if (benefits >= 10001 && benefits <= 20000) {
            estBenefits = 18
            resEstBenefits = '>10,001 <= 20,000'
        } else if (benefits >= 20001 && benefits <= 50000) {
            estBenefits = 24
            resEstBenefits = '>20,001 <= 50,000'
        } else if (benefits >= 50001) {
            estBenefits = 30
            resEstBenefits = '>50,001'
        }
        //COMPLEJIDAD
        let complejidad = proDes.complexity
        let complejidadTotal = 0
        if (complejidad == 'Alta') {
            complejidadTotal = 30
        } else if (complejidad == 'Media') {
            complejidadTotal = 20
        } else if (complejidad == 'Baja') {
            complejidadTotal = 10
        }

        let totalSuma = (rangoInversion + estBenefits + complejidadTotal)
        let etapa = ''
        if (totalSuma <= 40) {
            etapa = 'Perfil'
        } else if (totalSuma >= 41 && totalSuma <= 69) {
            etapa = 'Prefactibilidad'
        } else if (totalSuma >= 70 && totalSuma <= 100) {
            etapa = 'Factibilidad'
        }

        //RESULTADO
        let preInversion = {
            rango: {
                valor: rangoInversion,
                resultado: resRangoInversion,
            },
            estimacion: {
                valor: estBenefits,
                resultado: resEstBenefits
            },
            complejidad: {
                valor: complejidadTotal,
                resultado: complejidad
            },
            etapa: {
                valor: totalSuma,
                resultado: etapa
            }
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

export async function FcreatePreleminaryName(prName: any, idAlternativa: number, transaction: any) {
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

export async function FcresponsableEntity(resEntity: any, idAlternativa: number, transaction: any) {
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

export async function FcreatePopulationDemilitation(popDemiliation: any, idAlternativa: number, transaction: any) {
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


        if (!reference) {
            let ref = { name: referenceName };
            let referenceCreate = await referencePopulation.create(ref, { transaction });
            popDemiliation.refPopId = referenceCreate.codigo;
        } else {
            popDemiliation.refPopId = reference.codigo;
        }

        let denominationName = popDemiliation.denId;
        let denmtion = await denomination.findOne({
            where: {
                name: denominationName
            }
        });

        if (!denmtion) {
            let denModel = { name: denominationName }
            let denCreate = await denomination.create(denModel, { transaction });
            popDemiliation.denId = denCreate.codigo;
        } else {
            popDemiliation.denId = denmtion.codigo;
        }


        if (popDemiliation.estimateBeneficiaries && popDemiliation.totalPopulation) {
            let estimateBeneficiaries = parseInt(popDemiliation.estimateBeneficiaries, 10);
            let totalPopulation = parseInt(popDemiliation.totalPopulation, 10);
            let multCov = (estimateBeneficiaries / totalPopulation);
            let resCov = (multCov * 100);
            popDemiliation.coverage = resCov;
        }

        let populationDelimitationCreated = await populationDelimitation.create(popDemiliation, { transaction })
        return { populationDelimitationCreated, message: `Delimitación preliminar ingresada correctamente` };
    } catch (error) {
        //devuelve errores al cliente
        transaction.rollback()
        throw `Error al ingresar delimitación preliminar: ${error}`;
    }
}

export async function FcreateProjectDescription(proDescription: any, idAlternativa: number, transaction: any) {
    console.log("🚀 ~ file: feature.ts:350 ~ FcreateProjectDescription ~ proDescription", proDescription)
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

export async function FcreateGeographicArea(geograpicArea: any, idAlternativa: number, transaction: any) {
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
                leaderName: data.resEntity.leaderName,
                email: data.resEntity.email,
                phone: data.resEntity.phone,
                createdAt: data.resEntity.createdAt,
                updatedAt: data.resEntity.updatedAt,
                deletedAt: data.resEntity.deletedAt,

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
                alternativeCreatedAsync = {...alternativeCreated}
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
                };            }
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