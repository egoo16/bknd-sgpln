import { Request, Response } from "express";
import models from "../../db/connection";
import moment from "moment";
const Sequelize = require('sequelize-oracle');
const { Op } = require("sequelize-oracle");

import { FaddPertinenceQuality, FcreateIdeaAlternativeComplete, FgetPreinversion, getAlternatives, getIdeaCompleta } from '../alternativeIdea/feature';
import { stage, generalInformation, possibleEffects, possibleCauses, possibleAlternatives } from "../../models/BancoIdeas";

export const postGeneralInformation = async (req: any, res: Response) => {
    let transaction = await models.transaction();
    try {
        const { body } = req;
        const informationModel = body;

        //#region Stage Idea
        let stageModel = await stage.findOne({
            where: {
                name: 'Idea'
            }
        });

        if (stageModel?.codigo) {
            informationModel.idStage = stageModel.codigo;
        } else {
            let stageCreate = { name: 'Idea' };
            let stageCreated = await stage.create(stageCreate);
            informationModel.idStage = stageCreated.codigo;
        }
        //#endregion
        informationModel.state = 'CREADA';
        informationModel.result = 'PENDIENTE';

        informationModel.author = req.user.id;

        //#region Correlative
        const correlative = await generalInformation.max("correlation");
        if (correlative) {
            const calculate = parseInt(correlative, 10) + 1;
            if (calculate >= 99998) { throw new Error(`Correlation is out of range, contact your System administrator`) }
            const strCalculate = '' + calculate;
            const pad = "00000"
            let crlative = pad.substring(0, pad.length - strCalculate.length) + strCalculate;
            crlative = crlative + ' - BIP - ' + moment().format('YYYY');
            informationModel.correlation = calculate;
            informationModel.registerCode = crlative;
        } else {
            const str = "" + 1;
            const pad = "00000";
            let crlative = pad.substring(0, pad.length - str.length) + str;
            crlative = crlative + ' - BIP - ' + moment().format('YYYY');

            informationModel.correlation = 1;
            informationModel.registerCode = crlative;

        }
        //#endregion END Correlative

        const informationIsert = await generalInformation.create(informationModel, {
            transaction,
        });


        //#region Insertando Efectos
        const effects = body.Effects;
        if (effects?.length > 0) {
            let resEffects = await Promise.all(effects.map(async (effect: any) => {
                effect.InformationId = informationIsert.codigo;
                let res = await possibleEffects.create(effect, {
                    transaction,
                });
                return res;
            }));
        }
        //#endregion Finalizó la insercion de efectos

        //#region Insertando Causas

        const causes = body.Causes;
        if (causes?.length > 0) {

            let resCauses = await Promise.all(causes.map(async (cause: any) => {
                cause.InformationId = informationIsert.codigo;
                let res = await possibleCauses.create(cause, {
                    transaction,
                });
                return res;
            }));
        }
        //#endregion Finalizó la insercion de Causas

        //#region Insertando Alternativas

        const alternatives = body.Alternatives;
        if (alternatives?.length > 0) {
            let resAlternatives = await Promise.all(alternatives.map(async (alternative: any) => {
                alternative.InformationId = informationIsert.codigo;
                let res = await possibleAlternatives.create(alternative, {
                    transaction,
                });
                return res;
            }));
        }
        //#endregion Finalizó la insercion de Alternativas

        //#region Insert Alternativa completa Body

        let alternativesBody = body.alternatives;
        if (alternativesBody?.length > 0) {
            let resBodyAlternatives = await Promise.all(alternativesBody.map(async (alternative: any) => {
                alternative.sectionBIId = informationIsert.codigo;
                let res = await FcreateIdeaAlternativeComplete(alternative, transaction)
            }))
        }

        //#endregion

        const information = await getIdeaCompleta(informationIsert.codigo);


        await transaction.commit();


        res.status(201).json({
            msg: "ideaIsertada Correctamente",
            information,
            correlative,
        });
    } catch (error) {
        transaction.rollback();
        res.status(500).json({
            msg: "No se pudo Insertar la Información General",
            error,
        });
    }
};

export const getGeneralInformation = async (req: any, res: Response) => {
    try {

        let where: any = {}
        let filtros = req.query

        if (filtros) {


            if (filtros.state && filtros.state != 'TODAS') { where.state = filtros.state }
            if (filtros.institucionId) { where.idEntity = filtros.institucionId }
            if (filtros.number) {
                where.registerCode = {
                    $like: `%${filtros.number}%`
                }
            }
            if (filtros.author == 'Mis Ideas') {
                where.author = req.user.id
            }
            if (filtros.fechaDesde && filtros.fechaHasta) {
                where.createdAt = {
                    [models.Op.between]: [filtros.fechaDesde, filtros.fechaHasta],
                }
            }
        }


        // TODO: Este es el ID de SEGEPLAN 
        if (req?.user?.id_inst != '16220') {
            where.idEntity = req.user.id_inst;
        }
        console.log(where)

        let generalInformations = await generalInformation.findAll({
            where,
            order: [
                ['correlation', 'ASC']
            ],
        });

        let ideas: any[] = []

        if (generalInformations || generalInformations.length > 0) {
            let resGIdea = await Promise.all(
                generalInformations.map(async (idea: any) => {
                    const ideaFind = await getIdeaCompleta(idea.codigo)
                    ideas.push(ideaFind)
                })
            )
        }

        await ideas.sort(function (a, b) {
            if (a.registerCode > b.registerCode) {
                return 1;
            }
            if (a.registerCode < b.registerCode) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });


        res.status(201).json({
            msg: "Datos Obtenidos",
            generalInformations: ideas,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
};



/**
 * Funcion para  listar las configuraciones globales
 * @param {*} req
 */
export async function sendIdea(req: Request, res: Response) {
    try {
        let idIdea = req.params.id;

        let generalIdea = await generalInformation.findOne({
            where: {
                codigo: idIdea
            }
        })

        generalIdea.state = 'ENVIADA';
        generalIdea.save();
        return res.status(200).send(generalIdea)

    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}

/**
 * Funcion para  listar las configuraciones globales
 * @param {*} req
 */
export async function returnIdea(req: Request, res: Response) {
    try {
        let idIdea = req.params.id;

        let generalIdea = await generalInformation.findOne({
            where: {
                codigo: idIdea
            }
        })

        generalIdea.state = 'CALIFICADA';
        generalIdea.save();

        return res.status(200).send(generalIdea)
    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}

export const listResults = async (req: any, res: Response) => {
    try {

        let idEntity = req?.user?.id_inst

        let resultado: any[] = [];
        let queryGeneral = `
            SELECT 
            "alter"."codigo",
            "preName"."preliminaryName",
            "resEntity"."executionUnit",
            (select "registerCode" from "Information" where "Information"."codigo" = "alter"."sectionBIId") as "registerCode",
            (select "baseLine" from "Information" where "Information"."codigo" = "alter"."sectionBIId") as "problematic",
            (select "idEntity" from "Information" where "Information"."codigo" = "alter"."sectionBIId") as "idEntity",
            (select "nameEntity" from "Information" where "Information"."codigo" = "alter"."sectionBIId") as "nameEntity",
            "projDesc"."estimatedCost",
            "execTime"."tentativeTermMonth",
            "execTime"."tentativeTermYear",
            "preInvestment"."etapaResultado"
            FROM "alter"
            INNER JOIN "preName" ON "alter"."codigo" = "preName"."AlterId" 
            INNER JOIN "projDesc" ON "alter"."codigo" = "projDesc"."AlterId" 
            INNER JOIN "resEntity" ON "alter"."codigo" = "resEntity"."AlterId" 
            INNER JOIN "execTime" ON "projDesc"."codigo" = "execTime"."projDescId"
            INNER JOIN "preInvestment" ON "alter"."codigo" = "preInvestment"."AlterId" 
            `;

        let querySpecific = `
            SELECT 
            "alter"."codigo",
            "preName"."preliminaryName",
            "resEntity"."executionUnit",
            (select "registerCode" from "Information" where "Information"."codigo" = "alter"."sectionBIId") as "registerCode",
            (select "baseLine" from "Information" where "Information"."codigo" = "alter"."sectionBIId") as "problematic",
            (select "idEntity" from "Information" where "Information"."codigo" = "alter"."sectionBIId") as "idEntity",
            (select "nameEntity" from "Information" where "Information"."codigo" = "alter"."sectionBIId") as "nameEntity",
            "projDesc"."estimatedCost",
            "execTime"."tentativeTermMonth",
            "execTime"."tentativeTermYear",
            "preInvestment"."etapaResultado"
            FROM "alter"
            INNER JOIN "preName" ON "alter"."codigo" = "preName"."AlterId" 
            INNER JOIN "projDesc" ON "alter"."codigo" = "projDesc"."AlterId" 
            INNER JOIN "resEntity" ON "alter"."codigo" = "resEntity"."AlterId" 
            INNER JOIN "execTime" ON "projDesc"."codigo" = "execTime"."projDescId"
            INNER JOIN "preInvestment" ON "alter"."codigo" = "preInvestment"."AlterId" 
            WHERE (select "idEntity" from "Information" where "Information"."codigo" = "alter"."sectionBIId") = '${idEntity}'
        `

        let queryToSend = ''


        let filtros = req.query
        console.log("🚀 ~ file: index.ts:314 ~ listResults ~ req.query:", req.query)

        // TODO: Este es el ID de SEGEPLAN 
        if (idEntity != '16220') {
            queryToSend = queryGeneral;

            if (filtros) {

                const wordWhere = ` WHERE `
                const wordAnd = ` AND `

                let whereIsUsed = false;

                if (filtros.stage && filtros.stage != 'TODAS') {
                    const queryStage = ` "preInvestment"."etapaResultado" like '%${filtros.stage}%'`;
                    if (whereIsUsed) {
                        queryToSend = queryToSend + wordAnd + queryStage;
                    } else {
                        queryToSend = queryToSend + wordWhere + queryStage;
                        whereIsUsed = true;
                    }
                }
                if (filtros.executionUnit && filtros.executionUnit != '') {
                    const queryExecutionUnit = ` "resEntity"."executionUnit" like '%${filtros.executionUnit}%'`;
                    if (whereIsUsed) {
                        queryToSend = queryToSend + wordAnd + queryExecutionUnit;
                    } else {
                        queryToSend = queryToSend + wordWhere + queryExecutionUnit;
                        whereIsUsed = true;
                    }
                }
                if (filtros.number) {
                    const queryNumber = ` (select "registerCode" from "Information" where "Information"."codigo" = "alter"."sectionBIId") like '%${filtros.number}%'`;
                    if (whereIsUsed) {
                        queryToSend = queryToSend + wordAnd + queryNumber;
                    } else {
                        queryToSend = queryToSend + wordWhere + queryNumber;
                        whereIsUsed = true;
                    }
                }
            }



        } else {
            queryToSend = querySpecific;

            if (filtros) {

                if (filtros.stage && filtros.stage != 'TODAS') {
                    const queryStage = ` and "preInvestment"."etapaResultado" like '%${filtros.stage}%'`
                    queryToSend = queryToSend + queryStage;
                }
                if (filtros.executionUnit && filtros.executionUnit != '') {
                    const queryExecutionUnit = ` and "resEntity"."executionUnit" like '%${filtros.executionUnit}%'`
                    queryToSend = queryToSend + queryExecutionUnit;
                }
                if (filtros.number) {
                    const queryNumber = ` and (select "registerCode" from "Information" where "Information"."codigo" = "alter"."sectionBIId") like '%${filtros.number}%'`
                    queryToSend = queryToSend + queryNumber;
                }
            }

        }

        await models.query(queryToSend).spread((result: any) => { resultado = result; }).catch((error: any) => {
            res.status(500).json({
                msg: "Error",
                error,
            });
        });


        res.status(200).json({
            msg: "Datos Obtenidos",
            data: resultado,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
};