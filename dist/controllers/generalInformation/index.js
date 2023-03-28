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
exports.listResults = exports.returnIdea = exports.sendIdea = exports.getGeneralInformation = exports.postGeneralInformation = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const moment_1 = __importDefault(require("moment"));
const Sequelize = require('sequelize-oracle');
const { Op } = require("sequelize-oracle");
const feature_1 = require("../alternativeIdea/feature");
const BancoIdeas_1 = require("../../models/BancoIdeas");
const postGeneralInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield connection_1.default.transaction();
    try {
        const { body } = req;
        const informationModel = body;
        //#region Stage Idea
        let stageModel = yield BancoIdeas_1.stage.findOne({
            where: {
                name: 'Idea'
            }
        });
        if (stageModel === null || stageModel === void 0 ? void 0 : stageModel.codigo) {
            informationModel.idStage = stageModel.codigo;
        }
        else {
            let stageCreate = { name: 'Idea' };
            let stageCreated = yield BancoIdeas_1.stage.create(stageCreate);
            informationModel.idStage = stageCreated.codigo;
        }
        //#endregion
        informationModel.state = 'CREADA';
        informationModel.result = 'PENDIENTE';
        informationModel.author = req.user.id;
        //#region Correlative
        const correlative = yield BancoIdeas_1.generalInformation.max("correlation");
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
        const informationIsert = yield BancoIdeas_1.generalInformation.create(informationModel, {
            transaction,
        });
        //#region Insertando Efectos
        const effects = body.Effects;
        if ((effects === null || effects === void 0 ? void 0 : effects.length) > 0) {
            let resEffects = yield Promise.all(effects.map((effect) => __awaiter(void 0, void 0, void 0, function* () {
                effect.InformationId = informationIsert.codigo;
                let res = yield BancoIdeas_1.possibleEffects.create(effect, {
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
                let res = yield BancoIdeas_1.possibleCauses.create(cause, {
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
                let res = yield BancoIdeas_1.possibleAlternatives.create(alternative, {
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
        const information = yield (0, feature_1.getIdeaCompleta)(informationIsert.codigo);
        yield transaction.commit();
        res.status(201).json({
            msg: "ideaIsertada Correctamente",
            information,
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
    var _a;
    try {
        let where = {};
        let filtros = req.query;
        if (filtros) {
            if (filtros.state && filtros.state != 'TODAS') {
                where.state = filtros.state;
            }
            if (filtros.institucionId) {
                where.idEntity = filtros.institucionId;
            }
            if (filtros.number) {
                where.registerCode = {
                    $like: `%${filtros.number}%`
                };
            }
            if (filtros.author == 'Mis Ideas') {
                where.author = req.user.id;
            }
            if (filtros.fechaDesde && filtros.fechaHasta) {
                where.createdAt = {
                    [connection_1.default.Op.between]: [filtros.fechaDesde, filtros.fechaHasta],
                };
            }
        }
        // TODO: Este es el ID de SEGEPLAN 
        if (((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id_inst) != '16220') {
            where.idEntity = req.user.id_inst;
        }
        console.log(where);
        let generalInformations = yield BancoIdeas_1.generalInformation.findAll({
            where,
            order: [
                ['correlation', 'ASC']
            ],
        });
        let ideas = [];
        if (generalInformations || generalInformations.length > 0) {
            let resGIdea = yield Promise.all(generalInformations.map((idea) => __awaiter(void 0, void 0, void 0, function* () {
                const ideaFind = yield (0, feature_1.getIdeaCompleta)(idea.codigo);
                ideas.push(ideaFind);
            })));
        }
        yield ideas.sort(function (a, b) {
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
            let generalIdea = yield BancoIdeas_1.generalInformation.findOne({
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
            let generalIdea = yield BancoIdeas_1.generalInformation.findOne({
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
const listResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        let idEntity = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id_inst;
        let resultado = [];
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
        `;
        let queryToSend = '';
        let filtros = req.query;
        console.log("🚀 ~ file: index.ts:314 ~ listResults ~ req.query:", req.query);
        // TODO: Este es el ID de SEGEPLAN 
        if (idEntity != '16220') {
            queryToSend = queryGeneral;
            if (filtros) {
                const wordWhere = ` WHERE `;
                const wordAnd = ` AND `;
                let whereIsUsed = false;
                if (filtros.stage && filtros.stage != 'TODAS') {
                    const queryStage = ` "preInvestment"."etapaResultado" like '%${filtros.stage}%'`;
                    if (whereIsUsed) {
                        queryToSend = queryToSend + wordAnd + queryStage;
                    }
                    else {
                        queryToSend = queryToSend + wordWhere + queryStage;
                        whereIsUsed = true;
                    }
                }
                if (filtros.executionUnit && filtros.executionUnit != '') {
                    const queryExecutionUnit = ` "resEntity"."executionUnit" like '%${filtros.executionUnit}%'`;
                    if (whereIsUsed) {
                        queryToSend = queryToSend + wordAnd + queryExecutionUnit;
                    }
                    else {
                        queryToSend = queryToSend + wordWhere + queryExecutionUnit;
                        whereIsUsed = true;
                    }
                }
                if (filtros.number) {
                    const queryNumber = ` (select "registerCode" from "Information" where "Information"."codigo" = "alter"."sectionBIId") like '%${filtros.number}%'`;
                    if (whereIsUsed) {
                        queryToSend = queryToSend + wordAnd + queryNumber;
                    }
                    else {
                        queryToSend = queryToSend + wordWhere + queryNumber;
                        whereIsUsed = true;
                    }
                }
            }
        }
        else {
            queryToSend = querySpecific;
            if (filtros) {
                if (filtros.stage && filtros.stage != 'TODAS') {
                    const queryStage = ` and "preInvestment"."etapaResultado" like '%${filtros.stage}%'`;
                    queryToSend = queryToSend + queryStage;
                }
                if (filtros.executionUnit && filtros.executionUnit != '') {
                    const queryExecutionUnit = ` and "resEntity"."executionUnit" like '%${filtros.executionUnit}%'`;
                    queryToSend = queryToSend + queryExecutionUnit;
                }
                if (filtros.number) {
                    const queryNumber = ` and (select "registerCode" from "Information" where "Information"."codigo" = "alter"."sectionBIId") like '%${filtros.number}%'`;
                    queryToSend = queryToSend + queryNumber;
                }
            }
        }
        yield connection_1.default.query(queryToSend).spread((result) => { resultado = result; }).catch((error) => {
            res.status(500).json({
                msg: "Error",
                error,
            });
        });
        res.status(200).json({
            msg: "Datos Obtenidos",
            data: resultado,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
});
exports.listResults = listResults;
