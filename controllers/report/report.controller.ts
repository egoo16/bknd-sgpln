import { Request, Response } from 'express';
import models from "../../db/connection";
import { IdeaReport } from './Interfaces/ideasReport';
import { FiltroIdeaReport } from './Interfaces/filtrosIdeaReport';
import { ideaAlternative } from '../../models';


export const getIdeasFitered = async (req: any, res: Response) => {
    try {

        let ideasFound: IdeaReport[] = [];
        let ideasResult: IdeaReport[] = [];


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

        let queryToSend = ''


        let filtros: FiltroIdeaReport = req.query
        queryToSend = queryToIdeas;

        if (filtros) {

            const wordWhere = ` WHERE `
            const wordAnd = ` AND `

            let whereIsUsed = false;

            if (filtros.state && filtros.state != 'TODAS') {
                const queryStage = ` "state" like '%${filtros.state}%'`;
                if (whereIsUsed) {
                    queryToSend = queryToSend + wordAnd + queryStage;
                } else {
                    queryToSend = queryToSend + wordWhere + queryStage;
                    whereIsUsed = true;
                }
            }
            if (filtros.idEntity && filtros.idEntity != '') {
                const queryIdEntity = ` "idEntity" = '${filtros.idEntity}'`;
                if (whereIsUsed) {
                    queryToSend = queryToSend + wordAnd + queryIdEntity;
                } else {
                    queryToSend = queryToSend + wordWhere + queryIdEntity;
                    whereIsUsed = true;
                }
            }
            if (filtros.yearCreated && filtros.yearCreated != '') {
                const queryYearCreated = ` EXTRACT(YEAR FROM "createdAt") = '${filtros.yearCreated}'`;
                if (whereIsUsed) {
                    queryToSend = queryToSend + wordAnd + queryYearCreated;
                } else {
                    queryToSend = queryToSend + wordWhere + queryYearCreated;
                    whereIsUsed = true;
                }
            }
            if (filtros.registerCode && filtros.registerCode != '') {
                const queryAdd = ` "registerCode" LIKE '%${filtros.registerCode}%'`;
                if (whereIsUsed) {
                    queryToSend = queryToSend + wordAnd + queryAdd;
                } else {
                    queryToSend = queryToSend + wordWhere + queryAdd;
                    whereIsUsed = true;
                }
            }
        }

        await models.query(queryToSend).spread((result: any) => { ideasFound = result; }).catch((error: any) => {
            res.status(500).json({
                msg: "Error",
                error,
            });
        });


        if (ideasFound.length > 0) {
            for (let index = 0; index < ideasFound.length; index++) {
                const element = ideasFound[index];
                let ideaFiltered = await getAlternativesByIdea(filtros, element)
                if (ideaFiltered) {
                    if (ideaFiltered.alternatives && ideaFiltered.alternatives.length > 0){
                        ideasResult.push(ideaFiltered);
                        ideasResult.push(ideaFiltered);
                    }
                }
            }
        }


        res.status(200).json({
            msg: "Datos Obtenidos",
            data: ideasResult,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
};


const getAlternativesByIdea = async (filtros: FiltroIdeaReport, idea: IdeaReport): Promise<IdeaReport> => {
    try {

        if (idea.codigo == '' || idea.codigo == null) {
            throw `No se obtuvo un ID de Idea Valido`;
        }

        const alternatives = await ideaAlternative.findAll({
            where: {
                sectionBIId: idea.codigo
            }
        });

        if (!alternatives || !alternatives.length) {
            return idea;
        }

        let resultado: any[] = [];
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


        let queryToSend = ''



        queryToSend = queryToAlternatives;

        if (filtros) {

            const wordAnd = ` AND `

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
            if (filtros.estimatedCostMin && filtros.estimatedCostMin != '' && filtros.estimatedCostMax && filtros.estimatedCostMax != '' ) {
                const queryToAdd = ` "projDesc"."estimatedCost" BETWEEN ${filtros.estimatedCostMin} AND ${filtros.estimatedCostMax}`;
                queryToSend = queryToSend + wordAnd + queryToAdd;
            }
            if (filtros.investmentCostMin && filtros.investmentCostMin != '' && filtros.investmentCostMax && filtros.investmentCostMax != '' ) {
                const queryToAdd = ` "projDesc"."investmentCost" BETWEEN ${filtros.investmentCostMin} AND ${filtros.investmentCostMax}`;
                queryToSend = queryToSend + wordAnd + queryToAdd;
            }
        }

        await models.query(queryToSend).spread((result: any) => { resultado = result; }).catch((error: any) => {
            throw `Ocurrio mientras se consultaba la base de datos, ${error}`;
        });

        if (resultado.length > 0) {
            const unifiedAlternatives: any = {};
            for (const alt of resultado) {
              const altKey = `${alt.codigo}_${alt.typeProject}_${alt.proccess}_${alt.object}_${alt.departament}_${alt.municipality}_${alt.nameEPI}_${alt.complexity}_${alt.estimatedCost}_${alt.investmentCost}_${alt.foundingSourcesName}_${alt.executionDateMonth}_${alt.executionDateYear}_${alt.finishDateMonth}_${alt.finishDateYear}_${alt.etapaValor}_${alt.etapaResultado}_${alt.referencePop}_${alt.denomination}`;
              if (!unifiedAlternatives[altKey]) {
                unifiedAlternatives[altKey] = {
                  ...alt,
                  type2: "",
                  total2: 0,
                };
              } else {
                if (alt.type === "Hombres") {
                  unifiedAlternatives[altKey].type2 = "Hombres";
                  unifiedAlternatives[altKey].total2 = alt.total;
                } else {
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

    } catch (error) {
        throw `Ocurrio un error mientras se filtraban alternativas, ${error}`;
    }
}