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
exports.updateIdeaAlternativeComplete = exports.getPertinencia = exports.getAlternative = exports.getReferencePopulation = exports.getDenomination = exports.getPreinversion = exports.addPertinenceQuality = exports.createIdeaAlternativeComplete = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const BancoIdeas_1 = require("../../models/BancoIdeas");
const datageo_model_1 = __importDefault(require("../../models/BancoIdeas/datageo.model"));
const feature_1 = require("./feature");
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
            console.log(req.body);
            let matrixPertinence = Object.assign({}, req.body);
            matrixPertinence.terreno = JSON.stringify(req.body.terreno);
            let pertinence = yield (0, feature_1.FaddPertinenceQuality)(matrixPertinence, transaction, req.user);
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
        let data = yield BancoIdeas_1.denomination.findAll();
        if (data.length <= 0) {
            let den1 = { name: 'Alumnos' };
            let denCreated = yield BancoIdeas_1.denomination.create(den1);
            den1.name = 'Pacientes';
            denCreated = yield BancoIdeas_1.denomination.create(den1);
            den1.name = 'Agricultores';
            denCreated = yield BancoIdeas_1.denomination.create(den1);
        }
        data = yield BancoIdeas_1.denomination.findAll();
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
        let data = yield BancoIdeas_1.referencePopulation.findAll();
        if (data.length <= 0) {
            let ref = { name: 'Nacional' };
            let denCreated = yield BancoIdeas_1.referencePopulation.create(ref);
            ref.name = 'Departamental';
            denCreated = yield BancoIdeas_1.referencePopulation.create(ref);
            ref.name = 'Municipal';
            denCreated = yield BancoIdeas_1.referencePopulation.create(ref);
            ref.name = 'Comunal';
            denCreated = yield BancoIdeas_1.referencePopulation.create(ref);
        }
        data = yield BancoIdeas_1.referencePopulation.findAll();
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
        datosResult = yield (0, feature_1.getAlternatives)(idAlternative);
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
        let alternative = yield BancoIdeas_1.ideaAlternative.findOne({
            where: {
                codigo: idAlternative
            }
        });
        let population = yield BancoIdeas_1.populationDelimitation.findOne({
            where: {
                AlterId: alternative.codigo
            },
            include: [
                {
                    required: false,
                    model: BancoIdeas_1.referencePopulation
                },
                {
                    required: false,
                    model: BancoIdeas_1.denomination
                },
            ]
        });
        let geograficArea = yield BancoIdeas_1.geographicArea.findOne({
            where: {
                AlterId: alternative.codigo
            },
        });
        let terrains;
        if (geograficArea) {
            terrains = yield datageo_model_1.default.findAll({
                where: {
                    geoAreaId: geograficArea.codigo
                },
            });
        }
        let projectDes = yield BancoIdeas_1.projectDescription.findOne({
            where: {
                AlterId: alternative.codigo
            },
            include: [
                {
                    required: false,
                    model: BancoIdeas_1.executionTime
                },
            ]
        });
        let generalInformations = yield BancoIdeas_1.generalInformation.findOne({
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
        //TODO: Agregar Criterios
        let criterio4 = {
            availableTerrain: geograficArea.availableTerrain,
            oneAvailableTerrain: geograficArea.oneAvailableTerrain,
            investPurchase: geograficArea.investPurchase,
        };
        let criterio5 = {
            terrenos: terrains
        };
        // let criterio5 = {
        //     registerGovernmentTerrain: geograficArea.registerGovernmentTerrain,
        //     statusDescribe: geograficArea.statusDescribe,
        // };
        let criterio6 = {
            projectType: projectDes.projectType,
            formulationProcess: projectDes.formulationProcess,
            descriptionInterventions: projectDes.descriptionInterventions,
            complexity: projectDes.complexity,
        };
        let criterios = {
            // TODO: Agregar Criterios 4 y 5
            criterio1, criterio2, criterio3, criterio4, criterio5, criterio6
            // criterio1, criterio2, criterio3, criterio4, criterio6
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
/**
 * Funcion para  actualizar Alternativa
 * @param {*} req
 */
function updateIdeaAlternativeComplete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let transaction;
        try {
            let ideaAlternative;
            transaction = yield connection_1.default.transaction();
            ideaAlternative = yield (0, feature_1.fupdateIdeaAlternativeComplete)(req.body, transaction);
            // await transaction.commit()
            return res.status(200).send(ideaAlternative);
        }
        catch (error) {
            yield transaction.rollback();
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.updateIdeaAlternativeComplete = updateIdeaAlternativeComplete;
