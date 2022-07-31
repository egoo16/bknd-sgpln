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
const generalInformation_1 = __importDefault(require("../../models/BancoIdeas/generalInformation"));
const postGeneralInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const informationModel = body;
        const informationIsert = yield generalInformation_1.default.create(informationModel);
        res.status(201).json({
            msg: "ideaIsertada Correctamente",
            informationIsert,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "No se pudo insertrar la Información General",
            error
        });
    }
});
exports.postGeneralInformation = postGeneralInformation;
//# sourceMappingURL=index.js.map