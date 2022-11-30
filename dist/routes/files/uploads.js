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
const express_1 = require("express");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const fs_1 = __importDefault(require("fs"));
const datageo_model_1 = __importDefault(require("../../models/BancoIdeas/datageo.model"));
const config_1 = require("../../config/config");
const sinafip_1 = require("../../models/sinafip");
const advisoryEpi_1 = __importDefault(require("../../models/seguimiento/advisoryEpi"));
const UPLOAD_ROUTER = (0, express_1.Router)();
// default options
UPLOAD_ROUTER.use((0, express_fileupload_1.default)());
UPLOAD_ROUTER.put('/:type/:id', (req, res) => {
    const type = req.params.type;
    const id = req.params.id;
    // Tipos de colecciones
    const VALID_TYPES = ['terrain', 'projectDocument', 'tdr', 'schedule', 'advEpi'];
    if (VALID_TYPES.indexOf(type) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Invalid collection type',
            errors: { message: 'Invalid collection type' }
        });
    }
    console.log(type, id);
    // Sino envia ningún archivo
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'I do not select anything',
            errors: { message: 'You must select a file' }
        });
    }
    // Obtener nombre y la extensión del archivo
    const file = req.files.archivo;
    const nameFile = file.name.split('.');
    const extFile = nameFile[nameFile.length - 1];
    // Extensiones permitidas
    const validExts = ['png', 'jpg', 'gif', 'jpeg', 'pdf'];
    if (validExts.indexOf(extFile) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Invalid extension',
            errors: { message: 'Valid extensions are: ' + validExts.join(', ') }
        });
    }
    // Nombre del archivo personalizado
    const newNameFile = `${id}-${new Date().getMilliseconds()}.${extFile}`;
    // Mover el archivo de la memoria temporal a un path
    const dir = `./uploads/${type}/`;
    const path = `./uploads/${type}/${newNameFile}`;
    fs_1.default.stat(dir, (err, stats) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            let createDir = yield fs_1.default.mkdirSync(dir, { recursive: true });
            file.mv(path, (err) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error when moving file',
                        errors: err
                    });
                }
                uploadByType(type, id, newNameFile, res);
            });
        }
        else {
            file.mv(path, (err) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error when moving file',
                        errors: err
                    });
                }
                uploadByType(type, id, newNameFile, res);
            });
        }
    }));
});
// // Funcion que sirve para enlazar nuestros archivos con los registros en la base de datos
const uploadByType = (type, id, newNameFile, res) => {
    const SWITCH_TYPES = {
        'terrain': () => datageo_model_1.default.findOne({
            where: {
                id
            }
        }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (!data) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Terrain with id' + id + ' does not exist',
                    errors: {
                        message: 'There is no terrain with that ID'
                    }
                });
            }
            // Si existe un archivo almacenado anteriormente
            const oldPath = `./uploads/${type}/` + data.imageUrl;
            if (fs_1.default.existsSync(oldPath)) {
                // Borramos el archivo antiguo
                fs_1.default.unlink(oldPath, err => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error deleting old image',
                            errors: err
                        });
                    }
                });
            }
            data.imageUrl = `http://${config_1.ORIGINPATH}/api/readFile/${type}/${newNameFile}`;
            data.save().then((dataSaved) => {
                res.status(200).json({
                    ok: true,
                    dataSaved
                });
            }).catch((err) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error saving image',
                        errors: err
                    });
                }
            });
        })).catch((err) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error when searching for terrain',
                    errors: err
                });
            }
        }),
        'projectDocument': () => sinafip_1.institutionEntity.findOne({
            where: {
                id
            }
        }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (!data) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'The institution document project with id' + id + ' does not exist',
                    errors: {
                        message: 'There is no institution document project with that ID'
                    }
                });
            }
            // Si existe un archivo almacenado anteriormente
            const oldPath = `./uploads/${type}/` + data.documentProject;
            if (fs_1.default.existsSync(oldPath)) {
                // Borramos el archivo antiguo
                fs_1.default.unlink(oldPath, err => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error deleting old image',
                            errors: err
                        });
                    }
                });
            }
            data.documentProject = `http://${config_1.ORIGINPATH}/api/readFile/${type}/${newNameFile}`;
            data.save().then((dataSaved) => {
                res.status(200).json({
                    ok: true,
                    dataSaved
                });
            }).catch((err) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error saving image',
                        errors: err
                    });
                }
            });
        })).catch((err) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error when searching for institution document project',
                    errors: err
                });
            }
        }),
        'tdr': () => sinafip_1.requiredDocumentEntity.findOne({
            where: {
                id
            }
        }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (!data) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'The required document TDR with id' + id + ' does not exist',
                    errors: {
                        message: 'There is no required document TDR with that ID'
                    }
                });
            }
            // Si existe un archivo almacenado anteriormente
            const oldPath = `./uploads/${type}/` + data.tdr;
            if (fs_1.default.existsSync(oldPath)) {
                // Borramos el archivo antiguo
                fs_1.default.unlink(oldPath, err => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error deleting old image',
                            errors: err
                        });
                    }
                });
            }
            data.tdr = `http://${config_1.ORIGINPATH}/api/readFile/${type}/${newNameFile}`;
            data.save().then((dataSaved) => {
                res.status(200).json({
                    ok: true,
                    dataSaved
                });
            }).catch((err) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error saving image',
                        errors: err
                    });
                }
            });
        })).catch((err) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error when searching for required document TDR',
                    errors: err
                });
            }
        }),
        'schedule': () => sinafip_1.requiredDocumentEntity.findOne({
            where: {
                id
            }
        }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (!data) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'The required document schedule with id' + id + ' does not exist',
                    errors: {
                        message: 'There is no required document schedule with that ID'
                    }
                });
            }
            // Si existe un archivo almacenado anteriormente
            const oldPath = `./uploads/${type}/` + data.scheduleActiv;
            if (fs_1.default.existsSync(oldPath)) {
                // Borramos el archivo antiguo
                fs_1.default.unlink(oldPath, err => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error deleting old image',
                            errors: err
                        });
                    }
                });
            }
            data.scheduleActiv = `http://${config_1.ORIGINPATH}/api/readFile/${type}/${newNameFile}`;
            data.save().then((dataSaved) => {
                res.status(200).json({
                    ok: true,
                    dataSaved
                });
            }).catch((err) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error saving image',
                        errors: err
                    });
                }
            });
        })).catch((err) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error when searching for required document scheduleActiv',
                    errors: err
                });
            }
        }),
        'advEpi': () => advisoryEpi_1.default.findOne({
            where: {
                id
            }
        }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (!data) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'The required document advisory Doc with id' + id + ' does not exist',
                    errors: {
                        message: 'There is no required document advisory Doc with that ID'
                    }
                });
            }
            // Si existe un archivo almacenado anteriormente
            const oldPath = `./uploads/${type}/` + data.doc;
            if (fs_1.default.existsSync(oldPath)) {
                // Borramos el archivo antiguo
                fs_1.default.unlink(oldPath, err => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error deleting old image',
                            errors: err
                        });
                    }
                });
            }
            data.doc = `http://${config_1.ORIGINPATH}/api/readFile/${type}/${newNameFile}`;
            data.save().then((dataSaved) => {
                res.status(200).json({
                    ok: true,
                    dataSaved
                });
            }).catch((err) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error saving image',
                        errors: err
                    });
                }
            });
        })).catch((err) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error when searching for required document doc to Advisory Document',
                    errors: err
                });
            }
        }),
    };
    SWITCH_TYPES[type]();
};
exports.default = UPLOAD_ROUTER;
