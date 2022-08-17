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
exports.FcreateGeographicArea = exports.FcreateProjectDescription = exports.FcreatePopulationDemilitation = exports.FcresponsableEntity = exports.FcreatePreleminaryName = exports.FcreateIdeaAlternativeComplete = exports.FgetPreinversion = void 0;
const preliminaryName_1 = __importDefault(require("../../models/BancoIdeas/preliminaryName"));
const responsibleEntity_1 = __importDefault(require("../../models/BancoIdeas/responsibleEntity"));
const populationDelimitation_1 = __importDefault(require("../../models/BancoIdeas/populationDelimitation"));
const projectDescription_1 = __importDefault(require("../../models/BancoIdeas/projectDescription"));
const executionTime_1 = __importDefault(require("../../models/BancoIdeas/executionTime"));
const geographicArea_1 = __importDefault(require("../../models/BancoIdeas/geographicArea"));
const ideaAlternative_1 = __importDefault(require("../../models/BancoIdeas/ideaAlternative"));
const coordinates_1 = __importDefault(require("../../models/BancoIdeas/coordinates"));
const referencePopulation_1 = __importDefault(require("../../models/BancoIdeas/referencePopulation"));
const denomination_1 = __importDefault(require("../../models/BancoIdeas/denomination"));
function FgetPreinversion(idAlternativa) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const proDes = yield projectDescription_1.default.findOne({ where: { AlternativeId: idAlternativa } });
            const popDel = yield populationDelimitation_1.default.findOne({ where: { AlternativeId: idAlternativa } });
            let costo = proDes.estimatedCost;
            let rangoInversion = 0;
            let resRangoInversion = '';
            //RANGO DE INVERSIÓN
            if (costo < 900000) {
                rangoInversion = 6;
                resRangoInversion = '<=900,000';
            }
            else if (costo > 900001 && costo <= 10000000) {
                rangoInversion = 8;
                resRangoInversion = '>900,001<=10,000,000';
            }
            else if (costo > 10000001 && costo <= 50000000) {
                rangoInversion = 10;
                resRangoInversion = '>10,000,001<=50,000,000';
            }
            else if (costo >= 50000001) {
                rangoInversion = 16;
                resRangoInversion = '>=50,000,001';
            }
            //ESTIMACIÓN BENEFICIARIOS 
            let benefits = popDel.estimateBeneficiaries;
            let estBenefits = 0;
            let resEstBenefits = '';
            if (benefits <= 1000) {
                estBenefits = 4.5;
                resEstBenefits = '1 <= 1,000';
            }
            else if (benefits > 1001 && benefits <= 10000) {
                estBenefits = 6;
                resEstBenefits = '>1,001 <= 10,000';
            }
            else if (benefits > 10001 && benefits <= 20000) {
                estBenefits = 7.5;
                resEstBenefits = '>10,001 <= 20,000';
            }
            else if (benefits > 20001) {
                estBenefits = 12;
                resEstBenefits = '>20,001';
            }
            //COMPLEJIDAD
            let complejidad = proDes.complexity;
            let complejidadTotal = 0;
            if (complejidad == 'Alta') {
                complejidadTotal = 12;
            }
            else if (complejidad == 'Media') {
                complejidadTotal = 11;
            }
            else if (complejidad == 'Baja') {
                complejidadTotal = 7;
            }
            let totalSuma = (rangoInversion + estBenefits + complejidadTotal);
            let total = (((rangoInversion + estBenefits + complejidadTotal) * 100) / 40);
            let etapa = '';
            if (total <= 19) {
                etapa = 'Perfil';
            }
            else if (total >= 20 && total <= 35) {
                etapa = 'Prefactibilidad';
            }
            else if (total >= 36 && total <= 100) {
                etapa = 'Factibilidad';
            }
            //RESULTADO
            let preInversion = {
                rango: {
                    valor: rangoInversion,
                    resultado: resRangoInversion
                },
                estimacion: {
                    valor: estBenefits,
                    resultado: resEstBenefits
                },
                complejidad: {
                    valor: complejidadTotal,
                    resultado: complejidad
                },
                etapa: {
                    valor: totalSuma,
                    resultado: etapa
                }
            };
            return { preInversion };
        }
        catch (error) {
            //devuelve errores al cliente
            throw `Error al ingresar Idea alternativa: ${error}`;
        }
    });
}
exports.FgetPreinversion = FgetPreinversion;
function FcreateIdeaAlternativeComplete(ideaAlt, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let ideaAlternativeCreated = yield ideaAlternative_1.default.create(ideaAlt, { transaction });
            let codigoAlternativa = ideaAlternativeCreated.codigo;
            yield FcreatePreleminaryName(ideaAlt.preName, codigoAlternativa, transaction);
            yield FcresponsableEntity(ideaAlt.resEntity, codigoAlternativa, transaction);
            yield FcreatePopulationDemilitation(ideaAlt.popDelimit, codigoAlternativa, transaction);
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
            prName.AlternativeId = idAlternativa;
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
            resEntity.AlternativeId = idAlternativa;
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
            popDemiliation.AlternativeId = idAlternativa;
            let refModel = yield referencePopulation_1.default.findAll();
            popDemiliation.referencePopulationId = refModel[0].codigo;
            let DenModel = yield denomination_1.default.findAll();
            popDemiliation.denominationId = DenModel[0].codigo;
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
            proDescription.AlternativeId = idAlternativa;
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
            geograpicArea.AlternativeId = idAlternativa;
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