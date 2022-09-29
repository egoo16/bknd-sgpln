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
// import SimulatorConfig, { ISimulatorConfig } from '../models/simulatorConfig';
// import Layer, { ILayer } from '../models/layer'
// import Option, { IOption } from '../models/option'
// import { mdAuth } from '../middleware/auth';
const UPLOAD_ROUTER = (0, express_1.Router)();
// default options
UPLOAD_ROUTER.use((0, express_fileupload_1.default)());
UPLOAD_ROUTER.put('/:type/:id', (req, res) => {
    const type = req.params.type;
    const id = req.params.id;
    // Tipos de colecciones
    const VALID_TYPES = ['terrain', 'projectDocument', 'tdr', 'timeline'];
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
    const validExts = ['png', 'jpg', 'gif', 'jpeg'];
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
                    mensaje: 'The simulator configuration with the id' + id + ' does not exist',
                    errors: {
                        message: 'There is no configuration of the simulator with that ID'
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
                    mensaje: 'Error when searching for simulator configuration',
                    errors: err
                });
            }
        }),
        // 'layers': () => Layer.findById(id, (err: any, layer: ILayer) => {
        //     if (err) {
        //         return res.status(500).json({
        //             ok: false,
        //             mensaje: 'Error when searching for layer',
        //             errors: err
        //         });
        //     }
        //     if (!layer) {
        //         return res.status(400).json({
        //             ok: false,
        //             mensaje: 'The layer with the id' + id + ' does not exist',
        //             errors: {
        //                 message: 'There is no layer with this ID'
        //             }
        //         });
        //     }
        //     // Si existe un archivo almacenado anteriormente
        //     const oldPath = './uploads/layers/' + layer.imgDefault;
        //     if (fs.existsSync(oldPath)) {
        //         // Borramos el archivo antiguo
        //         fs.unlink(oldPath, err => {
        //             if (err) {
        //                 return res.status(500).json({
        //                     ok: false,
        //                     mensaje: 'Error deleting old image',
        //                     errors: err
        //                 });
        //             }
        //         });
        //     }
        //     layer.imgDefault = `https://backendoem.azurewebsites.net/readFile/layers/${newNameFile}`;
        //     layer.save((err, layer) => {
        //         if (err) {
        //             return res.status(400).json({
        //                 ok: false,
        //                 mensaje: 'Error saving image',
        //                 errors: err
        //             });
        //         }
        //         res.status(200).json({
        //             ok: true,
        //             layer
        //         });
        //     });
        // }),
        // 'options': () => Option.findById(id, (err: any, option: IOption) => {
        //     if (err) {
        //         return res.status(500).json({
        //             ok: false,
        //             mensaje: 'Error when searching for option',
        //             errors: err
        //         });
        //     }
        //     if (!option) {
        //         return res.status(400).json({
        //             ok: false,
        //             mensaje: 'The option with the id' + id + ' does not exist',
        //             errors: {
        //                 message: 'There is no option with this ID'
        //             }
        //         });
        //     }
        //     // Si existe un archivo almacenado anteriormente
        //     const oldPath = './uploads/options/' + option.thumbnail;
        //     if (fs.existsSync(oldPath)) {
        //         // Borramos el archivo antiguo
        //         fs.unlink(oldPath, err => {
        //             if (err) {
        //                 return res.status(500).json({
        //                     ok: false,
        //                     mensaje: 'Error deleting old image',
        //                     errors: err
        //                 });
        //             }
        //         });
        //     }
        //     option.thumbnail = `https://backendoem.azurewebsites.net/readFile/options/${newNameFile}`;
        //     option.save((err, option) => {
        //         if (err) {
        //             return res.status(400).json({
        //                 ok: false,
        //                 mensaje: 'Error saving image',
        //                 errors: err
        //             });
        //         }
        //         res.status(200).json({
        //             ok: true,
        //             option
        //         });
        //     });
        // }),
        // 'configs': () => Option.findOne(
        //     { "configs._id": id },
        //     { "configs.$": true },
        //     (err, option) => {
        //         if (err) {
        //             return res.status(500).json({
        //                 ok: false,
        //                 mensaje: 'Error when searching for configuration',
        //                 errors: err
        //             });
        //         }
        //         if (!option) {
        //             return res.status(400).json({
        //                 ok: false,
        //                 mensaje: 'The configuration with the id' + id + ' does not exist',
        //                 errors: {
        //                     message: 'There is no configuration with this ID'
        //                 }
        //             });
        //         }
        //         // Si existe un archivo almacenado anteriormente
        //         const oldPath = './uploads/configs/' + option.configs[0].img;
        //         if (fs.existsSync(oldPath)) {
        //             // Borramos el archivo antiguo
        //             fs.unlink(oldPath, err => {
        //                 if (err) {
        //                     return res.status(500).json({
        //                         ok: false,
        //                         mensaje: 'Error deleting old image',
        //                         errors: err
        //                     });
        //                 }
        //             });
        //         }
        //         const IMG = `https://backendoem.azurewebsites.net/readFile/configs/${newNameFile}`;
        //         Option.updateOne(
        //             {
        //                 _id: option._id,
        //                 'configs._id': id,
        //             },
        //             {
        //                 'configs.$.img': IMG,
        //             },
        //         ).exec((err: any, result: any) => {
        //             if (err) {
        //                 return res.status(400).json({
        //                     ok: false,
        //                     mensaje: 'Error saving image',
        //                     errors: err
        //                 });
        //             }
        //             res.status(200).json({
        //                 ok: true,
        //                 IMG
        //             });
        //         });
        //     })
    };
    SWITCH_TYPES[type]();
};
exports.default = UPLOAD_ROUTER;
