'use strict'

import { Request, Response } from "express";
import preliminaryName from "../../models/BancoIdeas/preliminaryName";
import responsableEntity from "../../models/BancoIdeas/responsibleEntity";
import populationDelimitation from "../../models/BancoIdeas/populationDelimitation";
import projectDescription from "../../models/BancoIdeas/projectDescription";
import executionTime from "../../models/BancoIdeas/executionTime";
import geographicArea from "../../models/BancoIdeas/geographicArea";
import sequelize from "sequelize-oracle";
import models from "../../db/connection";

export async function FcreatePreleminaryName(prName: any, transaction: any) {
    try {
        await preliminaryName.create(prName, { transaction })
        return { message: `Nombre preliminar ingresado correctamente` };
    } catch (error) {
        //devuelve errores al cliente
        throw `Error al ingresar nombre preliminar de proyecto: ${error}`;
    }
}

export async function FcresponsableEntity(resEntity: any, transaction: any) {
    try {
        await responsableEntity.create(resEntity, { transaction })
        return { message: `Entidad responsable ingresada correctamente` };
    } catch (error) {
        //devuelve errores al cliente
        throw `Error al ingresar entidad responsable: ${error}`;
    }
}

export async function FcreatePopulationDemilitation(popDemiliation: any, transaction: any) {
    try {
        await populationDelimitation.create(popDemiliation, { transaction })
        return { message: `Delimitación preliminar ingresada correctamente` };
    } catch (error) {
        //devuelve errores al cliente
        throw `Error al ingresar delimitación preliminar: ${error}`;
    }
}

export async function FcreateProjectDescription(proDescription: any, transaction: any) {
    try {
        let proDesctiptionNew = await projectDescription.create(proDescription, { transaction })
        for (const exTime of proDescription.executionTimes) {
            exTime.projectDescriptionId = proDesctiptionNew.codigo
            await executionTime.create(exTime, { transaction })
        }
        await FcreateGeographicArea(proDescription.geographicArea, transaction)
        return { message: `Descripción preliminar de la idea proyecto ingresada correctamente` };
    } catch (error) {
        //devuelve errores al cliente
        throw `Error al ingresar descripción preliminar de la idea proyecto preliminar: ${error}`;
    }
}

export async function FcreateGeographicArea(geograpicArea: any, transaction: any) {
    try {
        await geographicArea.create(geograpicArea, { transaction })       
        return { message: `Area geografica del proyecto ingresada correctamente` };
    } catch (error) {
        //devuelve errores al cliente
        throw `Error al ingresar area geografica del proyecto: ${error}`;
    }
}