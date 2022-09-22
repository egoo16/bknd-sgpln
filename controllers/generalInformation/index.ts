import { Request, Response } from "express";
import models from "../../db/connection";
import moment from "moment";
const Sequelize = require('sequelize-oracle');
import generalInformation from "../../models/BancoIdeas/generalInformation";
import stage from "../../models/BancoIdeas/stage";
import possibleEffects from "../../models/BancoIdeas/possibleEffects";
import possibleCauses from "../../models/BancoIdeas/possibleCauses";
import possibleAlternatives from "../../models/BancoIdeas/possibleAlternatives";
import { FaddPertinenceQuality, FcreateIdeaAlternativeComplete, FgetPreinversion, getAlternatives } from '../alternativeIdea/feature';

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
        informationModel.state = 'CREADA';
        informationModel.result = 'PENDIENTE';


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

        let where: any = {}

        if (req.query) {

            if (req.query.state && req.query.state != 'TODAS') { where.state = req.query.state }
            if (req.query.institucionId) { where.idEntity = req.query.institucionId }
            if (req.query.number) {
                where.registerCode = {
                    [models.Sequelize.Op.substring]: [req.query.number],
                }
            }
            if (req.query.fechaDesde && req.query.fechaHasta) {
                where.createdAt = {
                    [models.Op.between]: [req.query.fechaDesde, req.query.fechaHasta],
                }
            }
        }

        let generalInformations = await generalInformation.findAll({
            where,
            order: [
                ['correlation', 'ASC']
            ],
            include: [
                {
                    required: false,

                    model: possibleEffects,
                    // as: 'possibleEffects'
                },
                {
                    required: false,

                    model: possibleCauses,
                    // as: 'possibleCauses'

                },
                {
                    required: false,

                    model: possibleAlternatives,
                    // as: 'possibleAlternatives'

                },
                {
                    required: false,

                    model: stage
                },
            ]
        });

        let ideas: any[] = []

        if (generalInformations || generalInformations.length > 0) {
            let resGIdea = await Promise.all(
                generalInformations.map(async (idea: any) => {

                    let alternativeF =  await getAlternatives(idea.codigo);
                    let ideaFind : any = {
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


                    ideas.push(ideaFind)


                })
            )
        }


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