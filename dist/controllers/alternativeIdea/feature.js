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
exports.FcreateGeographicArea = exports.FcreateProjectDescription = exports.FcreatePopulationDemilitation = exports.FcresponsableEntity = exports.FcreatePreleminaryName = void 0;
const preliminaryName_1 = __importDefault(require("../../models/BancoIdeas/preliminaryName"));
const responsibleEntity_1 = __importDefault(require("../../models/BancoIdeas/responsibleEntity"));
const populationDelimitation_1 = __importDefault(require("../../models/BancoIdeas/populationDelimitation"));
const projectDescription_1 = __importDefault(require("../../models/BancoIdeas/projectDescription"));
const executionTime_1 = __importDefault(require("../../models/BancoIdeas/executionTime"));
const geographicArea_1 = __importDefault(require("../../models/BancoIdeas/geographicArea"));
function FcreatePreleminaryName(prName, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield preliminaryName_1.default.create(prName, { transaction });
            return { message: `Nombre preliminar ingresado correctamente` };
        }
        catch (error) {
            //devuelve errores al cliente
            throw `Error al ingresar nombre preliminar de proyecto: ${error}`;
        }
    });
}
exports.FcreatePreleminaryName = FcreatePreleminaryName;
function FcresponsableEntity(resEntity, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield responsibleEntity_1.default.create(resEntity, { transaction });
            return { message: `Entidad responsable ingresada correctamente` };
        }
        catch (error) {
            //devuelve errores al cliente
            throw `Error al ingresar entidad responsable: ${error}`;
        }
    });
}
exports.FcresponsableEntity = FcresponsableEntity;
function FcreatePopulationDemilitation(popDemiliation, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield populationDelimitation_1.default.create(popDemiliation, { transaction });
            return { message: `Delimitación preliminar ingresada correctamente` };
        }
        catch (error) {
            //devuelve errores al cliente
            throw `Error al ingresar delimitación preliminar: ${error}`;
        }
    });
}
exports.FcreatePopulationDemilitation = FcreatePopulationDemilitation;
function FcreateProjectDescription(proDescription, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let proDesctiptionNew = yield projectDescription_1.default.create(proDescription, { transaction });
            for (const exTime of proDescription.executionTimes) {
                exTime.projectDescriptionId = proDesctiptionNew.codigo;
                yield executionTime_1.default.create(exTime, { transaction });
            }
            yield FcreateGeographicArea(proDescription.geographicArea, transaction);
            return { message: `Descripción preliminar de la idea proyecto ingresada correctamente` };
        }
        catch (error) {
            //devuelve errores al cliente
            throw `Error al ingresar descripción preliminar de la idea proyecto preliminar: ${error}`;
        }
    });
}
exports.FcreateProjectDescription = FcreateProjectDescription;
function FcreateGeographicArea(geograpicArea, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield geographicArea_1.default.create(geograpicArea, { transaction });
            return { message: `Area geografica del proyecto ingresada correctamente` };
        }
        catch (error) {
            //devuelve errores al cliente
            throw `Error al ingresar area geografica del proyecto: ${error}`;
        }
    });
}
exports.FcreateGeographicArea = FcreateGeographicArea;
//# sourceMappingURL=feature.js.map