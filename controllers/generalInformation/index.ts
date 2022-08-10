import { Request, Response } from "express";
import generalInformation from "../../models/BancoIdeas/generalInformation";
import models from "../../db/connection";
import moment from "moment";
import stage from "../../models/BancoIdeas/stage";
import possibleEffects from "../../models/BancoIdeas/possibleEffects";
import possibleCauses from "../../models/BancoIdeas/possibleCauses";
import possibleAlternatives from "../../models/BancoIdeas/possibleAlternatives";
import qualification from "../../models/BancoIdeas/qualification";
import ideaAlternative from "../../models/BancoIdeas/ideaAlternative";
import preliminaryName from "../../models/BancoIdeas/preliminaryName";
import responsibleEntity from "../../models/BancoIdeas/responsibleEntity";
import populationDelimitation from "../../models/BancoIdeas/populationDelimitation";
import geographicArea from "../../models/BancoIdeas/geographicArea";
import projectDescription from "../../models/BancoIdeas/projectDescription";
import referencePopulation from "../../models/BancoIdeas/referencePopulation";
import denomination from "../../models/BancoIdeas/denomination";
import coordinates from "../../models/BancoIdeas/coordinates";
import executionTime from "../../models/BancoIdeas/executionTime";

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
        const effects = body.possibleEffects;
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

        const causes = body.possibleCauses;
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

        const alternatives = body.possibleAlternatives;
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
                    required: false,

                    model: possibleEffects
                },
                {
                    required: false,

                    model: possibleCauses
                },
                {
                    required: false,

                    model: possibleAlternatives
                },
                {
                    required: false,

                    model: stage
                },
                {
                    required: false,

                    model: qualification
                },
                {
                    required: false,
                    model: ideaAlternative,
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
                            include: [
                                {
                                    required: false,
                                    model: coordinates
                                },

                            ]
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
                }
            ]
        });

        res.status(201).json({
            msg: "Datos Obtenidos",
            generalInformations,
            count: generalInformation.length
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
};
