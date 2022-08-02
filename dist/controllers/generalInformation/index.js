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
exports.getGeneralInformation = exports.postGeneralInformation = void 0;
const generalInformation_1 = __importDefault(require("../../models/BancoIdeas/generalInformation"));
const connection_1 = __importDefault(require("../../db/connection"));
const postGeneralInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let transaction = yield connection_1.default.transaction();
    try {
        const { body } = req;
        const informationModel = body;
        const correlative = yield generalInformation_1.default.max("correlation");
        if (correlative) {
            informationModel.correlation = parseInt(correlative, 10) + 1;
        }
        else {
            informationModel.correlation = 1;
        }
        const informationIsert = yield generalInformation_1.default.create(informationModel, {
            transaction,
        });
        yield transaction.commit();
        res.status(201).json({
            msg: "ideaIsertada Correctamente",
            informationModel,
            informationIsert,
            correlative,
        });
    }
    catch (error) {
        transaction.rollback();
        res.status(500).json({
            msg: "No se pudo insertrar la Información General",
            error,
        });
    }
});
exports.postGeneralInformation = postGeneralInformation;
const getGeneralInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const generalInformations = yield generalInformation_1.default.findAll();
        res.status(201).json({
            msg: "Datos Obtenidos",
            generalInformations,
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
//# sourceMappingURL=index.js.map