'use strict'

import preliminaryName from "../../models/BancoIdeas/preliminaryName";
import responsableEntity from "../../models/BancoIdeas/responsibleEntity";
import populationDelimitation from "../../models/BancoIdeas/populationDelimitation";
import projectDescription from "../../models/BancoIdeas/projectDescription";
import executionTime from "../../models/BancoIdeas/executionTime";
import geographicArea from "../../models/BancoIdeas/geographicArea";
import ideaAlternative from "../../models/BancoIdeas/ideaAlternative";
import coordinates from "../../models/BancoIdeas/coordinates";

export async function FcreateIdeaAlternativeComplete(ideaAlt: any, transaction: any) {
    try {
        let ideaAlternativeCreated = await ideaAlternative.create(ideaAlt, { transaction })
        let codigoAlternativa = ideaAlternativeCreated.codigo
        await FcreatePreleminaryName(ideaAlt.preliminaryName, codigoAlternativa, transaction)
        await FcresponsableEntity(ideaAlt.responsibleEntity, codigoAlternativa, transaction)
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
        prName.ideaAlternativeId = idAlternativa
        let preliminaryNameCreated = await preliminaryName.create(prName, { transaction })
        return { preliminaryNameCreated, message: `Nombre preliminar ingresado correctamente` };
    } catch (error) {
        //devuelve errores al cliente
        throw `Error al ingresar nombre preliminar de proyecto: ${error}`;
    }
}

export async function FcresponsableEntity(resEntity: any, idAlternativa: number, transaction: any) {
    try {
        resEntity.ideaAlternativeId = idAlternativa
        let responsableEntityCreated = await responsableEntity.create(resEntity, { transaction })
        return { responsableEntityCreated, message: `Entidad responsable ingresada correctamente` };
    } catch (error) {
        //devuelve errores al cliente
        throw `Error al ingresar entidad responsable: ${error}`;
    }
}

export async function FcreatePopulationDemilitation(popDemiliation: any, idAlternativa: number, transaction: any) {
    try {
        popDemiliation.ideaAlternativeId = idAlternativa
        let populationDelimitationCreated = await populationDelimitation.create(popDemiliation, { transaction })
        return { populationDelimitationCreated, message: `Delimitación preliminar ingresada correctamente` };
    } catch (error) {
        //devuelve errores al cliente
        throw `Error al ingresar delimitación preliminar: ${error}`;
    }
}

export async function FcreateProjectDescription(proDescription: any, idAlternativa: number, transaction: any) {
    try {
        proDescription.ideaAlternativeId = idAlternativa
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
        geograpicArea.ideaAlternativeId = idAlternativa
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