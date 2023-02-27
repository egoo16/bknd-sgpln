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
exports.getAllmodalityFinancing = exports.getAllpreinvDocument = exports.getAllgeneralStudies = exports.getAllProjectFunction = exports.getAllEntities = void 0;
const entity_entity_1 = require("../../models/sinafip/entity.entity");
const generalStudies_entity_1 = require("../../models/sinafip/generalStudies.entity");
const modalityFinancing_entity_1 = require("../../models/sinafip/modalityFinancing.entity");
const preinvDocument_entity_1 = require("../../models/sinafip/preinvDocument.entity");
const projectFunction_entity_1 = require("../../models/sinafip/projectFunction.entity");
function getAllEntities(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield entity_entity_1.entity.findAll({
                order: [['name', 'ASC']]
            });
            if (data.length <= 0) {
                let ents = ['AMSA', 'AMSCLAE', 'ANADIE', 'CAMINOS', 'CDAG', 'CGC', 'CONAP', 'CONRED', 'COPEREX', 'DEFENSORIA PENAL', 'EMPORNAC', 'ENCA',
                    'EPQ', 'FODES', 'FODIGUA', 'FONDETEL', 'FONTIERRA', 'FSS', 'IGSS', 'INAB', 'INACIF', 'INAP', 'INDE', 'INFOM', 'INGUAT', 'INSIVUMEH',
                    'INTECAP', 'MAGA', 'MARN', 'MEM', 'MICUDE', 'MIDES', 'MINDEF', 'MINECO', 'MINEDUC', 'MINEX', 'MINGOB', 'MINTRAB', 'MP', 'MSPAS', 'OJ',
                    'PNC', 'PROVIAL', 'RENAP', 'RGP', 'RIC', 'SAT', 'SBS', 'SEGEPLAN', 'SENACYT', 'SEPAZ', 'SEPREM', 'SOSEP', 'UCEE', 'UDEVIPO',
                    'UNEPAR', 'UNIDAD DE CONCESIONES', 'USAC', 'ZOLIC',];
                let resEnt = yield Promise.all(ents.map((ent) => __awaiter(this, void 0, void 0, function* () {
                    let enti = { name: ent };
                    let res = yield entity_entity_1.entity.create(enti);
                    return res;
                })));
                data = yield entity_entity_1.entity.findAll({
                    order: [['name', 'ASC']]
                });
                return res.status(200).send(data);
            }
            return res.status(200).send(data);
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.getAllEntities = getAllEntities;
function getAllProjectFunction(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield projectFunction_entity_1.projectFunction.findAll({
                order: [['name', 'ASC']]
            });
            if (data.length <= 0) {
                let ents = ['AGUA Y SANEAMIENTO', 'SALUD Y ASISTENCIASOCIAL', 'EDUCACION', 'MEDIO AMBIENTE', 'AGROPECUARIO', 'VIVIENDA', 'TRABAJO Y PREVISION SOCIAL',
                    'ENERGIA', 'TRANSPORTE', 'SEGURIDAD INTERNA', 'DESARROLLO URBANO Y RURAL', 'INDUSTRIA Y COMERCIO', 'CIENCIA Y TECNOLOGIA', 'JUDICIAL', 'ADMINISTRACION FISCAL TURISMO',
                    'SERVICIOS GENERALES', 'CULTURA Y DEPORTES', 'FINANCIERAS Y SEGUROS',];
                let resEnt = yield Promise.all(ents.map((ent) => __awaiter(this, void 0, void 0, function* () {
                    let enti = { name: ent };
                    let res = yield projectFunction_entity_1.projectFunction.create(enti);
                    return res;
                })));
                data = yield projectFunction_entity_1.projectFunction.findAll({
                    order: [['name', 'ASC']]
                });
                return res.status(200).send(data);
            }
            return res.status(200).send(data);
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.getAllProjectFunction = getAllProjectFunction;
function getAllgeneralStudies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield generalStudies_entity_1.generalStudies.findAll({
                order: [['name', 'ASC']]
            });
            if (data.length <= 0) {
                let ents = ['AMBIENTAL', 'ECONÓMICO', 'SOCIAL',];
                let resEnt = yield Promise.all(ents.map((ent) => __awaiter(this, void 0, void 0, function* () {
                    let enti = { name: ent };
                    let res = yield generalStudies_entity_1.generalStudies.create(enti);
                    return res;
                })));
                data = yield generalStudies_entity_1.generalStudies.findAll({
                    order: [['name', 'ASC']]
                });
                return res.status(200).send(data);
            }
            return res.status(200).send(data);
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.getAllgeneralStudies = getAllgeneralStudies;
function getAllpreinvDocument(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield preinvDocument_entity_1.preinvDocument.findAll({
                order: [['name', 'ASC']]
            });
            if (data.length <= 0) {
                let ents = ['PERFIL', 'PREFACTIBILIDAD', 'FACTIBILIDAD', 'MEGAPROYECTO', 'DE IMPACTO', 'ESTRUCTURAL',
                    'DISEÑO FINAL DE INGENIERIA', 'DISEÑO FINAL DE ARQUITECTURA', 'COMPLEMENTARIOS (CUYA FACTIBILIDAD HAYA SIDO DEMOSTRADA)',];
                let resEnt = yield Promise.all(ents.map((ent) => __awaiter(this, void 0, void 0, function* () {
                    let enti = { name: ent };
                    let res = yield preinvDocument_entity_1.preinvDocument.create(enti);
                    return res;
                })));
                data = yield preinvDocument_entity_1.preinvDocument.findAll({
                    order: [['name', 'ASC']]
                });
                return res.status(200).send(data);
            }
            return res.status(200).send(data);
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.getAllpreinvDocument = getAllpreinvDocument;
function getAllmodalityFinancing(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield modalityFinancing_entity_1.modalityFinancing.findAll({
                order: [['name', 'ASC']]
            });
            if (data.length <= 0) {
                let ents = ['APORTACIONES DEL ESTADO',
                    'OTROS MECANISMOS DE FINANCIAMIENTO',
                    'INGRESOS CORRIENTES',
                    'INGRESOS TRIBUTARIOS IVA PAZ',
                    'INGRESOS ORDINARIOS DE APORTE CONSTITUCIONAL',
                    'INGRESOS PROPIOS',
                    'CRÉDITO EXTERNO – PRESTAMOS EXTERNOS',
                    'DONACIONES EXTERNAS',
                    'PRESTAMO TRASFERENCIA NO REEMBOLSABLE',
                    'NO SE CUENTA CON FUENTE DE FINANCIAMIENTO',
                ];
                let resEnt = yield Promise.all(ents.map((ent) => __awaiter(this, void 0, void 0, function* () {
                    let enti = { name: ent };
                    let res = yield modalityFinancing_entity_1.modalityFinancing.create(enti);
                    return res;
                })));
                data = yield modalityFinancing_entity_1.modalityFinancing.findAll({
                    order: [['name', 'ASC']]
                });
                return res.status(200).send(data);
            }
            return res.status(200).send(data);
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.getAllmodalityFinancing = getAllmodalityFinancing;
