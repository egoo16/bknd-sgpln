import { Router, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import dataGeo from '../../models/BancoIdeas/datageo.model';
import { ORIGINPATH } from "../../config/config";
import { requiredDocumentEntity } from '../../models/sinafip';
import advisoryEpi from '../../models/seguimiento/advisoryEpi';
import institutionEntity from '../../models/sinafip/institution.entity';


const UPLOAD_ROUTER = Router();

// default options
UPLOAD_ROUTER.use(fileUpload());

UPLOAD_ROUTER.put('/:type/:id', (req: any, res: Response) => {
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
                    mensaje: 'Terrain with id' + id + ' does not exist',
                    errors: {
                        message: 'There is no terrain with that ID'
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
                    mensaje: 'Error when searching for terrain',
                    errors: err
                });
            }
        }),
        'projectDocument': () => institutionEntity.findOne({
            where: {
                id
            }
        }).then(async (data: any) => {
            console.log("🚀 ~ file: uploads.ts:161 ~ uploadByType ~ data:", data)

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

            data.documentProject = `http://${ORIGINPATH}/api/readFile/${type}/${newNameFile}`;

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
                    mensaje: 'Error when searching for institution document project',
                    errors: err
                });
            }
        }),
        'tdr': () => requiredDocumentEntity.findOne({
            where: {
                id
            }
        }).then(async (data: any) => {

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

            data.tdr = `http://${ORIGINPATH}/api/readFile/${type}/${newNameFile}`;

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
                    mensaje: 'Error when searching for required document TDR',
                    errors: err
                });
            }
        }),
        'schedule': () => requiredDocumentEntity.findOne({
            where: {
                id
            }
        }).then(async (data: any) => {

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

            data.scheduleActiv = `http://${ORIGINPATH}/api/readFile/${type}/${newNameFile}`;

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
                    mensaje: 'Error when searching for required document scheduleActiv',
                    errors: err
                });
            }
        }),
        'advEpi': () => advisoryEpi.findOne({
            where: {
                id
            }
        }).then(async (data: any) => {

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

            data.doc = `http://${ORIGINPATH}/api/readFile/${type}/${newNameFile}`;

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
                    mensaje: 'Error when searching for required document doc to Advisory Document',
                    errors: err
                });
            }
        }),
    };
    SWITCH_TYPES[type]();
};

export default UPLOAD_ROUTER;