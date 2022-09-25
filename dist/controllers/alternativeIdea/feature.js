'use strict';
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
exports.fupdateIdeaAlternativeComplete = exports.getAlternative = exports.getAlternatives = exports.FcreateGeographicArea = exports.FcreateProjectDescription = exports.FcreatePopulationDemilitation = exports.FcresponsableEntity = exports.FcreatePreleminaryName = exports.FcreatePreInvestment = exports.FaddPertinenceQuality = exports.FcreateIdeaAlternativeComplete = exports.FgetPreinversion = void 0;
const datageo_model_1 = __importDefault(require("../../models/BancoIdeas/datageo.model"));
const denomination_1 = __importDefault(require("../../models/BancoIdeas/denomination"));
const executionTime_1 = __importDefault(require("../../models/BancoIdeas/executionTime"));
const generalInformation_1 = __importDefault(require("../../models/BancoIdeas/generalInformation"));
const geographicArea_1 = __importDefault(require("../../models/BancoIdeas/geographicArea"));
const ideaAlternative_1 = __importDefault(require("../../models/BancoIdeas/ideaAlternative"));
const populationDelimitation_1 = __importDefault(require("../../models/BancoIdeas/populationDelimitation"));
const preInvestment_1 = __importDefault(require("../../models/BancoIdeas/preInvestment"));
const preliminaryName_1 = __importDefault(require("../../models/BancoIdeas/preliminaryName"));
const projectDescription_1 = __importDefault(require("../../models/BancoIdeas/projectDescription"));
const qualification_1 = __importDefault(require("../../models/BancoIdeas/qualification"));
const referencePopulation_1 = __importDefault(require("../../models/BancoIdeas/referencePopulation"));
const responsibleEntity_1 = __importDefault(require("../../models/BancoIdeas/responsibleEntity"));
const responsibleEntity_2 = __importDefault(require("../../models/BancoIdeas/responsibleEntity"));
function FgetPreinversion(idAlternativa) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const proDes = yield projectDescription_1.default.findOne({ where: { AlterId: idAlternativa } });
            const popDel = yield populationDelimitation_1.default.findOne({ where: { AlterId: idAlternativa } });
            let costo = proDes.investmentCost;
            let rangoInversion = 0;
            let resRangoInversion = '';
            //RANGO DE INVERSIÓN
            if (costo <= 900000) {
                rangoInversion = 6;
                resRangoInversion = '<=900,000';
            }
            else if (costo >= 900001 && costo <= 10000000) {
                rangoInversion = 8;
                resRangoInversion = '>900,001<=10,000,000';
            }
            else if (costo >= 10000001 && costo <= 50000000) {
                rangoInversion = 10;
                resRangoInversion = '>10,000,001<=50,000,000';
            }
            else if (costo >= 50000001) {
                rangoInversion = 16;
                resRangoInversion = '>=50,000,001';
            }
            //ESTIMACIÓN BENEFICIARIOS 
            let benefits = popDel.estimateBeneficiaries;
            let estBenefits = 0;
            let resEstBenefits = '';
            if (benefits <= 1000) {
                estBenefits = 4;
                resEstBenefits = '1 <= 1,000';
            }
            else if (benefits >= 1001 && benefits <= 10000) {
                estBenefits = 6;
                resEstBenefits = '>1,001 <= 10,000';
            }
            else if (benefits >= 10001 && benefits <= 20000) {
                estBenefits = 8;
                resEstBenefits = '>10,001 <= 20,000';
            }
            else if (benefits >= 20001) {
                estBenefits = 12;
                resEstBenefits = '>20,001';
            }
            //COMPLEJIDAD
            let complejidad = proDes.complexity;
            let complejidadTotal = 0;
            if (complejidad == 'Alta') {
                complejidadTotal = 12;
            }
            else if (complejidad == 'Media') {
                complejidadTotal = 11;
            }
            else if (complejidad == 'Baja') {
                complejidadTotal = 7;
            }
            let totalSuma = (rangoInversion + estBenefits + complejidadTotal);
            let total = (((rangoInversion + estBenefits + complejidadTotal) * 100) / 40);
            let etapa = '';
            if (total <= 19) {
                etapa = 'Perfil';
            }
            else if (total >= 20 && total <= 35) {
                etapa = 'Prefactibilidad';
            }
            else if (total >= 36 && total <= 100) {
                etapa = 'Factibilidad';
            }
            //RESULTADO
            let preInversion = {
                rango: {
                    valor: rangoInversion,
                    resultado: resRangoInversion,
                },
                estimacion: {
                    valor: estBenefits,
                    resultado: resEstBenefits
                },
                complejidad: {
                    valor: complejidadTotal,
                    resultado: complejidad
                },
                etapa: {
                    valor: total,
                    resultado: etapa
                }
            };
            yield FcreatePreInvestment(preInversion, proDes.AlterId);
            return { preInversion };
        }
        catch (error) {
            //devuelve errores al cliente
            throw `Error al ingresar Idea alternativa: ${error}`;
        }
    });
}
exports.FgetPreinversion = FgetPreinversion;
function FcreateIdeaAlternativeComplete(ideaAlt, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let alternative;
            ideaAlt.state = 'CREADA';
            let ideaAlternativeCreated = yield ideaAlternative_1.default.create(ideaAlt, { transaction });
            let codigoAlternativa = ideaAlternativeCreated.codigo;
            yield FcreatePreleminaryName(ideaAlt.preName, codigoAlternativa, transaction);
            yield FcresponsableEntity(ideaAlt.resEntity, codigoAlternativa, transaction);
            yield FcreatePopulationDemilitation(ideaAlt.popDelimit, codigoAlternativa, transaction);
            yield FcreateGeographicArea(ideaAlt.geoArea, codigoAlternativa, transaction);
            yield FcreateProjectDescription(ideaAlt.projDesc, codigoAlternativa, transaction);
            if (ideaAlternativeCreated) {
                alternative = yield getAlternative(ideaAlternativeCreated.codigo);
            }
            return {
                message: `Idea alternativa creada correctamente`,
                alternative
            };
        }
        catch (error) {
            transaction.rollback();
            //devuelve errores al cliente
            throw `Error al ingresar Idea alternativa: ${error}`;
        }
    });
}
exports.FcreateIdeaAlternativeComplete = FcreateIdeaAlternativeComplete;
function FaddPertinenceQuality(pertinence, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let total = pertinence.total;
            let result = '';
            if (total >= 60) {
                pertinence.result = 'PERTINENTE';
                result = 'PERTINENTE';
            }
            else {
                pertinence.result = 'NO PERTINENTE';
                result = 'NO PERTINENTE';
            }
            let pertinenceMatrix = yield qualification_1.default.findOne({
                where: {
                    AlterId: pertinence.AlterId
                }
            });
            if (!pertinenceMatrix) {
                let pertinenceResult = yield qualification_1.default.create(pertinence, { transaction });
                let alternative = yield ideaAlternative_1.default.findOne({
                    where: {
                        codigo: pertinence.AlterId
                    }
                });
                alternative.state = 'CALIFICADA';
                alternative.save();
                let generalIdea = yield generalInformation_1.default.findOne({
                    where: {
                        codigo: alternative.sectionBIId
                    }
                });
                let state = generalIdea.result;
                if (state == 'PENDIENTE') {
                    generalIdea.result = result;
                    generalIdea.save();
                }
                else if (state == 'NO PERTINENTE') {
                    if (result != 'NO PERTINENTE') {
                        generalIdea.result = result;
                        generalIdea.save();
                    }
                }
                return { message: `Matriz de Pertinencia agregada correctamente` };
            }
            else {
                pertinenceMatrix.descProblem = pertinence.pertinenceMatrix;
                pertinenceMatrix.descProblemComment = pertinence.pertinenceMatrix;
                pertinenceMatrix.generalObjct = pertinence.pertinenceMatrix;
                pertinenceMatrix.generalObjctComment = pertinence.pertinenceMatrix;
                pertinenceMatrix.anlysDelimitation = pertinence.pertinenceMatrix;
                pertinenceMatrix.anlysDelimitationComment = pertinence.pertinenceMatrix;
                pertinenceMatrix.terrainIdent = pertinence.pertinenceMatrix;
                pertinenceMatrix.terrainIdentComment = pertinence.pertinenceMatrix;
                pertinenceMatrix.legalSituation = pertinence.pertinenceMatrix;
                pertinenceMatrix.legalSituationComment = pertinence.pertinenceMatrix;
                pertinenceMatrix.descAnlys = pertinence.pertinenceMatrix;
                pertinenceMatrix.descAnlysComment = pertinence.pertinenceMatrix;
                pertinenceMatrix.descriptionGeneral = pertinence.pertinenceMatrix;
                pertinenceMatrix.total = pertinence.pertinenceMatrix;
                pertinenceMatrix.result = pertinence.pertinenceMatrix;
                pertinenceMatrix.save();
                return { message: `Matriz de Pertinencia actualizada correctamente` };
            }
        }
        catch (error) {
            //devuelve errores al cliente
            throw `Error al ingresar Idea alternativa: ${error}`;
        }
    });
}
exports.FaddPertinenceQuality = FaddPertinenceQuality;
function FcreatePreInvestment(preInversion, idAlternativa) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let preInversionCreate = {
                AlterId: idAlternativa,
                rangoValor: preInversion.rango.valor,
                rangoResultado: preInversion.rango.resultado,
                estimacionValor: preInversion.estimacion.valor,
                estimacionResultado: preInversion.estimacion.resultado,
                complejidadValor: preInversion.complejidad.valor,
                complejidadResultado: preInversion.complejidad.resultado,
                etapaValor: preInversion.etapa.valor,
                etapaResultado: preInversion.etapa.resultado
            };
            let preInvestmentLoad = yield preInvestment_1.default.findOne({
                where: {
                    AlterId: idAlternativa
                }
            });
            if (!preInvestmentLoad) {
                preInversion.AlterId = idAlternativa;
                let preInvestmentHistoryCreated = yield preInvestment_1.default.create(preInversionCreate);
                return { preInvestmentHistoryCreated, message: `Pre inversion historico creado correctamente` };
            }
            else {
                preInvestmentLoad.rangoValor = preInversion.rango.valor;
                preInvestmentLoad.rangoResultado = preInversion.rango.resultado;
                preInvestmentLoad.estimacionValor = preInversion.estimacion.valor;
                preInvestmentLoad.estimacionResultado = preInversion.estimacion.resultado;
                preInvestmentLoad.complejidadValor = preInversion.complejidad.valor;
                preInvestmentLoad.complejidadResultado = preInversion.complejidad.resultado;
                preInvestmentLoad.etapaValor = preInversion.etapa.valor;
                preInvestmentLoad.etapaResultado = preInversion.etapa.resultad;
                preInvestmentLoad.save();
                return { preInvestmentLoad, message: `Pre inversion historico creado correctamente` };
            }
        }
        catch (error) {
            //devuelve errores al cliente
            throw `Error al ingresar Pre inversion historico: ${error}`;
        }
    });
}
exports.FcreatePreInvestment = FcreatePreInvestment;
function FcreatePreleminaryName(prName, idAlternativa, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            prName.AlterId = idAlternativa;
            let preliminaryNameCreated = yield preliminaryName_1.default.create(prName, { transaction });
            return { preliminaryNameCreated, message: `Nombre preliminar ingresado correctamente` };
        }
        catch (error) {
            transaction.rollback();
            //devuelve errores al cliente
            throw `Error al ingresar nombre preliminar de proyecto: ${error}`;
        }
    });
}
exports.FcreatePreleminaryName = FcreatePreleminaryName;
function FcresponsableEntity(resEntity, idAlternativa, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            resEntity.AlterId = idAlternativa;
            let responsableEntityCreated = yield responsibleEntity_1.default.create(resEntity, { transaction });
            return { responsableEntityCreated, message: `Entidad responsable ingresada correctamente` };
        }
        catch (error) {
            transaction.rollback();
            //devuelve errores al cliente
            throw `Error al ingresar entidad responsable: ${error}`;
        }
    });
}
exports.FcresponsableEntity = FcresponsableEntity;
function FcreatePopulationDemilitation(popDemiliation, idAlternativa, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            popDemiliation.AlterId = idAlternativa;
            // let refModel = await referencePopulation.findAll();
            // popDemiliation.refPopId = refModel[0].codigo;
            // let DenModel = await denomination.findAll();
            // popDemiliation.denId = DenModel[0].codigo;
            let referenceName = popDemiliation.refPopId;
            let reference = yield referencePopulation_1.default.findOne({
                where: {
                    name: referenceName
                }
            });
            if (!reference) {
                let ref = { name: referenceName };
                let referenceCreate = yield referencePopulation_1.default.create(ref, { transaction });
                popDemiliation.refPopId = referenceCreate.codigo;
            }
            else {
                popDemiliation.refPopId = reference.codigo;
            }
            let denominationName = popDemiliation.denId;
            let denmtion = yield denomination_1.default.findOne({
                where: {
                    name: denominationName
                }
            });
            if (!denmtion) {
                let denModel = { name: denominationName };
                let denCreate = yield denomination_1.default.create(denModel, { transaction });
                popDemiliation.denId = denCreate.codigo;
            }
            else {
                popDemiliation.denId = denmtion.codigo;
            }
            if (popDemiliation.estimateBeneficiaries && popDemiliation.totalPopulation) {
                let estimateBeneficiaries = parseInt(popDemiliation.estimateBeneficiaries, 10);
                let totalPopulation = parseInt(popDemiliation.totalPopulation, 10);
                let multCov = (estimateBeneficiaries / totalPopulation);
                let resCov = (multCov * 100);
                popDemiliation.coverage = resCov;
            }
            let populationDelimitationCreated = yield populationDelimitation_1.default.create(popDemiliation, { transaction });
            return { populationDelimitationCreated, message: `Delimitación preliminar ingresada correctamente` };
        }
        catch (error) {
            //devuelve errores al cliente
            transaction.rollback();
            throw `Error al ingresar delimitación preliminar: ${error}`;
        }
    });
}
exports.FcreatePopulationDemilitation = FcreatePopulationDemilitation;
function FcreateProjectDescription(proDescription, idAlternativa, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            proDescription.AlterId = idAlternativa;
            if (proDescription.annual || proDescription.annual == true) {
                proDescription.annual = 1;
            }
            else if (!proDescription.annual || proDescription.annual == false) {
                proDescription.annual = 0;
            }
            let proDesctiptionCreated = yield projectDescription_1.default.create(proDescription, { transaction });
            proDescription.execTime.projDescId = proDesctiptionCreated.codigo;
            yield executionTime_1.default.create(proDescription.execTime, { transaction });
            return { proDesctiptionCreated, message: `Descripción preliminar de la idea proyecto ingresada correctamente` };
        }
        catch (error) {
            transaction.rollback();
            //devuelve errores al cliente
            throw `Error al ingresar descripción preliminar de la idea proyecto preliminar: ${error}`;
        }
    });
}
exports.FcreateProjectDescription = FcreateProjectDescription;
function FcreateGeographicArea(geograpicArea, idAlternativa, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            geograpicArea.AlterId = idAlternativa;
            let geographicAreaCreated = yield geographicArea_1.default.create(geograpicArea, { transaction });
            if (geograpicArea.dataGeo) {
                for (let data of geograpicArea.dataGeo) {
                    data.geoAreaId = geographicAreaCreated.codigo;
                    yield datageo_model_1.default.create(data, { transaction });
                }
            }
            return { geographicAreaCreated, message: `Area geografica del proyecto ingresada correctamente` };
        }
        catch (error) {
            transaction.rollback();
            //devuelve errores al cliente
            throw `Error al ingresar area geografica del proyecto: ${error}`;
        }
    });
}
exports.FcreateGeographicArea = FcreateGeographicArea;
function getAlternatives(idIdea) {
    return __awaiter(this, void 0, void 0, function* () {
        let idAlternative = idIdea;
        let datosResult = [];
        let data = yield ideaAlternative_1.default.findAll({
            where: {
                sectionBIId: idAlternative
            },
            include: [
                {
                    required: false,
                    model: preliminaryName_1.default
                },
                {
                    required: false,
                    model: responsibleEntity_2.default
                },
            ]
        });
        if (data || data.length > 0) {
            let resPopDel = yield Promise.all(data.map((alter) => __awaiter(this, void 0, void 0, function* () {
                let idAlt = alter.codigo;
                let popDelimitation = yield populationDelimitation_1.default.findOne({
                    where: {
                        AlterId: idAlt
                    },
                    include: [
                        {
                            required: false,
                            model: referencePopulation_1.default
                        },
                        {
                            required: false,
                            model: denomination_1.default
                        },
                    ]
                });
                let gArea = yield geographicArea_1.default.findOne({
                    where: {
                        AlterId: idAlt
                    },
                });
                let pDescription = yield projectDescription_1.default.findOne({
                    where: {
                        AlterId: idAlt
                    },
                    include: [
                        {
                            required: false,
                            model: executionTime_1.default
                        },
                    ]
                });
                let quali = yield qualification_1.default.findOne({
                    where: {
                        AlterId: idAlt
                    },
                });
                let preInv = yield preInvestment_1.default.findOne({
                    where: {
                        AlterId: idAlt
                    },
                });
                let alternativa = {
                    codigo: alter.codigo,
                    sectionBIId: alter.sectionBIId,
                    state: alter.state,
                    createdAt: alter.createdAt,
                    updatedAt: alter.updatedAt,
                    deletedAt: alter.deletedAt,
                };
                alternativa.preName = {
                    codigo: alter.preName.codigo,
                    AlterId: alter.preName.AlterId,
                    typeProject: alter.preName.typeProject,
                    proccess: alter.preName.proccess,
                    object: alter.preName.object,
                    departament: alter.preName.departament,
                    municipality: alter.preName.municipality,
                    village: alter.preName.village,
                    preliminaryName: alter.preName.preliminaryName,
                    createdAt: alter.preName.createdAt,
                    updatedAt: alter.preName.updatedAt,
                    deletedAt: alter.preName.deletedAt,
                };
                alternativa.resEntity = {
                    codigo: alter.resEntity.codigo,
                    AlterId: alter.resEntity.AlterId,
                    nameEPI: alter.resEntity.nameEPI,
                    leaderName: alter.resEntity.leaderName,
                    email: alter.resEntity.email,
                    phone: alter.resEntity.phone,
                    createdAt: alter.resEntity.createdAt,
                    updatedAt: alter.resEntity.updatedAt,
                    deletedAt: alter.resEntity.deletedAt,
                };
                if (popDelimitation) {
                    alternativa.popDelimit = {
                        codigo: popDelimitation.codigo,
                        AlterId: popDelimitation.AlterId,
                        refPopId: popDelimitation.refPopId,
                        denId: popDelimitation.denId,
                        totalPopulation: popDelimitation.totalPopulation,
                        gender: popDelimitation.gender,
                        estimateBeneficiaries: popDelimitation.estimateBeneficiaries,
                        preliminaryCharacterization: popDelimitation.preliminaryCharacterization,
                        coverage: popDelimitation.coverage,
                        createdAt: popDelimitation.createdAt,
                        updatedAt: popDelimitation.updatedAt,
                        deletedAt: popDelimitation.deletedAt,
                    };
                }
                if (popDelimitation === null || popDelimitation === void 0 ? void 0 : popDelimitation.refPop) {
                    alternativa.popDelimit.refPop = {
                        codigo: popDelimitation.refPop.codigo,
                        name: popDelimitation.refPop.name,
                        createdAt: popDelimitation.refPop.createdAt,
                        updatedAt: popDelimitation.refPop.updatedAt,
                        deletedAt: popDelimitation.refPop.deletedAt,
                    };
                }
                if (popDelimitation === null || popDelimitation === void 0 ? void 0 : popDelimitation.denmtion) {
                    alternativa.popDelimitdenmtion = {
                        codigo: popDelimitation.denmtion.codigo,
                        name: popDelimitation.denmtion.name,
                        createdAt: popDelimitation.denmtion.createdAt,
                        updatedAt: popDelimitation.denmtion.updatedAt,
                        deletedAt: popDelimitation.denmtion.deletedAt,
                    };
                }
                if (gArea) {
                    let datageo = yield datageo_model_1.default.findAll({
                        where: {
                            geoAreaId: gArea.codigo
                        }
                    });
                    alternativa.geoArea = {
                        codigo: gArea.codigo,
                        AlterId: gArea.AlterId,
                        availableTerrain: gArea.availableTerrain,
                        oneAvailableTerrain: gArea.oneAvailableTerrain,
                        investPurchase: gArea.investPurchase,
                        createdAt: gArea.createdAt,
                        updatedAt: gArea.updatedAt,
                        deletedAt: gArea.deletedAt,
                    };
                    alternativa.geoArea.dataGeo = [];
                    if (datageo) {
                        datageo.map((dta) => {
                            let coord = {
                                codigo: dta.codigo,
                                geoAreaId: dta.geoAreaId,
                                governmentTerrain: dta.governmentTerrain,
                                registerGovernmentTerrain: dta.registerGovernmentTerrain,
                                statusDescribe: dta.statusDescribe,
                                finca: dta.finca,
                                folio: dta.folio,
                                libro: dta.libro,
                                plano: dta.plano,
                                slightIncline: dta.slightIncline,
                                broken: dta.broken,
                                image: dta.image,
                                imageUrl: dta.imageUrl,
                                description: dta.description,
                                basicServices: dta.basicServices,
                                descriptionBasicServices: dta.descriptionBasicServices,
                                degreesx: dta.degreesx,
                                minutesx: dta.minutesx,
                                secondsx: dta.secondsx,
                                degreesy: dta.degreesy,
                                minutesy: dta.minutesy,
                                secondsy: dta.secondsy,
                                descriptionLocation: dta.descriptionLocation,
                                createdAt: dta.createdAt,
                                updatedAt: dta.updatedAt,
                                deletedAt: dta.deletedAt,
                            };
                            alternativa.geoArea.dataGeo.push(coord);
                        });
                    }
                }
                if (pDescription) {
                    alternativa.projDesc = {
                        codigo: pDescription.codigo,
                        AlterId: pDescription.AlterId,
                        projectType: pDescription.projectType,
                        formulationProcess: pDescription.formulationProcess,
                        formulationProcessDescription: pDescription.formulationProcessDescription,
                        descriptionInterventions: pDescription.descriptionInterventions,
                        complexity: pDescription.complexity,
                        estimatedCost: pDescription.estimatedCost,
                        investmentCost: pDescription.investmentCost,
                        fundingSources: pDescription.fundingSources,
                        foundingSourcesName: pDescription.foundingSourcesName,
                        createdAt: pDescription.createdAt,
                        updatedAt: pDescription.updatedAt,
                        deletedAt: pDescription.deletedAt,
                        execTime: null,
                    };
                    if (pDescription.execTime)
                        alternativa.projDesc.execTime = {
                            codigo: pDescription.execTime.codigo,
                            projDescId: pDescription.execTime.projDescId,
                            tentativeTermMonth: pDescription.execTime.tentativeTermMonth,
                            tentativeTermYear: pDescription.execTime.tentativeTermYear,
                            executionDateMonth: pDescription.execTime.executionDateMonth,
                            executionDateYear: pDescription.execTime.executionDateYear,
                            finishDateMonth: pDescription.execTime.finishDateMonth,
                            finishDateYear: pDescription.execTime.finishDateYear,
                            annual: pDescription.execTime.annual,
                            createdAt: pDescription.execTime.createdAt,
                            updatedAt: pDescription.execTime.updatedAt,
                            deletedAt: pDescription.execTime.deletedAt,
                        };
                }
                if (quali) {
                    alternativa.qualification = {
                        codigo: quali.codigo,
                        AlterId: quali.AlterId,
                        descProblem: quali.descProblem,
                        descProblemComment: quali.descProblemComment,
                        generalObjct: quali.generalObjct,
                        generalObjctComment: quali.generalObjctComment,
                        anlysDelimitation: quali.anlysDelimitation,
                        anlysDelimitationComment: quali.anlysDelimitationComment,
                        terrainIdent: quali.terrainIdent,
                        terrainIdentComment: quali.terrainIdentComment,
                        legalSituation: quali.legalSituation,
                        legalSituationComment: quali.legalSituationComment,
                        descAnlys: quali.descAnlys,
                        descAnlysComment: quali.descAnlysComment,
                        descriptionGeneral: quali.descriptionGeneral,
                        total: quali.total,
                        result: quali.result,
                    };
                }
                if (preInv) {
                    alternativa.preInvestment = {
                        codigo: preInv.codigo,
                        AlterId: preInv.AlterId,
                        rangoValor: preInv.rangoValor,
                        rangoResultado: preInv.rangoResultado,
                        estimacionValor: preInv.estimacionValor,
                        estimacionResultado: preInv.estimacionResultado,
                        complejidadValor: preInv.complejidadValor,
                        complejidadResultado: preInv.complejidadResultado,
                        etapaValor: preInv.etapaValor,
                        etapaResultado: preInv.etapaResultado,
                    };
                }
                datosResult.push(alternativa);
            })));
        }
        // let datosResult = await ideaAlternative.findAll({
        //     where: {
        //         sectionBIId: idAlternative
        //     },
        //     include: [
        //         {
        //             required: false,
        //             model: preliminaryName
        //         },
        //         {
        //             required: false,
        //             model: responsibleEntity
        //         },
        //         {
        //             required: false,
        //             model: populationDelimitation,
        //             include: [
        //                 {
        //                     required: false,
        //                     model: referencePopulation
        //                 },
        //                 {
        //                     required: false,
        //                     model: denomination
        //                 },
        //             ]
        //         },
        //         {
        //             required: false,
        //             model: geographicArea,
        //             include: [
        //                 {
        //                     required: false,
        //                     model: coordinates
        //                 },
        //             ]
        //         },
        //         {
        //             required: false,
        //             model: projectDescription,
        //             include: [
        //                 {
        //                     required: false,
        //                     model: executionTime
        //                 },
        //             ]
        //         },
        //         {
        //             required: false,
        //             model: qualification
        //         },
        //     ]
        // });
        return datosResult;
    });
}
exports.getAlternatives = getAlternatives;
function getAlternative(idAlternative) {
    return __awaiter(this, void 0, void 0, function* () {
        let datosResult;
        let data = yield ideaAlternative_1.default.findOne({
            where: {
                codigo: idAlternative
            },
            include: [
                {
                    required: false,
                    model: preliminaryName_1.default
                },
                {
                    required: false,
                    model: responsibleEntity_2.default
                },
            ]
        });
        if (data) {
            let idAlt = data.codigo;
            let popDelimitation = yield populationDelimitation_1.default.findOne({
                where: {
                    AlterId: idAlt
                },
                include: [
                    {
                        required: false,
                        model: referencePopulation_1.default
                    },
                    {
                        required: false,
                        model: denomination_1.default
                    },
                ]
            });
            let gArea = yield geographicArea_1.default.findOne({
                where: {
                    AlterId: idAlt
                },
            });
            let pDescription = yield projectDescription_1.default.findOne({
                where: {
                    AlterId: idAlt
                },
                include: [
                    {
                        required: false,
                        model: executionTime_1.default
                    },
                ]
            });
            let quali = yield qualification_1.default.findOne({
                where: {
                    AlterId: idAlt
                },
            });
            let preInv = yield preInvestment_1.default.findOne({
                where: {
                    AlterId: idAlt
                },
            });
            let alternativa = {
                codigo: data.codigo,
                sectionBIId: data.sectionBIId,
                state: data.data,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
                deletedAt: data.deletedAt,
            };
            alternativa.preName = {
                codigo: data.preName.codigo,
                AlterId: data.preName.AlterId,
                typeProject: data.preName.typeProject,
                proccess: data.preName.proccess,
                object: data.preName.object,
                departament: data.preName.departament,
                municipality: data.preName.municipality,
                village: data.preName.village,
                preliminaryName: data.preName.preliminaryName,
                createdAt: data.preName.createdAt,
                updatedAt: data.preName.updatedAt,
                deletedAt: data.preName.deletedAt,
            };
            alternativa.resEntity = {
                codigo: data.resEntity.codigo,
                AlterId: data.resEntity.AlterId,
                nameEPI: data.resEntity.nameEPI,
                leaderName: data.resEntity.leaderName,
                email: data.resEntity.email,
                phone: data.resEntity.phone,
                createdAt: data.resEntity.createdAt,
                updatedAt: data.resEntity.updatedAt,
                deletedAt: data.resEntity.deletedAt,
            };
            if (popDelimitation) {
                alternativa.popDelimit = {
                    codigo: popDelimitation.codigo,
                    AlterId: popDelimitation.AlterId,
                    refPopId: popDelimitation.refPopId,
                    denId: popDelimitation.denId,
                    totalPopulation: popDelimitation.totalPopulation,
                    gender: popDelimitation.gender,
                    estimateBeneficiaries: popDelimitation.estimateBeneficiaries,
                    preliminaryCharacterization: popDelimitation.preliminaryCharacterization,
                    coverage: popDelimitation.coverage,
                    createdAt: popDelimitation.createdAt,
                    updatedAt: popDelimitation.updatedAt,
                    deletedAt: popDelimitation.deletedAt,
                };
            }
            if (popDelimitation === null || popDelimitation === void 0 ? void 0 : popDelimitation.refPop) {
                alternativa.popDelimit.refPop = {
                    codigo: popDelimitation.refPop.codigo,
                    name: popDelimitation.refPop.name,
                    createdAt: popDelimitation.refPop.createdAt,
                    updatedAt: popDelimitation.refPop.updatedAt,
                    deletedAt: popDelimitation.refPop.deletedAt,
                };
            }
            if (popDelimitation === null || popDelimitation === void 0 ? void 0 : popDelimitation.denmtion) {
                alternativa.popDelimitdenmtion = {
                    codigo: popDelimitation.denmtion.codigo,
                    name: popDelimitation.denmtion.name,
                    createdAt: popDelimitation.denmtion.createdAt,
                    updatedAt: popDelimitation.denmtion.updatedAt,
                    deletedAt: popDelimitation.denmtion.deletedAt,
                };
            }
            if (gArea) {
                let datageo = yield datageo_model_1.default.findAll({
                    where: {
                        geoAreaId: gArea.codigo
                    }
                });
                alternativa.geoArea = {
                    codigo: gArea.codigo,
                    AlterId: gArea.AlterId,
                    availableTerrain: gArea.availableTerrain,
                    oneAvailableTerrain: gArea.oneAvailableTerrain,
                    investPurchase: gArea.investPurchase,
                    createdAt: gArea.createdAt,
                    updatedAt: gArea.updatedAt,
                    deletedAt: gArea.deletedAt,
                };
                alternativa.geoArea.dataGeo = [];
                if (datageo) {
                    datageo.map((dta) => {
                        let coord = {
                            codigo: dta.codigo,
                            geoAreaId: dta.geoAreaId,
                            governmentTerrain: dta.governmentTerrain,
                            registerGovernmentTerrain: dta.registerGovernmentTerrain,
                            statusDescribe: dta.statusDescribe,
                            finca: dta.finca,
                            folio: dta.folio,
                            libro: dta.libro,
                            plano: dta.plano,
                            slightIncline: dta.slightIncline,
                            broken: dta.broken,
                            image: dta.image,
                            imageUrl: dta.imageUrl,
                            description: dta.description,
                            basicServices: dta.basicServices,
                            descriptionBasicServices: dta.descriptionBasicServices,
                            degreesx: dta.degreesx,
                            minutesx: dta.minutesx,
                            secondsx: dta.secondsx,
                            degreesy: dta.degreesy,
                            minutesy: dta.minutesy,
                            secondsy: dta.secondsy,
                            descriptionLocation: dta.descriptionLocation,
                            createdAt: dta.createdAt,
                            updatedAt: dta.updatedAt,
                            deletedAt: dta.deletedAt,
                        };
                        alternativa.geoArea.dataGeo.push(coord);
                    });
                }
            }
            if (pDescription) {
                alternativa.projDesc = {
                    codigo: pDescription.codigo,
                    AlterId: pDescription.AlterId,
                    projectType: pDescription.projectType,
                    formulationProcess: pDescription.formulationProcess,
                    formulationProcessDescription: pDescription.formulationProcessDescription,
                    descriptionInterventions: pDescription.descriptionInterventions,
                    complexity: pDescription.complexity,
                    estimatedCost: pDescription.estimatedCost,
                    investmentCost: pDescription.investmentCost,
                    fundingSources: pDescription.fundingSources,
                    foundingSourcesName: pDescription.foundingSourcesName,
                    createdAt: pDescription.createdAt,
                    updatedAt: pDescription.updatedAt,
                    deletedAt: pDescription.deletedAt,
                    execTime: null,
                };
                if (pDescription.execTime)
                    alternativa.projDesc.execTime = {
                        codigo: pDescription.execTime.codigo,
                        projDescId: pDescription.execTime.projDescId,
                        tentativeTermMonth: pDescription.execTime.tentativeTermMonth,
                        tentativeTermYear: pDescription.execTime.tentativeTermYear,
                        executionDateMonth: pDescription.execTime.executionDateMonth,
                        executionDateYear: pDescription.execTime.executionDateYear,
                        finishDateMonth: pDescription.execTime.finishDateMonth,
                        finishDateYear: pDescription.execTime.finishDateYear,
                        annual: pDescription.execTime.annual,
                        createdAt: pDescription.execTime.createdAt,
                        updatedAt: pDescription.execTime.updatedAt,
                        deletedAt: pDescription.execTime.deletedAt,
                    };
            }
            if (quali) {
                alternativa.qualification = {
                    codigo: quali.codigo,
                    AlterId: quali.AlterId,
                    descProblem: quali.descProblem,
                    descProblemComment: quali.descProblemComment,
                    generalObjct: quali.generalObjct,
                    generalObjctComment: quali.generalObjctComment,
                    anlysDelimitation: quali.anlysDelimitation,
                    anlysDelimitationComment: quali.anlysDelimitationComment,
                    terrainIdent: quali.terrainIdent,
                    terrainIdentComment: quali.terrainIdentComment,
                    legalSituation: quali.legalSituation,
                    legalSituationComment: quali.legalSituationComment,
                    descAnlys: quali.descAnlys,
                    descAnlysComment: quali.descAnlysComment,
                    descriptionGeneral: quali.descriptionGeneral,
                    total: quali.total,
                    result: quali.result,
                };
            }
            if (preInv) {
                alternativa.preInvestment = {
                    codigo: preInv.codigo,
                    AlterId: preInv.AlterId,
                    rangoValor: preInv.rangoValor,
                    rangoResultado: preInv.rangoResultado,
                    estimacionValor: preInv.estimacionValor,
                    estimacionResultado: preInv.estimacionResultado,
                    complejidadValor: preInv.complejidadValor,
                    complejidadResultado: preInv.complejidadResultado,
                    etapaValor: preInv.etapaValor,
                    etapaResultado: preInv.etapaResultado,
                };
            }
            datosResult = alternativa;
            ;
        }
        // let datosResult = await ideaAlternative.findAll({
        //     where: {
        //         sectionBIId: idAlternative
        //     },
        //     include: [
        //         {
        //             required: false,
        //             model: preliminaryName
        //         },
        //         {
        //             required: false,
        //             model: responsibleEntity
        //         },
        //         {
        //             required: false,
        //             model: populationDelimitation,
        //             include: [
        //                 {
        //                     required: false,
        //                     model: referencePopulation
        //                 },
        //                 {
        //                     required: false,
        //                     model: denomination
        //                 },
        //             ]
        //         },
        //         {
        //             required: false,
        //             model: geographicArea,
        //             include: [
        //                 {
        //                     required: false,
        //                     model: coordinates
        //                 },
        //             ]
        //         },
        //         {
        //             required: false,
        //             model: projectDescription,
        //             include: [
        //                 {
        //                     required: false,
        //                     model: executionTime
        //                 },
        //             ]
        //         },
        //         {
        //             required: false,
        //             model: qualification
        //         },
        //     ]
        // });
        return datosResult;
    });
}
exports.getAlternative = getAlternative;
function fupdateIdeaAlternativeComplete(ideaAlt, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let alternative;
            let altActive = yield ideaAlternative_1.default.findOne({
                where: {
                    codigo: ideaAlt.codigo
                }
            });
            if (altActive) {
                yield altActive.destroy({ transaction });
            }
            else {
                throw `Error al actualizar Alternativa, no existe el ID enviado`;
            }
            ideaAlt.codigo = undefined;
            ideaAlt.state = 'CREADA';
            let ideaAlternativeCreated = yield ideaAlternative_1.default.create(ideaAlt, { transaction });
            let codigoAlternativa = ideaAlternativeCreated.codigo;
            yield FcreatePreleminaryName(ideaAlt.preName, codigoAlternativa, transaction);
            yield FcresponsableEntity(ideaAlt.resEntity, codigoAlternativa, transaction);
            yield FcreatePopulationDemilitation(ideaAlt.popDelimit, codigoAlternativa, transaction);
            yield FcreateGeographicArea(ideaAlt.geoArea, codigoAlternativa, transaction);
            yield FcreateProjectDescription(ideaAlt.projDesc, codigoAlternativa, transaction);
            if (ideaAlternativeCreated) {
                alternative = yield getAlternative(ideaAlternativeCreated.codigo);
            }
            return {
                message: `Idea alternativa Actualizada correctamente`,
                alternative
            };
        }
        catch (error) {
            transaction.rollback();
            //devuelve errores al cliente
            throw `Error al ingresar Idea alternativa: ${error}`;
        }
    });
}
exports.fupdateIdeaAlternativeComplete = fupdateIdeaAlternativeComplete;
//# sourceMappingURL=feature.js.map