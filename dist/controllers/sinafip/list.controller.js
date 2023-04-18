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
exports.getAdvisedEntities = exports.updateModalityFinancing = exports.deleteModalityFinancing = exports.createModalityFinancing = exports.getAllmodalityFinancing = exports.updateReferencePopulation = exports.deleteReferencePopulation = exports.createReferencePopulation = exports.getReferencePopulation = exports.updateDenomination = exports.deleteDenomination = exports.createDenomination = exports.getDenomination = exports.getAllpreinvDocument = exports.getAllgeneralStudies = exports.getAllProjectFunction = exports.getAllEntities = void 0;
const BancoIdeas_1 = require("../../models/BancoIdeas");
const advisedEntity_entity_1 = __importDefault(require("../../models/seguimiento/advisedEntity.entity"));
const subSectorization_entity_1 = __importDefault(require("../../models/seguimiento/subSectorization.entity"));
const entity_entity_1 = require("../../models/sinafip/entity.entity");
const generalStudies_entity_1 = require("../../models/sinafip/generalStudies.entity");
const modalityFinancing_entity_1 = require("../../models/sinafip/modalityFinancing.entity");
const preinvDocument_entity_1 = require("../../models/sinafip/preinvDocument.entity");
const projectFunction_entity_1 = require("../../models/sinafip/projectFunction.entity");
const advisedEnt_1 = require("./advisedEnt");
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
const getDenomination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield BancoIdeas_1.denomination.findAll();
        if (data.length <= 0) {
            let den1 = { name: 'Alumnos' };
            let denCreated = yield BancoIdeas_1.denomination.create(den1);
            den1.name = 'Pacientes';
            denCreated = yield BancoIdeas_1.denomination.create(den1);
            den1.name = 'Agricultores';
            denCreated = yield BancoIdeas_1.denomination.create(den1);
        }
        data = yield BancoIdeas_1.denomination.findAll();
        res.status(200).json({
            msg: "Datos Obtenidos",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
});
exports.getDenomination = getDenomination;
const createDenomination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.name) {
            const name = req.body.name;
            let denCreated = yield BancoIdeas_1.denomination.create({ name });
            if (denCreated) {
                res.status(200).json({
                    msg: "Datos Creados",
                    data: denCreated,
                });
            }
        }
        else {
            throw `Error al crear Denominacion`;
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
});
exports.createDenomination = createDenomination;
const deleteDenomination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id) {
            const denominationToDelete = yield BancoIdeas_1.denomination.findOne({ where: { codigo: req.params.id } });
            if (denominationToDelete) {
                const codigo = req.params.id;
                let denCreated = yield BancoIdeas_1.denomination.destroy({
                    where: {
                        codigo: denominationToDelete.codigo
                    }
                });
                res.status(200).json({
                    msg: "Datos Eliminados",
                    data: denominationToDelete
                });
            }
            else {
                throw `No se encontró el registro`;
            }
        }
        else {
            throw `Error al eliminar Denominacion`;
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
});
exports.deleteDenomination = deleteDenomination;
const updateDenomination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.name && req.params.id) {
            const name = req.body.name;
            const codigo = req.params.id;
            const denominationToUpdate = yield BancoIdeas_1.denomination.findOne({ where: { codigo: req.params.id } });
            if (denominationToUpdate) {
                let denCreated = yield BancoIdeas_1.denomination.update({ name }, {
                    where: {
                        codigo
                    }
                });
                const denominationToUpdated = yield BancoIdeas_1.denomination.findOne({ where: { codigo: req.params.id } });
                if (denCreated) {
                    res.status(200).json({
                        msg: "Datos Actualizados",
                        data: denominationToUpdated
                    });
                }
            }
            else {
                throw `No se encontró el registro`;
            }
        }
        else {
            throw `Error al crear Denominacion`;
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
});
exports.updateDenomination = updateDenomination;
const getReferencePopulation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield BancoIdeas_1.referencePopulation.findAll();
        if (data.length <= 0) {
            let ref = { name: 'Nacional' };
            let denCreated = yield BancoIdeas_1.referencePopulation.create(ref);
            ref.name = 'Departamental';
            denCreated = yield BancoIdeas_1.referencePopulation.create(ref);
            ref.name = 'Municipal';
            denCreated = yield BancoIdeas_1.referencePopulation.create(ref);
            ref.name = 'Comunal';
            denCreated = yield BancoIdeas_1.referencePopulation.create(ref);
        }
        data = yield BancoIdeas_1.referencePopulation.findAll();
        res.status(200).json({
            msg: "Datos Obtenidos",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
});
exports.getReferencePopulation = getReferencePopulation;
const createReferencePopulation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.name) {
            const name = req.body.name;
            let denCreated = yield BancoIdeas_1.referencePopulation.create({ name });
            if (denCreated) {
                res.status(200).json({
                    msg: "Datos Created",
                    data: denCreated,
                });
            }
        }
        else {
            throw `Error al crear Poblacion de Referencia`;
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
});
exports.createReferencePopulation = createReferencePopulation;
const deleteReferencePopulation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id) {
            const refToDelete = yield BancoIdeas_1.referencePopulation.findOne({ where: { codigo: req.params.id } });
            if (refToDelete) {
                const codigo = req.params.id;
                let denCreated = yield BancoIdeas_1.referencePopulation.destroy({
                    where: {
                        codigo
                    }
                });
                res.status(200).json({
                    msg: "Datos Eliminados",
                    data: refToDelete
                });
            }
            else {
                throw `No se encontró el registro`;
            }
        }
        else {
            throw `Error al eliminar Poblacion de Referencia`;
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
});
exports.deleteReferencePopulation = deleteReferencePopulation;
const updateReferencePopulation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.name && req.params.id) {
            const name = req.body.name;
            const codigo = req.params.id;
            const refToUpdate = yield BancoIdeas_1.referencePopulation.findOne({ where: { codigo: req.params.id } });
            if (refToUpdate) {
                let denCreated = yield BancoIdeas_1.referencePopulation.update({ name }, {
                    where: {
                        codigo
                    }
                });
                const refToUpdated = yield BancoIdeas_1.referencePopulation.findOne({ where: { codigo: req.params.id } });
                if (denCreated) {
                    res.status(200).json({
                        msg: "Datos Actualizados",
                        data: refToUpdated
                    });
                }
            }
            else {
                throw `No se encontró el registro`;
            }
        }
        else {
            throw `Error al actualizar Poblacion de Referencia`;
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
});
exports.updateReferencePopulation = updateReferencePopulation;
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
const createModalityFinancing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.name) {
            const name = req.body.name;
            let denCreated = yield modalityFinancing_entity_1.modalityFinancing.create({ name });
            if (denCreated) {
                res.status(200).json({
                    msg: "Datos Created",
                    data: denCreated,
                });
            }
        }
        else {
            throw `Error al crear Fuentes de Financiamiento`;
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
});
exports.createModalityFinancing = createModalityFinancing;
const deleteModalityFinancing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id) {
            const modalityToDelete = yield modalityFinancing_entity_1.modalityFinancing.findOne({ where: { codigo: req.params.id } });
            if (modalityToDelete) {
                const id = req.params.id;
                let denCreated = yield modalityFinancing_entity_1.modalityFinancing.destroy({
                    where: {
                        id
                    }
                });
                res.status(200).json({
                    msg: "Datos Eliminados",
                    data: modalityToDelete
                });
            }
            else {
                throw `No se encontró el registro`;
            }
        }
        else {
            throw `Error al eliminar Fuentes de Financiamiento`;
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
});
exports.deleteModalityFinancing = deleteModalityFinancing;
const updateModalityFinancing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.name && req.params.id) {
            const name = req.body.name;
            const id = req.params.id;
            const modalityToUpdate = yield modalityFinancing_entity_1.modalityFinancing.findOne({ where: { codigo: req.params.id } });
            if (modalityToUpdate) {
                let denCreated = yield modalityFinancing_entity_1.modalityFinancing.update({ name }, {
                    where: {
                        id
                    }
                });
                const modalityToUpdate = yield modalityFinancing_entity_1.modalityFinancing.findOne({ where: { codigo: req.params.id } });
                if (denCreated) {
                    res.status(200).json({
                        msg: "Datos Actualizados",
                        data: modalityToUpdate
                    });
                }
            }
            else {
                throw `No se encontró el registro`;
            }
        }
        else {
            throw `Error al crear Fuentes de Financiamiento`;
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
});
exports.updateModalityFinancing = updateModalityFinancing;
function getAdvisedEntities(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield advisedEntity_entity_1.default.findAll({
                order: [['name', 'ASC']],
                include: [
                    {
                        required: false,
                        model: subSectorization_entity_1.default
                    },
                ]
            });
            if (data.length <= 0) {
                let ents = advisedEnt_1.advEntities;
                let resEnt = yield Promise.all(ents.map((ent) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    let entObj = { name: ent.name };
                    let res = yield advisedEntity_entity_1.default.create(entObj);
                    if (ent.sbSector && ((_a = ent.sbSector) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                        let resEnt2 = yield Promise.all(ent.sbSector.map((ent2) => __awaiter(this, void 0, void 0, function* () {
                            let ent2Obj = { name: ent2.name, advisedEntityId: res.id };
                            let res2 = yield subSectorization_entity_1.default.create(ent2Obj);
                            return res2;
                        })));
                    }
                    return res;
                })));
                data = yield advisedEntity_entity_1.default.findAll({
                    order: [['name', 'ASC']],
                    include: [
                        {
                            required: false,
                            model: subSectorization_entity_1.default
                        },
                    ]
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
exports.getAdvisedEntities = getAdvisedEntities;
