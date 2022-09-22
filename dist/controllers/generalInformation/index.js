"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnIdea = exports.sendIdea = exports.getGeneralInformation = exports.postGeneralInformation = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const moment_1 = __importDefault(require("moment"));
const Sequelize = require('sequelize-oracle');
const generalInformation_1 = __importDefault(require("../../models/BancoIdeas/generalInformation"));
const stage_1 = __importDefault(require("../../models/BancoIdeas/stage"));
const possibleEffects_1 = __importDefault(require("../../models/BancoIdeas/possibleEffects"));
const possibleCauses_1 = __importDefault(require("../../models/BancoIdeas/possibleCauses"));
const possibleAlternatives_1 = __importDefault(require("../../models/BancoIdeas/possibleAlternatives"));
const feature_1 = require("../alternativeIdea/feature");
const postGeneralInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield connection_1.default.transaction();
    try {
        const { body } = req;
        const informationModel = body;
        //#region Stage Idea
        let stageModel = yield stage_1.default.findOne({
            where: {
                name: 'Idea'
            }
        });
        if (stageModel === null || stageModel === void 0 ? void 0 : stageModel.codigo) {
            informationModel.idStage = stageModel.codigo;
        }
        else {
            let stageCreate = { name: 'Idea' };
            let stageCreated = yield stage_1.default.create(stageCreate);
            informationModel.idStage = stageCreated.codigo;
        }
        //#endregion
        informationModel.state = 'CREADA';
        informationModel.result = 'PENDIENTE';
        //#region Correlative
        const correlative = yield generalInformation_1.default.max("correlation");
        if (correlative) {
            const calculate = parseInt(correlative, 10) + 1;
            if (calculate >= 99998) {
                throw new Error(`Correlation is out of range, contact your System administrator`);
            }
            const strCalculate = '' + calculate;
            const pad = "00000";
            let crlative = pad.substring(0, pad.length - strCalculate.length) + strCalculate;
            crlative = crlative + ' - BIP - ' + (0, moment_1.default)().format('YYYY');
            informationModel.correlation = calculate;
            informationModel.registerCode = crlative;
        }
        else {
            const str = "" + 1;
            const pad = "00000";
            let crlative = pad.substring(0, pad.length - str.length) + str;
            crlative = crlative + ' - BIP - ' + (0, moment_1.default)().format('YYYY');
            informationModel.correlation = 1;
            informationModel.registerCode = crlative;
        }
        //#endregion END Correlative
        const informationIsert = yield generalInformation_1.default.create(informationModel, {
            transaction,
        });
        //#region Insertando Efectos
        const effects = body.Effects;
        if ((effects === null || effects === void 0 ? void 0 : effects.length) > 0) {
            let resEffects = yield Promise.all(effects.map((effect) => __awaiter(void 0, void 0, void 0, function* () {
                effect.InformationId = informationIsert.codigo;
                let res = yield possibleEffects_1.default.create(effect, {
                    transaction,
                });
                return res;
            })));
        }
        //#endregion Finalizó la insercion de efectos
        //#region Insertando Causas
        const causes = body.Causes;
        if ((causes === null || causes === void 0 ? void 0 : causes.length) > 0) {
            let resCauses = yield Promise.all(causes.map((cause) => __awaiter(void 0, void 0, void 0, function* () {
                cause.InformationId = informationIsert.codigo;
                let res = yield possibleCauses_1.default.create(cause, {
                    transaction,
                });
                return res;
            })));
        }
        //#endregion Finalizó la insercion de Causas
        //#region Insertando Alternativas
        const alternatives = body.Alternatives;
        if ((alternatives === null || alternatives === void 0 ? void 0 : alternatives.length) > 0) {
            let resAlternatives = yield Promise.all(alternatives.map((alternative) => __awaiter(void 0, void 0, void 0, function* () {
                alternative.InformationId = informationIsert.codigo;
                let res = yield possibleAlternatives_1.default.create(alternative, {
                    transaction,
                });
                return res;
            })));
        }
        //#endregion Finalizó la insercion de Alternativas
        //#region Insert Alternativa completa Body
        let alternativesBody = body.alternatives;
        if ((alternativesBody === null || alternativesBody === void 0 ? void 0 : alternativesBody.length) > 0) {
            let resBodyAlternatives = yield Promise.all(alternativesBody.map((alternative) => __awaiter(void 0, void 0, void 0, function* () {
                alternative.sectionBIId = informationIsert.codigo;
                let res = yield (0, feature_1.FcreateIdeaAlternativeComplete)(alternative, transaction);
            })));
        }
        //#endregion
        yield transaction.commit();
        res.status(201).json({
            msg: "ideaIsertada Correctamente",
            informationIsert,
            correlative,
        });
    }
    catch (error) {
        transaction.rollback();
        res.status(500).json({
            msg: "No se pudo Insertar la Información General",
            error,
        });
    }
});
exports.postGeneralInformation = postGeneralInformation;
const getGeneralInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let where = {};
        if (req.query) {
            if (req.query.state && req.query.state != 'TODAS') {
                where.state = req.query.state;
            }
            if (req.query.institucionId) {
                where.idEntity = req.query.institucionId;
            }
            if (req.query.number) {
                where.registerCode = req.query.number;
            }
            if (req.query.fechaDesde && req.query.fechaHasta) {
                where.createdAt = {
                    [connection_1.default.Op.between]: [req.query.fechaDesde, req.query.fechaHasta],
                };
            }
        }
        let generalInformations = yield generalInformation_1.default.findAll({
            where,
            order: [
                ['correlation', 'ASC']
            ],
            include: [
                {
                    required: false,
                    model: possibleEffects_1.default,
                    // as: 'possibleEffects'
                },
                {
                    required: false,
                    model: possibleCauses_1.default,
                    // as: 'possibleCauses'
                },
                {
                    required: false,
                    model: possibleAlternatives_1.default,
                    // as: 'possibleAlternatives'
                },
                {
                    required: false,
                    model: stage_1.default
                },
            ]
        });
        let ideas = [];
        if (generalInformations || generalInformations.length > 0) {
            let resGIdea = yield Promise.all(generalInformations.map((idea) => __awaiter(void 0, void 0, void 0, function* () {
                let alternativeF = yield (0, feature_1.getAlternatives)(idea.codigo);
                let ideaFind = {
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
                };
                ideaFind.Effects = idea.Effects;
                ideaFind.Causes = idea.Causes;
                ideaFind.Alternatives = idea.Alternatives;
                ideaFind.stage = idea.stage;
                ideaFind.alternatives = alternativeF;
                ideas.push(ideaFind);
            })));
        }
        res.status(201).json({
            msg: "Datos Obtenidos",
            generalInformations: ideas,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
});
exports.getGeneralInformation = getGeneralInformation;
/**
 * Funcion para  listar las configuraciones globales
 * @param {*} req
 */
function sendIdea(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let idIdea = req.params.id;
            let generalIdea = yield generalInformation_1.default.findOne({
                where: {
                    codigo: idIdea
                }
            });
            generalIdea.state = 'ENVIADA';
            generalIdea.save();
            return res.status(200).send(generalIdea);
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.sendIdea = sendIdea;
/**
 * Funcion para  listar las configuraciones globales
 * @param {*} req
 */
function returnIdea(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let idIdea = req.params.id;
            let generalIdea = yield generalInformation_1.default.findOne({
                where: {
                    codigo: idIdea
                }
            });
            generalIdea.state = 'CALIFICADA';
            generalIdea.save();
            return res.status(200).send(generalIdea);
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.returnIdea = returnIdea;
//# sourceMappingURL=index.js.map