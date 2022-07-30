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
const idea_1 = __importDefault(require("../../models/BancoIdeas/idea"));
const sectionBi_1 = __importDefault(require("../../models/BancoIdeas/sectionBi"));
const generalInformation_1 = __importDefault(require("../../models/BancoIdeas/generalInformation"));
const postGeneralInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const now = new Date();
        const milisegundos = now.getMilliseconds();
        const nameIdea = "idea-" + milisegundos;
        const ideaModel = {
            name: nameIdea,
        };
        const ideaInserted = yield idea_1.default.create(ideaModel);
        const sectionModel = {
            name: nameIdea,
            IdeaId: ideaInserted.codigo,
        };
        const sectionIserted = yield sectionBi_1.default.create(sectionModel);
        const informationModel = body;
        informationModel.sectionBI = sectionIserted.codigo;
        const informationIsert = yield generalInformation_1.default.create(informationModel);
        res.status(201).json({
            msg: "ideaIsertada Correctamente",
            ideaInserted,
            sectionIserted,
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