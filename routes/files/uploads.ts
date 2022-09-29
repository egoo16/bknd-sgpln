import { Router, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import dataGeo from '../../models/BancoIdeas/datageo.model';
import { ORIGINPATH } from "../../config/config";


// import SimulatorConfig, { ISimulatorConfig } from '../models/simulatorConfig';
// import Layer, { ILayer } from '../models/layer'
// import Option, { IOption } from '../models/option'
// import { mdAuth } from '../middleware/auth';

const UPLOAD_ROUTER = Router();

// default options
UPLOAD_ROUTER.use(fileUpload());

UPLOAD_ROUTER.put('/:type/:id', (req: any, res: Response) => {
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
    console.log(type, id)

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

    fs.stat(dir, async (err, stats) => {
        if (err) {
            let createDir = await fs.mkdirSync(dir, { recursive: true });
            file.mv(path, (err: any) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error when moving file',
                        errors: err
                    });
                }
                uploadByType(type, id, newNameFile, res);
            });
        } else {
            file.mv(path, (err: any) => {
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
    });



});

// // Funcion que sirve para enlazar nuestros archivos con los registros en la base de datos
const uploadByType = (type: string, id: string, newNameFile: string, res: Response) => {
    const SWITCH_TYPES: any = {
        'terrain': () => dataGeo.findOne({
            where: {
                id
            }
        }).then(async (data: any) => {

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

            if (fs.existsSync(oldPath)) {
                // Borramos el archivo antiguo
                fs.unlink(oldPath, err => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error deleting old image',
                            errors: err
                        });
                    }
                });
            }

            data.imageUrl = `http://${ORIGINPATH}/api/readFile/${type}/${newNameFile}`;

            data.save().then((dataSaved: any) => {
                res.status(200).json({
                    ok: true,
                    dataSaved
                });
            }).catch((err: any) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error saving image',
                        errors: err
                    });
                }

            });
        }).catch((err: any) => {
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

export default UPLOAD_ROUTER;