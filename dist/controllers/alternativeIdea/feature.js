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
exports.FcreateGeographicArea = exports.FcreateProjectDescription = exports.FcreatePopulationDemilitation = exports.FcresponsableEntity = exports.FcreatePreleminaryName = exports.FcreateIdeaAlternativeComplete = void 0;
const preliminaryName_1 = __importDefault(require("../../models/BancoIdeas/preliminaryName"));
const responsibleEntity_1 = __importDefault(require("../../models/BancoIdeas/responsibleEntity"));
const populationDelimitation_1 = __importDefault(require("../../models/BancoIdeas/populationDelimitation"));
const projectDescription_1 = __importDefault(require("../../models/BancoIdeas/projectDescription"));
const executionTime_1 = __importDefault(require("../../models/BancoIdeas/executionTime"));
const geographicArea_1 = __importDefault(require("../../models/BancoIdeas/geographicArea"));
const ideaAlternative_1 = __importDefault(require("../../models/BancoIdeas/ideaAlternative"));
const coordinates_1 = __importDefault(require("../../models/BancoIdeas/coordinates"));
function FcreateIdeaAlternativeComplete(ideaAlt, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let ideaAlternativeCreated = yield ideaAlternative_1.default.create(ideaAlt, { transaction });
            let codigoAlternativa = ideaAlternativeCreated.codigo;
            yield FcreatePreleminaryName(ideaAlt.preliminaryName, codigoAlternativa, transaction);
            yield FcresponsableEntity(ideaAlt.responsibleEntity, codigoAlternativa, transaction);
            yield FcreatePopulationDemilitation(ideaAlt.populationDelimitation, codigoAlternativa, transaction);
            yield FcreateGeographicArea(ideaAlt.geographicArea, codigoAlternativa, transaction);
            yield FcreateProjectDescription(ideaAlt.projectDescription, codigoAlternativa, transaction);
            return { message: `Idea alternativa creada correctamente` };
        }
        catch (error) {
            //devuelve errores al cliente
            throw `Error al ingresar Idea alternativa: ${error}`;
        }
    });
}
exports.FcreateIdeaAlternativeComplete = FcreateIdeaAlternativeComplete;
function FcreatePreleminaryName(prName, idAlternativa, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            prName.ideaAlternativeId = idAlternativa;
            let preliminaryNameCreated = yield preliminaryName_1.default.create(prName, { transaction });
            return { preliminaryNameCreated, message: `Nombre preliminar ingresado correctamente` };
        }
        catch (error) {
            //devuelve errores al cliente
            throw `Error al ingresar nombre preliminar de proyecto: ${error}`;
        }
    });
}
exports.FcreatePreleminaryName = FcreatePreleminaryName;
function FcresponsableEntity(resEntity, idAlternativa, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            resEntity.ideaAlternativeId = idAlternativa;
            let responsableEntityCreated = yield responsibleEntity_1.default.create(resEntity, { transaction });
            return { responsableEntityCreated, message: `Entidad responsable ingresada correctamente` };
        }
        catch (error) {
            //devuelve errores al cliente
            throw `Error al ingresar entidad responsable: ${error}`;
        }
    });
}
exports.FcresponsableEntity = FcresponsableEntity;
function FcreatePopulationDemilitation(popDemiliation, idAlternativa, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            popDemiliation.ideaAlternativeId = idAlternativa;
            let populationDelimitationCreated = yield populationDelimitation_1.default.create(popDemiliation, { transaction });
            return { populationDelimitationCreated, message: `Delimitación preliminar ingresada correctamente` };
        }
        catch (error) {
            //devuelve errores al cliente
            throw `Error al ingresar delimitación preliminar: ${error}`;
        }
    });
}
exports.FcreatePopulationDemilitation = FcreatePopulationDemilitation;
function FcreateProjectDescription(proDescription, idAlternativa, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            proDescription.ideaAlternativeId = idAlternativa;
            let proDesctiptionCreated = yield projectDescription_1.default.create(proDescription, { transaction });
            proDescription.executionTime.projectDescriptionId = proDesctiptionCreated.codigo;
            yield executionTime_1.default.create(proDescription.executionTime, { transaction });
            return { proDesctiptionCreated, message: `Descripción preliminar de la idea proyecto ingresada correctamente` };
        }
        catch (error) {
            //devuelve errores al cliente
            throw `Error al ingresar descripción preliminar de la idea proyecto preliminar: ${error}`;
        }
    });
}
exports.FcreateProjectDescription = FcreateProjectDescription;
function FcreateGeographicArea(geograpicArea, idAlternativa, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            geograpicArea.ideaAlternativeId = idAlternativa;
            let geographicAreaCreated = yield geographicArea_1.default.create(geograpicArea, { transaction });
            for (let coordinate of geograpicArea.coordinates) {
                coordinate.geographicAreaId = geographicAreaCreated.codigo;
                yield coordinates_1.default.create(coordinate, { transaction });
            }
            return { geographicAreaCreated, message: `Area geografica del proyecto ingresada correctamente` };
        }
        catch (error) {
            //devuelve errores al cliente
            throw `Error al ingresar area geografica del proyecto: ${error}`;
        }
    });
}
exports.FcreateGeographicArea = FcreateGeographicArea;
//# sourceMappingURL=feature.js.map