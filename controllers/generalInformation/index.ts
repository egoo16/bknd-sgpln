import { Request, Response } from "express";
import generalInformation from "../../models/BancoIdeas/generalInformation";
import sequelize from "sequelize-oracle";
import models from "../../db/connection";
import moment from "moment";
import stage from "../../models/BancoIdeas/stage";
import possibleEffects from "../../models/BancoIdeas/possibleEffects";
import possibleCauses from "../../models/BancoIdeas/possibleCauses";
import possibleAlternatives from "../../models/BancoIdeas/possibleAlternatives";

export const postGeneralInformation = async (req: Request, res: Response) => {
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
        const effects = body.effects;
        if (effects?.length > 0) {
            let resEffects = await Promise.all(effects.map(async (effect: any) => {
                effect.generalInformationId = informationIsert.codigo;
                let res = await possibleEffects.create(effect, {
                    transaction,
                });
                return res;
            }));
        }
        //#endregion Finalizó la insercion de efectos

        //#region Insertando Causas

        const causes = body.causes;
        if (causes?.length > 0) {

            let resCauses = await Promise.all(causes.map(async (cause: any) => {
                cause.generalInformationId = informationIsert.codigo;
                let res = await possibleCauses.create(cause, {
                    transaction,
                });
                return res;
            }));
        }
        //#endregion Finalizó la insercion de Causas

        //#region Insertando Alternativas

        const alternatives = body.alternatives;
        if (alternatives?.length > 0) {
            let resAlternatives = await Promise.all(alternatives.map(async (alternative: any) => {
                alternative.generalInformationId = informationIsert.codigo;
                let res = await possibleAlternatives.create(alternative, {
                    transaction,
                });
                return res;
            }));
        }
        //#endregion Finalizó la insercion de Alternativas


        await transaction.commit();

        res.status(201).json({
            msg: "ideaIsertada Correctamente",
            informationIsert,
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

export const getGeneralInformation = async (req: Request, res: Response) => {
    try {

        const generalInformations = await generalInformation.findAll({
            include: [
                {
                    model: possibleEffects
                },
                {
                    model: possibleCauses
                },
                {
                    model: possibleAlternatives
                }
            ]
        });

        res.status(201).json({
            msg: "Datos Obtenidos",
            generalInformations,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
};
