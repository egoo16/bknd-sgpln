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

export async function FgetPreinversion(idAlternativa: any) {
    try {
        const proDes = await projectDescription.findOne({ where: { AlternativeId: idAlternativa } })
        const popDel = await populationDelimitation.findOne({ where: { AlternativeId: idAlternativa } })
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
        return { preInversion };
    } catch (error) {
        //devuelve errores al cliente
        throw `Error al ingresar Idea alternativa: ${error}`;
    }
}
export async function FcreateIdeaAlternativeComplete(ideaAlt: any, transaction: any) {
    try {
        let ideaAlternativeCreated = await ideaAlternative.create(ideaAlt, { transaction })
        let codigoAlternativa = ideaAlternativeCreated.codigo
        await FcreatePreleminaryName(ideaAlt.preName, codigoAlternativa, transaction)
        await FcresponsableEntity(ideaAlt.resEntity, codigoAlternativa, transaction)
        await FcreatePopulationDemilitation(ideaAlt.populationDelimitation, codigoAlternativa, transaction)
        await FcreateGeographicArea(ideaAlt.geographicArea, codigoAlternativa, transaction)
        await FcreateProjectDescription(ideaAlt.projectDescription, codigoAlternativa, transaction)

        return { message: `Idea alternativa creada correctamente` };
    } catch (error) {
        //devuelve errores al cliente
        throw `Error al ingresar Idea alternativa: ${error}`;
    }
}
export async function FcreatePreleminaryName(prName: any, idAlternativa: number, transaction: any) {
    try {
        prName.AlternativeId = idAlternativa
        let preliminaryNameCreated = await preliminaryName.create(prName, { transaction })
        return { preliminaryNameCreated, message: `Nombre preliminar ingresado correctamente` };
    } catch (error) {
        //devuelve errores al cliente
        throw `Error al ingresar nombre preliminar de proyecto: ${error}`;
    }
}

export async function FcresponsableEntity(resEntity: any, idAlternativa: number, transaction: any) {
    try {
        resEntity.AlternativeId = idAlternativa
        let responsableEntityCreated = await responsableEntity.create(resEntity, { transaction })
        return { responsableEntityCreated, message: `Entidad responsable ingresada correctamente` };
    } catch (error) {
        //devuelve errores al cliente
        throw `Error al ingresar entidad responsable: ${error}`;
    }
}

export async function FcreatePopulationDemilitation(popDemiliation: any, idAlternativa: number, transaction: any) {
    try {
        popDemiliation.AlternativeId = idAlternativa;
        let refModel = await referencePopulation.findAll();
        popDemiliation.referencePopulationId = refModel[0].codigo;


        let DenModel = await denomination.findAll();
        popDemiliation.denominationId = DenModel[0].codigo;


        let populationDelimitationCreated = await populationDelimitation.create(popDemiliation, { transaction })
        return { populationDelimitationCreated, message: `Delimitación preliminar ingresada correctamente` };
    } catch (error) {
        //devuelve errores al cliente
        throw `Error al ingresar delimitación preliminar: ${error}`;
    }
}

export async function FcreateProjectDescription(proDescription: any, idAlternativa: number, transaction: any) {
    try {
        proDescription.AlternativeId = idAlternativa
        let proDesctiptionCreated = await projectDescription.create(proDescription, { transaction })
        proDescription.executionTime.projectDescriptionId = proDesctiptionCreated.codigo
        await executionTime.create(proDescription.executionTime, { transaction })

        return { proDesctiptionCreated, message: `Descripción preliminar de la idea proyecto ingresada correctamente` };
    } catch (error) {
        //devuelve errores al cliente
        throw `Error al ingresar descripción preliminar de la idea proyecto preliminar: ${error}`;
    }
}

export async function FcreateGeographicArea(geograpicArea: any, idAlternativa: number, transaction: any) {
    try {
        geograpicArea.AlternativeId = idAlternativa
        let geographicAreaCreated = await geographicArea.create(geograpicArea, { transaction })
        for (let coordinate of geograpicArea.coordinates) {
            coordinate.geographicAreaId = geographicAreaCreated.codigo
            await coordinates.create(coordinate, { transaction })
        }
        return { geographicAreaCreated, message: `Area geografica del proyecto ingresada correctamente` };
    } catch (error) {
        //devuelve errores al cliente
        throw `Error al ingresar area geografica del proyecto: ${error}`;
    }
}