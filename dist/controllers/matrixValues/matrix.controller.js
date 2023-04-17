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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelevanceMatrixValues = exports.getAdmissionMatrixValues = void 0;
const models_1 = require("../../models");
const relevanceConfig_1 = require("../../models/matrixModels/relevanceConfig");
function getAdmissionMatrixValues(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield models_1.admisionConfig.findAll();
            if (data.length <= 0) {
                let config = {
                    beneficiariestMaxValue: 10,
                    costMaxValue: 10,
                    goalsMaxValue: 20,
                    scheduleMaxValue: 10,
                    statementMaxValue: 20,
                    tdrMaxValue: 30
                };
                let resConfig = yield models_1.admisionConfig.create(config);
                data = yield models_1.admisionConfig.findAll();
                return res.status(200).send(data[0]);
            }
            return res.status(200).send(data[0]);
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.getAdmissionMatrixValues = getAdmissionMatrixValues;
function getRelevanceMatrixValues(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let investmentV = yield relevanceConfig_1.relevanceInvestment.findAll();
            let beneficiariesV = yield relevanceConfig_1.relevanceBeneficiaries.findAll();
            let complexyV = yield relevanceConfig_1.relevanceComplexy.findAll();
            let stageV = yield relevanceConfig_1.relevanceStage.findAll();
            if (investmentV.length <= 0) {
                let config = [
                    { rangeMin: 0, rangeMax: 300000, rangeValue: 6 },
                    { rangeMin: 300001, rangeMax: 500000, rangeValue: 12 },
                    { rangeMin: 500001, rangeMax: 699999, rangeValue: 18 },
                    { rangeMin: 700000, rangeMax: 900000, rangeValue: 24 },
                    { rangeMin: 900001, rangeMax: 10000000, rangeValue: 30 },
                    { rangeMin: 10000001, rangeMax: 19000000, rangeValue: 38 },
                    { rangeMin: 19000001, rangeMax: 30000000, rangeValue: 46 },
                    { rangeMin: 30000001, rangeMax: 40000000, rangeValue: 54 },
                    { rangeMin: 40000001, rangeMax: 50000000, rangeValue: 62 },
                    { rangeMin: 50000001, rangeMax: 50000001, rangeValue: 100 },
                ];
                let resConfig = yield relevanceConfig_1.relevanceInvestment.bulkCreate(config).then(function () {
                    console.log('resConfig created');
                }).catch(function (err) {
                    console.error(err);
                });
                investmentV = yield relevanceConfig_1.relevanceInvestment.findAll();
            }
            if (beneficiariesV.length <= 0) {
                let config = [
                    { rangeMin: 1, rangeMax: 1000, rangeValue: 20 },
                    { rangeMin: 1001, rangeMax: 10000, rangeValue: 40 },
                    { rangeMin: 10001, rangeMax: 20000, rangeValue: 60 },
                    { rangeMin: 20001, rangeMax: 50000, rangeValue: 80 },
                    { rangeMin: 50001, rangeMax: 50001, rangeValue: 100 },
                ];
                let resConfig = yield relevanceConfig_1.relevanceBeneficiaries.bulkCreate(config).then(function () {
                    console.log('resConfig created');
                }).catch(function (err) {
                    console.error(err);
                });
                beneficiariesV = yield relevanceConfig_1.relevanceBeneficiaries.findAll();
            }
            if (complexyV.length <= 0) {
                let config = [
                    { name: 'ALTA', rangeValue: 100 },
                    { name: 'MEDIA', rangeValue: 67 },
                    { name: 'BAJA', rangeValue: 34 },
                ];
                let resConfig = yield relevanceConfig_1.relevanceComplexy.bulkCreate(config).then(function () {
                    console.log('resConfig created');
                }).catch(function (err) {
                    console.error(err);
                });
                complexyV = yield relevanceConfig_1.relevanceComplexy.findAll();
            }
            if (stageV.length <= 0) {
                let config = [
                    { rangeMin: 0, rangeMax: 40, suggestedStage: 'PERFIL' },
                    { rangeMin: 41, rangeMax: 69, suggestedStage: 'PREFACTIBILIDAD' },
                    { rangeMin: 70, rangeMax: 100, suggestedStage: 'FACTIBILIDAD' },
                ];
                let resConfig = yield relevanceConfig_1.relevanceStage.bulkCreate(config).then(function () {
                    console.log('resConfig created');
                }).catch(function (err) {
                    console.error(err);
                });
                stageV = yield relevanceConfig_1.relevanceStage.findAll();
            }
            return res.status(200).send({
                investmentValues: investmentV,
                beneficiaresValues: beneficiariesV,
                complexyValues: complexyV,
                stageValues: stageV
            });
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.getRelevanceMatrixValues = getRelevanceMatrixValues;
