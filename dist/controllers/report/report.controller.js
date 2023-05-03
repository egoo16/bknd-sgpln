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
exports.getIdeasFitered = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const models_1 = require("../../models");
const getIdeasFitered = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ideasFound = [];
        let ideasResult = [];
        let queryToIdeas = `
        SELECT
        "codigo",
        "productName",
        "registerCode",
        "nameEntity",
        "definitionPotentiality",
        "baseLine"
        FROM
            "Information"
            `;
        let queryToSend = '';
        let filtros = req.query;
        queryToSend = queryToIdeas;
        if (filtros) {
            const wordWhere = ` WHERE `;
            const wordAnd = ` AND `;
            let whereIsUsed = false;
            if (filtros.state && filtros.state != 'TODAS') {
                const queryStage = ` "state" like '%${filtros.state}%'`;
                if (whereIsUsed) {
                    queryToSend = queryToSend + wordAnd + queryStage;
                }
                else {
                    queryToSend = queryToSend + wordWhere + queryStage;
                    whereIsUsed = true;
                }
            }
            if (filtros.idEntity && filtros.idEntity != '') {
                const queryIdEntity = ` "idEntity" = '${filtros.idEntity}'`;
                if (whereIsUsed) {
                    queryToSend = queryToSend + wordAnd + queryIdEntity;
                }
                else {
                    queryToSend = queryToSend + wordWhere + queryIdEntity;
                    whereIsUsed = true;
                }
            }
            if (filtros.yearCreated && filtros.yearCreated != '') {
                const queryYearCreated = ` EXTRACT(YEAR FROM "createdAt") = '${filtros.yearCreated}'`;
                if (whereIsUsed) {
                    queryToSend = queryToSend + wordAnd + queryYearCreated;
                }
                else {
                    queryToSend = queryToSend + wordWhere + queryYearCreated;
                    whereIsUsed = true;
                }
            }
            if (filtros.registerCode && filtros.registerCode != '') {
                const queryAdd = ` "registerCode" LIKE '%${filtros.registerCode}%'`;
                if (whereIsUsed) {
                    queryToSend = queryToSend + wordAnd + queryAdd;
                }
                else {
                    queryToSend = queryToSend + wordWhere + queryAdd;
                    whereIsUsed = true;
                }
            }
        }
        yield connection_1.default.query(queryToSend).spread((result) => { ideasFound = result; }).catch((error) => {
            res.status(500).json({
                msg: "Error",
                error,
            });
        });
        if (ideasFound.length > 0) {
            for (let index = 0; index < ideasFound.length; index++) {
                const element = ideasFound[index];
                let ideaFiltered = yield getAlternativesByIdea(filtros, element);
                if (ideaFiltered) {
                    ideasResult.push(ideaFiltered);
                }
            }
        }
        res.status(200).json({
            msg: "Datos Obtenidos",
            data: ideasResult,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
});
exports.getIdeasFitered = getIdeasFitered;
const getAlternativesByIdea = (filtros, idea) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (idea.codigo == '' || idea.codigo == null) {
            throw `No se obtuvo un ID de Idea Valido`;
        }
        const alternatives = yield models_1.ideaAlternative.findAll({
            where: {
                sectionBIId: idea.codigo
            }
        });
        if (!alternatives || !alternatives.length) {
            return idea;
        }
        let resultado = [];
        let queryToAlternatives = `
        SELECT
        "alter"."codigo",
        "preName"."typeProject",
        "preName"."proccess",
        "preName"."object",
        "preName"."departament",
        "preName"."municipality",
        "resEntity"."nameEPI",
        "projDesc"."complexity",
        "projDesc"."estimatedCost",
        "projDesc"."investmentCost",
        "projDesc"."foundingSourcesName",
        "execTime"."executionDateMonth",
        "execTime"."executionDateYear",
        "execTime"."finishDateMonth",
        "execTime"."finishDateYear",
        "preInvestment"."etapaValor",
        "preInvestment"."etapaResultado",
        "refPop"."name" as "referencePop",
        "denmtion"."name" as "denomination",
        "populationAlt"."type",
        "populationAlt"."total"
        FROM
            "alter" 
        INNER JOIN "preName" ON "alter"."codigo" = "preName"."AlterId" 
        INNER JOIN "projDesc" ON "alter"."codigo" = "projDesc"."AlterId" 
        INNER JOIN "execTime" ON "projDesc"."codigo" = "execTime"."projDescId" 
        INNER JOIN "resEntity" ON "alter"."codigo" = "resEntity"."AlterId" 
        INNER JOIN "preInvestment" ON "alter"."codigo" = "preInvestment"."AlterId" 
        INNER JOIN "popDelimit" ON "alter"."codigo" = "popDelimit"."AlterId" 
        INNER JOIN "refPop" ON "popDelimit"."refPopId" = "refPop"."codigo" 
        INNER JOIN "denmtion" ON "popDelimit"."denId" = "denmtion"."codigo" 
        INNER JOIN "populationAlt" ON "popDelimit"."codigo" = "populationAlt"."popId" 

        WHERE "alter"."sectionBIId" = '${idea.codigo}' 
        `;
        let queryToSend = '';
        queryToSend = queryToAlternatives;
        if (filtros) {
            const wordAnd = ` AND `;
            if (filtros.typeIdea && filtros.typeIdea != '') {
                const queryToAdd = ` "preName"."typeProject" = '${filtros.typeIdea}' `;
                queryToSend = queryToSend + wordAnd + queryToAdd;
            }
            if (filtros.proccess && filtros.proccess != '') {
                const queryToAdd = ` "preName"."proccess" = '${filtros.proccess}' `;
                queryToSend = queryToSend + wordAnd + queryToAdd;
            }
            if (filtros.object && filtros.object != '') {
                const queryToAdd = ` "preName"."object" = '${filtros.object}' `;
                queryToSend = queryToSend + wordAnd + queryToAdd;
            }
            if (filtros.departament && filtros.departament != '') {
                const queryToAdd = ` "preName"."departament" = '${filtros.departament}' `;
                queryToSend = queryToSend + wordAnd + queryToAdd;
            }
            if (filtros.municipality && filtros.municipality != '') {
                const queryToAdd = ` "preName"."municipality" = '${filtros.municipality}' `;
                queryToSend = queryToSend + wordAnd + queryToAdd;
            }
            if (filtros.projectType && filtros.formulationProcess != '') {
                const queryToAdd = ` "projDesc"."projectType" = '${filtros.projectType}' `;
                queryToSend = queryToSend + wordAnd + queryToAdd;
            }
            if (filtros.formulationProcess && filtros.formulationProcess != '') {
                const queryToAdd = ` "projDesc"."formulationProcess" = '${filtros.formulationProcess}' `;
                queryToSend = queryToSend + wordAnd + queryToAdd;
            }
            if (filtros.complexity && filtros.complexity != '') {
                const queryToAdd = ` "projDesc"."complexity" = '${filtros.complexity}' `;
                queryToSend = queryToSend + wordAnd + queryToAdd;
            }
            if (filtros.foundingSourcesName && filtros.foundingSourcesName != '') {
                const queryToAdd = ` "projDesc"."foundingSourcesName" = '${filtros.foundingSourcesName}' `;
                queryToSend = queryToSend + wordAnd + queryToAdd;
            }
            if (filtros.estimatedCostMin && filtros.estimatedCostMin != '' && filtros.estimatedCostMax && filtros.estimatedCostMax != '') {
                const queryToAdd = ` "projDesc"."estimatedCost" BETWEEN ${filtros.estimatedCostMin} AND ${filtros.estimatedCostMax}`;
                queryToSend = queryToSend + wordAnd + queryToAdd;
            }
            if (filtros.investmentCostMin && filtros.investmentCostMin != '' && filtros.investmentCostMax && filtros.investmentCostMax != '') {
                const queryToAdd = ` "projDesc"."investmentCost" BETWEEN ${filtros.investmentCostMin} AND ${filtros.investmentCostMax}`;
                queryToSend = queryToSend + wordAnd + queryToAdd;
            }
        }
        console.log("🚀 ~ file: report.controller.ts:223 ~ getAlternativesByIdea ~ queryToSend:", queryToSend);
        yield connection_1.default.query(queryToSend).spread((result) => { resultado = result; }).catch((error) => {
            throw `Ocurrio mientras se consultaba la base de datos, ${error}`;
        });
        console.log("🚀 ~ file: report.controller.ts:200 ~ getAlternativesByIdea ~ resultado:", resultado);
        if (resultado.length > 0) {
            let ideaFiltered = idea;
            ideaFiltered.alternatives = resultado;
            return ideaFiltered;
        }
        return idea;
    }
    catch (error) {
        throw `Ocurrio un error mientras se filtraban alternativas, ${error}`;
    }
});
