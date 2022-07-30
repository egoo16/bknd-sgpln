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
exports.postProblemDefinition = void 0;
const possibleCauses_1 = __importDefault(require("../../models/BancoIdeas/possibleCauses"));
const possibleEffects_1 = __importDefault(require("../../models/BancoIdeas/possibleEffects"));
const problemDefinition_1 = __importDefault(require("../../models/BancoIdeas/problemDefinition"));
const postProblemDefinition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const insertModel = body;
        const dataIserted = yield problemDefinition_1.default.create(insertModel);
        const effects = body.effects;
        let resEffects = yield Promise.all(effects.map((effect) => __awaiter(void 0, void 0, void 0, function* () {
            effect.problemDefinitionId = dataIserted.codigo;
            let res = yield possibleEffects_1.default.create(effect);
            return res;
        })));
        const causes = body.causes;
        let resCauses = yield Promise.all(causes.map((cause) => __awaiter(void 0, void 0, void 0, function* () {
            cause.problemDefinitionId = dataIserted.codigo;
            let res = yield possibleCauses_1.default.create(cause);
            return res;
        })));
        res.status(201).json({
            msg: "Definicion de Problemas Insertados Correctamente",
            dataIserted
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "No se pudo insertrar Definicion de Problemas",
            error
        });
    }
});
exports.postProblemDefinition = postProblemDefinition;
//# sourceMappingURL=index.js.map