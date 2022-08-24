'use strict'

import preliminaryName from "../../models/BancoIdeas/preliminaryName";
import responsableEntity from "../../models/BancoIdeas/responsibleEntity";
import populationDelimitation from "../../models/BancoIdeas/populationDelimitation";
import projectDescription from "../../models/BancoIdeas/projectDescription";
import executionTime from "../../models/BancoIdeas/executionTime";
import geographicArea from "../../models/BancoIdeas/geographicArea";
import ideaAlternative from "../../models/BancoIdeas/ideaAlternative";
import coordinates from "../../models/BancoIdeas/coordinates";
import referencePopulation from "../../models/BancoIdeas/referencePopulation";
import denomination from "../../models/BancoIdeas/denomination";
import preInvestment from "../../models/BancoIdeas/preInvestment";
import qualification from "../../models/BancoIdeas/qualification";
import generalInformation from "../../models/BancoIdeas/generalInformation";

export async function FgetPreinversion(idAlternativa: any) {
    try {
        const proDes = await projectDescription.findOne({ where: { AlterId: idAlternativa } })
        const popDel = await populationDelimitation.findOne({ where: { AlterId: idAlternativa } })
        let costo = proDes.estimatedCost
        let rangoInversion = 0
        let resRangoInversion = ''
        //RANGO DE INVERSIÓN
        if (costo < 900000) {
            rangoInversion = 6
            resRangoInversion = '<=900,000'
        } else if (costo > 900001 && costo <= 10000000) {
            rangoInversion = 8
            resRangoInversion = '>900,001<=10,000,000'
        } else if (costo > 10000001 && costo <= 50000000) {
            rangoInversion = 10
            resRangoInversion = '>10,000,001<=50,000,000'
        } else if (costo >= 50000001) {
            rangoInversion = 16
            resRangoInversion = '>=50,000,001'
        }
        //ESTIMACIÓN BENEFICIARIOS 
        let benefits = popDel.estimateBeneficiaries
        let estBenefits = 0
        let resEstBenefits = ''
        if (benefits <= 1000) {
            estBenefits = 4.5
            resEstBenefits = '1 <= 1,000'
        } else if (benefits > 1001 && benefits <= 10000) {
            estBenefits = 6
            resEstBenefits = '>1,001 <= 10,000'
        } else if (benefits > 10001 && benefits <= 20000) {
            estBenefits = 7.5
            resEstBenefits = '>10,001 <= 20,000'
        } else if (benefits > 20001) {
            estBenefits = 12
            resEstBenefits = '>20,001'
        }
        //COMPLEJIDAD
        let complejidad = proDes.complexity
        let complejidadTotal = 0
        if (complejidad == 'Alta') {
            complejidadTotal = 12
        } else if (complejidad == 'Media') {
            complejidadTotal = 11
        } else if (complejidad == 'Baja') {
            complejidadTotal = 7
        }


        let totalSuma = (rangoInversion + estBenefits + complejidadTotal)
        let total = (((rangoInversion + estBenefits + complejidadTotal) * 100) / 40)
        let etapa = ''
        if (total <= 19) {
            etapa = 'Perfil'
        } else if (total >= 20 && total <= 35) {
            etapa = 'Prefactibilidad'
        } else if (total >= 36 && total <= 100) {
            etapa = 'Factibilidad'
        }

        //RESULTADO
        let preInversion = {
            rango: {
                valor: rangoInversion,
                resultado: resRangoInversion
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
        ideaAlt.state = 'CREADA';
        let ideaAlternativeCreated = await ideaAlternative.create(ideaAlt, { transaction })
        let codigoAlternativa = ideaAlternativeCreated.codigo
        await FcreatePreleminaryName(ideaAlt.preName, codigoAlternativa, transaction)
        await FcresponsableEntity(ideaAlt.resEntity, codigoAlternativa, transaction)
        await FcreatePopulationDemilitation(ideaAlt.popDelimit, codigoAlternativa, transaction)
        await FcreateGeographicArea(ideaAlt.geoArea, codigoAlternativa, transaction)
        await FcreateProjectDescription(ideaAlt.projDesc, codigoAlternativa, transaction)

        return { message: `Idea alternativa creada correctamente` };
    } catch (error) {
        //devuelve errores al cliente
        throw `Error al ingresar Idea alternativa: ${error}`;
    }
}

export async function FaddPertinenceQuality(pertinence: any, transaction: any) {
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

        let pertinenceResult = await qualification.create(pertinence, { transaction });

        let alternative = await ideaAlternative.findOne({
            where: {
                codigo: pertinence.AlterId
            }
        });

        alternative.state = 'CALIFICADA';
        alternative.save();

        let generalIdea = await generalInformation.findOne({
            where: {
                codigo: alternative.sectionBIId
            }
        })

        let state = generalIdea.result;

        if (state == 'PENDIENTE') {
            generalIdea.result = result;
            generalIdea.save();
        } else if (state == 'NO PERTINENTE') {
            if (result != 'NO PERTINENTE') {
                generalIdea.result = result;
                generalIdea.save();
            }
        }

        return { message: `Idea alternativa creada correctamente` };
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
        preInversion.AlterId = idAlternativa
        let preInvestmentHistoryCreated = await preInvestment.create(preInversionCreate)
        return { preInvestmentHistoryCreated, message: `Pre inversion historico creado correctamente` };
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
        //devuelve errores al cliente
        throw `Error al ingresar nombre preliminar de proyecto: ${error}`;
    }
}

export async function FcresponsableEntity(resEntity: any, idAlternativa: number, transaction: any) {
    try {
        resEntity.AlterId = idAlternativa
        let responsableEntityCreated = await responsableEntity.create(resEntity, { transaction })
        return { responsableEntityCreated, message: `Entidad responsable ingresada correctamente` };
    } catch (error) {
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
            let refModel = { name: referenceName }
            let referenceCreate = await referencePopulation.create(refModel);
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
            let denCreate = await referencePopulation.create(denModel);
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
        throw `Error al ingresar delimitación preliminar: ${error}`;
    }
}

export async function FcreateProjectDescription(proDescription: any, idAlternativa: number, transaction: any) {
    try {
        proDescription.AlterId = idAlternativa
        if (proDescription.annual || proDescription.annual == true) { proDescription.annual = 1 }
        else if (!proDescription.annual || proDescription.annual == false) { proDescription.annual = 0 }
        let proDesctiptionCreated = await projectDescription.create(proDescription, { transaction })
        proDescription.execTime.projDescId = proDesctiptionCreated.codigo
        await executionTime.create(proDescription.execTime, { transaction })

        return { proDesctiptionCreated, message: `Descripción preliminar de la idea proyecto ingresada correctamente` };
    } catch (error) {
        //devuelve errores al cliente
        throw `Error al ingresar descripción preliminar de la idea proyecto preliminar: ${error}`;
    }
}

export async function FcreateGeographicArea(geograpicArea: any, idAlternativa: number, transaction: any) {
    try {
        geograpicArea.AlterId = idAlternativa
        let geographicAreaCreated = await geographicArea.create(geograpicArea, { transaction })
        for (let coordinate of geograpicArea.coordinates) {
            coordinate.geoAreaId = geographicAreaCreated.codigo
            await coordinates.create(coordinate, { transaction })
        }
        return { geographicAreaCreated, message: `Area geografica del proyecto ingresada correctamente` };
    } catch (error) {
        //devuelve errores al cliente
        throw `Error al ingresar area geografica del proyecto: ${error}`;
    }
}