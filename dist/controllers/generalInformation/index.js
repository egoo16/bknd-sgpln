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
exports.getGeneralInformation = exports.postGeneralInformation = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const moment_1 = __importDefault(require("moment"));
const Sequelize = require('sequelize-oracle');
const generalInformation_1 = __importDefault(require("../../models/BancoIdeas/generalInformation"));
const stage_1 = __importDefault(require("../../models/BancoIdeas/stage"));
const possibleEffects_1 = __importDefault(require("../../models/BancoIdeas/possibleEffects"));
const possibleCauses_1 = __importDefault(require("../../models/BancoIdeas/possibleCauses"));
const possibleAlternatives_1 = __importDefault(require("../../models/BancoIdeas/possibleAlternatives"));
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
        const effects = body.possibleEffects;
        if ((effects === null || effects === void 0 ? void 0 : effects.length) > 0) {
            let resEffects = yield Promise.all(effects.map((effect) => __awaiter(void 0, void 0, void 0, function* () {
                effect.generalInformationId = informationIsert.codigo;
                let res = yield possibleEffects_1.default.create(effect, {
                    transaction,
                });
                return res;
            })));
        }
        //#endregion Finalizó la insercion de efectos
        //#region Insertando Causas
        const causes = body.possibleCauses;
        if ((causes === null || causes === void 0 ? void 0 : causes.length) > 0) {
            let resCauses = yield Promise.all(causes.map((cause) => __awaiter(void 0, void 0, void 0, function* () {
                cause.generalInformationId = informationIsert.codigo;
                let res = yield possibleCauses_1.default.create(cause, {
                    transaction,
                });
                return res;
            })));
        }
        //#endregion Finalizó la insercion de Causas
        //#region Insertando Alternativas
        const alternatives = body.possibleAlternatives;
        if ((alternatives === null || alternatives === void 0 ? void 0 : alternatives.length) > 0) {
            let resAlternatives = yield Promise.all(alternatives.map((alternative) => __awaiter(void 0, void 0, void 0, function* () {
                alternative.generalInformationId = informationIsert.codigo;
                let res = yield possibleAlternatives_1.default.create(alternative, {
                    transaction,
                });
                return res;
            })));
        }
        //#endregion Finalizó la insercion de Alternativas
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
            if (req.query.state) {
                where.state = req.query.state;
            }
            if (req.query.institucionId) {
                where.idEntity = req.query.institucionId;
            }
            if (req.query.fechaDesde && req.query.fechaHasta) {
                where.createdAt = {
                    [connection_1.default.Op.between]: [req.query.fechaDesde, req.query.fechaHasta],
                };
            }
        }
        const generalInformations = yield generalInformation_1.default.findAll({
            where,
            include: [
                {
                    required: false,
                    model: possibleEffects_1.default
                },
                {
                    required: false,
                    model: possibleCauses_1.default
                },
                {
                    required: false,
                    model: possibleAlternatives_1.default
                },
                {
                    required: false,
                    model: stage_1.default
                },
            ]
        });
        res.status(201).json({
            msg: "Datos Obtenidos",
            generalInformations,
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
//# sourceMappingURL=index.js.map