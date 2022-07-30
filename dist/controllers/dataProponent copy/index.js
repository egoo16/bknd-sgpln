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
exports.postGeneralInformation = void 0;
const dataProponent_1 = __importDefault(require("../../models/BancoIdeas/dataProponent"));
const postGeneralInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const dataProponentModel = body;
        const dataIserted = yield dataProponent_1.default.create(dataProponentModel);
        res.status(201).json({
            msg: "Datos de Quien Propone Insertados Correctamente",
            dataIserted
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "No se pudo insertrar los Datos de Quien Propone",
            error
        });
    }
});
exports.postGeneralInformation = postGeneralInformation;
//# sourceMappingURL=index.js.map