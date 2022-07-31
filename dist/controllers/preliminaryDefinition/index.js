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
exports.postPreliminaryDefinition = void 0;
const possibleAlternatives_1 = __importDefault(require("../../models/BancoIdeas/possibleAlternatives"));
const preliminaryDefinition_1 = __importDefault(require("../../models/BancoIdeas/preliminaryDefinition"));
const postPreliminaryDefinition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const insertModel = body;
        const dataIserted = yield preliminaryDefinition_1.default.create(insertModel);
        const alternatives = body.alternatives;
        let resAlternatives = yield Promise.all(alternatives.map((alternative) => __awaiter(void 0, void 0, void 0, function* () {
            alternative.preliminaryDefinitionId = dataIserted.codigo;
            let res = yield possibleAlternatives_1.default.create(alternative);
            return res;
        })));
        res.status(201).json({
            msg: "Definicion Preliminar Insertados Correctamente",
            dataIserted
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "No se pudo insertrar Definicion Preliminar",
            error
        });
    }
});
exports.postPreliminaryDefinition = postPreliminaryDefinition;
//# sourceMappingURL=index.js.map