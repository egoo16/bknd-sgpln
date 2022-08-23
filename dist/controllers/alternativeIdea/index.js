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
exports.getPertinencia = exports.getAlternative = exports.getReferencePopulation = exports.getDenomination = exports.getPreinversion = exports.addPertinenceQuality = exports.createIdeaAlternativeComplete = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const feature_1 = require("./feature");
const ideaAlternative_1 = __importDefault(require("../../models/BancoIdeas/ideaAlternative"));
const preliminaryName_1 = __importDefault(require("../../models/BancoIdeas/preliminaryName"));
const responsibleEntity_1 = __importDefault(require("../../models/BancoIdeas/responsibleEntity"));
const populationDelimitation_1 = __importDefault(require("../../models/BancoIdeas/populationDelimitation"));
const geographicArea_1 = __importDefault(require("../../models/BancoIdeas/geographicArea"));
const projectDescription_1 = __importDefault(require("../../models/BancoIdeas/projectDescription"));
const referencePopulation_1 = __importDefault(require("../../models/BancoIdeas/referencePopulation"));
const denomination_1 = __importDefault(require("../../models/BancoIdeas/denomination"));
const coordinates_1 = __importDefault(require("../../models/BancoIdeas/coordinates"));
const executionTime_1 = __importDefault(require("../../models/BancoIdeas/executionTime"));
const generalInformation_1 = __importDefault(require("../../models/BancoIdeas/generalInformation"));
const qualification_1 = __importDefault(require("../../models/BancoIdeas/qualification"));
const preInvestment_1 = __importDefault(require("../../models/BancoIdeas/preInvestment"));
/**
 * Funcion para  listar las configuraciones globales
 * @param {*} req
 */
function createIdeaAlternativeComplete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let transaction = yield connection_1.default.transaction();
        try {
            let ideaAlternative = yield (0, feature_1.FcreateIdeaAlternativeComplete)(req.body, transaction);
            transaction.commit();
            return res.status(200).send(ideaAlternative);
        }
        catch (error) {
            transaction.rollback();
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.createIdeaAlternativeComplete = createIdeaAlternativeComplete;
/**
 * Funcion para  listar las configuraciones globales
 * @param {*} req
 */
function addPertinenceQuality(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let transaction = yield connection_1.default.transaction();
        try {
            let pertinence = yield (0, feature_1.FaddPertinenceQuality)(req.body, transaction);
            transaction.commit();
            return res.status(200).send(pertinence);
        }
        catch (error) {
            transaction.rollback();
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.addPertinenceQuality = addPertinenceQuality;
/**
 * Funcion para  listar las configuraciones globales
 * @param {*} req
 */
function getPreinversion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let preInversion = yield (0, feature_1.FgetPreinversion)(req.params.id);
            return res.status(200).send(preInversion);
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.getPreinversion = getPreinversion;
const getDenomination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield denomination_1.default.findAll();
        if (data.length <= 0) {
            let den1 = { name: 'Alumnos' };
            let denCreated = yield denomination_1.default.create(den1);
            den1.name = 'Pacientes';
            denCreated = yield denomination_1.default.create(den1);
            den1.name = 'Agricultores';
            denCreated = yield denomination_1.default.create(den1);
        }
        data = yield denomination_1.default.findAll();
        res.status(200).json({
            msg: "Datos Obtenidos",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
});
exports.getDenomination = getDenomination;
const getReferencePopulation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield referencePopulation_1.default.findAll();
        if (data.length <= 0) {
            let ref = { name: 'Nacional' };
            let denCreated = yield referencePopulation_1.default.create(ref);
            ref.name = 'Departamental';
            denCreated = yield referencePopulation_1.default.create(ref);
            ref.name = 'Municipal';
            denCreated = yield referencePopulation_1.default.create(ref);
            ref.name = 'Comunal';
            denCreated = yield referencePopulation_1.default.create(ref);
        }
        data = yield referencePopulation_1.default.findAll();
        res.status(200).json({
            msg: "Datos Obtenidos",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
});
exports.getReferencePopulation = getReferencePopulation;
const getAlternative = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let idAlternative = req.params.id;
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
                    model: responsibleEntity_1.default
                },
                {
                    required: false,
                    model: qualification_1.default
                },
            ]
        });
        if (data || data.length > 0) {
            let resPopDel = yield Promise.all(data.map((alter) => __awaiter(void 0, void 0, void 0, function* () {
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
                    include: [
                        {
                            required: false,
                            model: coordinates_1.default
                        },
                    ]
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
                    alternativa.geoArea = {
                        codigo: gArea.codigo,
                        AlterId: gArea.AlterId,
                        availableTerrain: gArea.availableTerrain,
                        oneAvailableTerrain: gArea.oneAvailableTerrain,
                        investPurchase: gArea.investPurchase,
                        governmentTerrain: gArea.governmentTerrain,
                        registerGovernmentTerrain: gArea.registerGovernmentTerrain,
                        statusDescribe: gArea.statusDescribe,
                        finca: gArea.finca,
                        folio: gArea.folio,
                        libro: gArea.libro,
                        plano: gArea.plano,
                        slightIncline: gArea.slightIncline,
                        broken: gArea.broken,
                        image: gArea.image,
                        imageUrl: gArea.imageUrl,
                        description: gArea.description,
                        basicServices: gArea.basicServices,
                        descriptionBasicServices: gArea.descriptionBasicServices,
                        descriptionLocation: gArea.descriptionLocation,
                        createdAt: gArea.createdAt,
                        updatedAt: gArea.updatedAt,
                        deletedAt: gArea.deletedAt,
                    };
                    alternativa.geoArea.coordinates = [];
                }
                if ((gArea === null || gArea === void 0 ? void 0 : gArea.coordinates) || (gArea === null || gArea === void 0 ? void 0 : gArea.coordinates.length) > 0) {
                    gArea.coordinates.map((coordinate) => {
                        let coord = {
                            codigo: coordinate.codigo,
                            geoAreaId: coordinate.geoAreaId,
                            latitude: coordinate.latitude,
                            createdAt: coordinate.createdAt,
                            updatedAt: coordinate.updatedAt,
                            deletedAt: coordinate.deletedAt,
                        };
                        alternativa.geoArea.coordinates.push(coordinate);
                    });
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
                        descriptionProblem: quali.descriptionProblem,
                        descriptionProblemDescription: quali.descriptionProblemDescription,
                        generalObjective: quali.generalObjective,
                        generalObjectiveDescription: quali.generalObjectiveDescription,
                        analysisDelimitation: quali.analysisDelimitation,
                        analysisDelimitationDescription: quali.analysisDelimitationDescription,
                        terrainIdentification: quali.terrainIdentification,
                        terrainIdentificationDescription: quali.terrainIdentificationDescription,
                        legalSituation: quali.legalSituation,
                        legalSituationDescription: quali.legalSituationDescription,
                        descriptionAnalysis: quali.descriptionAnalysis,
                        descriptionAnalysisDescription: quali.descriptionAnalysisDescription,
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
                return res;
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
        res.status(200).json({
            msg: "Datos Obtenidos",
            data: datosResult,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
});
exports.getAlternative = getAlternative;
const getPertinencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let idAlternative = req.params.id;
        let alternative = yield ideaAlternative_1.default.findOne({
            where: {
                codigo: idAlternative
            }
        });
        let population = yield populationDelimitation_1.default.findOne({
            where: {
                AlterId: alternative.codigo
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
        let geograficArea = yield geographicArea_1.default.findOne({
            where: {
                AlterId: alternative.codigo
            },
            attributes: ['availableTerrain', 'oneAvailableTerrain', 'investPurchase', 'registerGovernmentTerrain', 'statusDescribe'],
        });
        let projectDes = yield projectDescription_1.default.findOne({
            where: {
                AlterId: alternative.codigo
            },
            include: [
                {
                    required: false,
                    model: executionTime_1.default
                },
            ]
        });
        let generalInformations = yield generalInformation_1.default.findOne({
            where: {
                codigo: alternative.sectionBIId
            },
            attributes: ['baseLine', 'generalObjective', 'expectedChange'],
        });
        let criterio1 = { baseLine: generalInformations.baseLine };
        let criterio2 = {
            generalObjective: generalInformations.generalObjective,
            expectedChange: generalInformations.expectedChange
        };
        let criterio3 = {
            totalPopulation: population.totalPopulation,
            gender: population.gender,
            estimateBeneficiaries: population.estimateBeneficiaries,
            preliminaryCharacterization: population.preliminaryCharacterization,
            coverage: population.coverage,
            referencePopulation: population.refPop.name,
            denomination: population.denmtion.name,
        };
        let criterio4 = {
            availableTerrain: geograficArea.availableTerrain,
            oneAvailableTerrain: geograficArea.oneAvailableTerrain,
            investPurchase: geograficArea.investPurchase,
        };
        let criterio5 = {
            registerGovernmentTerrain: geograficArea.registerGovernmentTerrain,
            statusDescribe: geograficArea.statusDescribe,
        };
        let criterio6 = {
            projectType: projectDes.projectType,
            formulationProcess: projectDes.formulationProcess,
            descriptionInterventions: projectDes.descriptionInterventions,
            complexity: projectDes.complexity,
        };
        let criterios = {
            criterio1, criterio2, criterio3, criterio4, criterio5, criterio6
        };
        res.status(200).json({
            msg: "Datos Obtenidos",
            data: criterios,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
});
exports.getPertinencia = getPertinencia;
//# sourceMappingURL=index.js.map