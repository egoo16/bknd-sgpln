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
exports.queryToSend = exports.getRegisterSinafip = exports.getIdeasFitered = void 0;
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
            if (filtros.productName && filtros.productName != '') {
                const queryIdEntity = ` "productName" = '${filtros.idEntity}'`;
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
                    if (ideaFiltered.alternatives && ideaFiltered.alternatives.length > 0) {
                        ideasResult.push(ideaFiltered);
                    }
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
        "projDesc"."projectType" as "typeProjectFormulation",
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
            if (filtros.projectType && filtros.projectType != '') {
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
        yield connection_1.default.query(queryToSend).spread((result) => { resultado = result; }).catch((error) => {
            throw `Ocurrio mientras se consultaba la base de datos, ${error}`;
        });
        if (resultado.length > 0) {
            const unifiedAlternatives = {};
            for (const alt of resultado) {
                const altKey = `${alt.codigo}_${alt.typeProject}_${alt.proccess}_${alt.object}_${alt.departament}_${alt.municipality}_${alt.nameEPI}_${alt.complexity}_${alt.estimatedCost}_${alt.investmentCost}_${alt.foundingSourcesName}_${alt.executionDateMonth}_${alt.executionDateYear}_${alt.finishDateMonth}_${alt.finishDateYear}_${alt.etapaValor}_${alt.etapaResultado}_${alt.referencePop}_${alt.denomination}`;
                if (!unifiedAlternatives[altKey]) {
                    unifiedAlternatives[altKey] = Object.assign(Object.assign({}, alt), { type2: "", total2: 0 });
                }
                else {
                    if (alt.type === "Hombres") {
                        unifiedAlternatives[altKey].type2 = "Hombres";
                        unifiedAlternatives[altKey].total2 = alt.total;
                    }
                    else {
                        unifiedAlternatives[altKey].type2 = "Mujeres";
                        unifiedAlternatives[altKey].total2 = alt.total;
                    }
                }
            }
            const result = Object.values(unifiedAlternatives);
            let ideaFiltered = idea;
            ideaFiltered.alternatives = result;
            return ideaFiltered;
        }
        return idea;
    }
    catch (error) {
        throw `Ocurrio un error mientras se filtraban alternativas, ${error}`;
    }
});
const getRegisterSinafip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ideasResult = [];
        let queryToIdeas = `
        SELECT 
        "institution"."entityName",
        "institution"."executionUnit",
        "institution"."generalStudy",
        "studyDescriptions"."modalityFinancing",
        "investmentProjects"."estimatedProject",
        "request"."status",
        "delimitPopulation"."type",
        "delimitPopulation"."total"
        FROM "request"
        INNER JOIN "institution" ON "request"."id" = "institution"."requestId"
        INNER JOIN "investmentProjects" ON "request"."id" = "investmentProjects"."requestId"
        INNER JOIN "studyDescriptions" ON "request"."id" = "studyDescriptions"."requestId"
        INNER JOIN "delimits" ON "request"."id" = "delimits"."requestId"
        INNER JOIN "delimitPopulation" ON "delimits"."id" = "delimitPopulation"."delimitId"
        
        WHERE
        "institution"."entityName" = 'SUPERINTENDENCIA DE ADMINISTRACION TRIBUTARIA - SAT'
        AND "institution"."executionUnit" LIKE '%Unidad%'
        AND "institution"."generalStudy" = 'AMBIENTAL'
        AND "studyDescriptions"."modalityFinancing" = 'INGRESOS PROPIOS'
        AND "delimits"."departament" = 'QUETZALTENANGO'
        AND "delimits"."municipality" = 'CABRICAN'
        AND "delimits"."denomination" = 'Pacientes'
        AND "delimits"."estimatedBenef" = 57023
        AND "investmentProjects"."estimatedProject" = 4534564564
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
        yield connection_1.default.query(queryToSend).spread((result) => { ideasResult = result; }).catch((error) => {
            res.status(500).json({
                msg: "Error",
                error,
            });
        });
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
exports.getRegisterSinafip = getRegisterSinafip;
const queryToSend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pass = req.body.pass;
        console.log("🚀 ~ file: report.controller.ts:385 ~ queryToSend ~ pass:", pass);
        if (!pass || pass != '1135') {
            throw `Error, No tienes permisos`;
        }
        const querySend = req.body.query;
        console.log("🚀 ~ file: report.controller.ts:391 ~ queryToSend ~ querySend:", querySend);
        if (!querySend) {
            throw `Error, consulta no encontrada`;
        }
        let resultQuery;
        yield connection_1.default.query(querySend).spread((result) => { resultQuery = result; }).catch((error) => {
            throw `Error, en la consulta consulta ${error}`;
        });
        res.status(200).json({
            msg: "Datos Obtenidos",
            data: {
                query: querySend,
                result: resultQuery,
            }
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
});
exports.queryToSend = queryToSend;
