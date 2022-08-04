'use strict'

import { Request, Response } from "express";

import sequelize from "sequelize-oracle";
import models from "../../db/connection";
import { FcreatePreleminaryName } from './feature';
/**
 * Funcion para  listar las configuraciones globales
 * @param {*} req
 */
export async function createPreleminaryName(req: Request, res: Response) {
    let transaction = await models.transaction()
    try {
        let prName = await FcreatePreleminaryName(req.body, transaction)
        transaction.commit()
        return res.status(200).send(prName)
    } catch (error: any) {
        transaction.rollback()
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }

}
