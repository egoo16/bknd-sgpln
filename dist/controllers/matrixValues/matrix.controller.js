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
exports.getAdmissionMatrixValues = void 0;
const models_1 = require("../../models");
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
            return res.status(200).send(data);
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.getAdmissionMatrixValues = getAdmissionMatrixValues;
