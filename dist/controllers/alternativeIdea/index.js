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
exports.getPertinencia = exports.getAlternative = exports.getReferencePopulation = exports.getDenomination = exports.getPreinversion = exports.createIdeaAlternativeComplete = void 0;
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
const executionTime_1 = __importDefault(require("../../models/BancoIdeas/executionTime"));
const generalInformation_1 = __importDefault(require("../../models/BancoIdeas/generalInformation"));
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
    let transaction = yield connection_1.default.transaction();
    try {
        let data = yield denomination_1.default.findAll();
        if (data.length <= 0) {
            let den1 = { name: 'Alumnos' };
            let denCreated = yield denomination_1.default.create(den1, { transaction });
            den1.name = 'Pacientes';
            denCreated = yield denomination_1.default.create(den1, { transaction });
            den1.name = 'Agricultores';
            denCreated = yield denomination_1.default.create(den1, { transaction });
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
    let transaction = yield connection_1.default.transaction();
    try {
        let data = yield referencePopulation_1.default.findAll();
        if (data.length <= 0) {
            let ref = { name: 'Nacional' };
            let denCreated = yield referencePopulation_1.default.create(ref, { transaction });
            ref.name = 'Departamental';
            denCreated = yield referencePopulation_1.default.create(ref, { transaction });
            ref.name = 'Municipal';
            denCreated = yield referencePopulation_1.default.create(ref, { transaction });
            ref.name = 'Comunal';
            denCreated = yield referencePopulation_1.default.create(ref, { transaction });
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
    let transaction = yield connection_1.default.transaction();
    try {
        let idAlternative = req.params.id;
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
                    model: populationDelimitation_1.default,
                    //         include: [
                    //             {
                    //                 required: false,
                    //                 model: referencePopulation
                    //             },
                    //             {
                    //                 required: false,
                    //                 model: denomination
                    //             },
                    //         ]
                },
                //     {
                //         required: false,
                //         model: geographicArea,
                //         include: [
                //             {
                //                 required: false,
                //                 model: coordinates
                //             },
                //         ]
                //     },
                //     {
                //         required: false,
                //         model: projectDescription,
                //         include: [
                //             {
                //                 required: false,
                //                 model: executionTime
                //             },
                //         ]
                //     },
                //     {
                //         required: false,
                //         model: qualification
                //     },
            ]
        });
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
exports.getAlternative = getAlternative;
const getPertinencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield connection_1.default.transaction();
    try {
        let idAlternative = req.params.id;
        let alternative = yield ideaAlternative_1.default.findOne({
            where: {
                codigo: idAlternative
            },
            include: [
                {
                    required: false,
                    model: populationDelimitation_1.default,
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
                },
                {
                    required: false,
                    model: geographicArea_1.default,
                    attributes: ['availableTerrain', 'oneAvailableTerrain', 'investPurchase', 'registerGovernmentTerrain', 'statusDescribe'],
                },
                {
                    required: false,
                    model: projectDescription_1.default,
                    include: [
                        {
                            required: false,
                            model: executionTime_1.default
                        },
                    ]
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
            totalPopulation: alternative.popDelimit.totalPopulation,
            gender: alternative.popDelimit.gender,
            estimateBeneficiaries: alternative.popDelimit.estimateBeneficiaries,
            preliminaryCharacterization: alternative.popDelimit.preliminaryCharacterization,
            coverage: alternative.popDelimit.coverage,
            referencePopulation: alternative.popDelimit.refPop.name,
            denomination: alternative.popDelimit.denmtion.name,
        };
        let criterio4 = {
            availableTerrain: alternative.geoArea.availableTerrain,
            oneAvailableTerrain: alternative.geoArea.oneAvailableTerrain,
            investPurchase: alternative.geoArea.investPurchase,
        };
        let criterio5 = {
            registerGovernmentTerrain: alternative.geoArea.registerGovernmentTerrain,
            statusDescribe: alternative.geoArea.statusDescribe,
        };
        let criterio6 = {
            projectType: alternative.projDesc.projectType,
            formulationProcess: alternative.projDesc.formulationProcess,
            descriptionInterventions: alternative.projDesc.descriptionInterventions,
            complexity: alternative.projDesc.complexity,
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