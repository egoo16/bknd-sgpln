import { Request, Response } from "express";
import models from "../../db/connection";
import moment from "moment";
const Sequelize = require('sequelize-oracle');

export const getGeograficos = async (req: Request, res: Response) => {
    try {

        let geograficos: any[] = []
        let data: any[] = []
        await models.query('select * from SINIP.CG_GEOGRAFICO').spread((result: any) => { geograficos = result; })
            .catch((error: any) => {
                res.status(500).json({
                    msg: "Error",
                    error,
                });
            });

        geograficos.map((localidad: any) => {
            if (localidad.SIGLA) {
                let mncpio: any[] = geograficos.filter((geo: any) => geo.DEPTO == localidad.GEOGRAFICO);
                localidad.municipios = mncpio;
                data.push(localidad);
            }
        });

        // let dato1 = data.indexOf((dato: any) => dato.NOMBRE == 'Centro Recepcion Central');
        let dato1 = data.findIndex(dato => dato.NOMBRE == 'Centro Recepcion Central');
        let dato2 = data.findIndex(dato => dato.NOMBRE == 'No Aplica');
        let dato3 = data.findIndex(dato => dato.NOMBRE == 'Sin clasificar');
        let dato4 = data.findIndex(dato => dato.NOMBRE == 'MULTIREGIONAL - NACIONAL');
        if (dato1 !== -1) {
            data.splice(dato1, 1);
        }
        if (dato2 !== -1) {
            data.splice(dato2, 1);
        }
        if (dato3 !== -1) {
            data.splice(dato3, 1);
        }
        if (dato4 !== -1) {
            data.splice(dato4, 1);
        }

        res.status(200).json({
            msg: "Datos Obtenidos",
            data,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
};


export const getProcesos = async (req: Request, res: Response) => {
    try {

        let resultado: any[] = [];
        let formaCapital: any[] = [];
        let noFormaCapital: any[] = [];

        let query = `SELECT a.proceso, a.descripcion ,a.tipo_proyecto FROM ci_proceso a WHERE A.restrictiva = 'N'`;

        await models.query(query).spread((result: any) => { resultado = result; }).catch((error: any) => {
            res.status(500).json({
                msg: "Error",
                error,
            });
        });;

        if (resultado) {
            noFormaCapital = resultado.filter((proceso: any) => proceso.TIPO_PROYECTO == 'N');
            formaCapital = resultado.filter((proceso: any) => proceso.TIPO_PROYECTO == 'F');
        }

        let data = {
            noFormaCapital,
            formaCapital
        };

        res.status(200).json({
            msg: "Datos Obtenidos",
            data,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
};

export const getObjetos = async (req: Request, res: Response) => {
    try {

        let resultado: any[] = [];
        let data: any[] = [];
        let query = `SELECT a.especie, a.nombre,a.nombre_generico   FROM ci_especie a WHERE A.restrictiva = 'N'`;

        await models.query(query).spread((result: any) => { resultado = result; }).catch((error: any) => {
            res.status(500).json({
                msg: "Error",
                error,
            });
        });

        if (resultado) {
            const eliminaDatosDuplicados = (arr: any) => {
                const datosMap = arr.map((dato: any) => {
                    return [dato.NOMBRE, dato]
                });
                return [...new Map(datosMap).values()];
            }
            data = eliminaDatosDuplicados(resultado);
        }

        res.status(200).json({
            msg: "Datos Obtenidos",
            data,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
};

export const getProductos = async (req: Request, res: Response) => {
    try {

        if (!req.query.idEntidad) {
            throw 'Se esperaba Id de la Entidad'
        }

        let idEntidad = req.query.idEntidad

        let resultado: any[] = [];
        let data: any[] = [];
        let datar: any[] = [];

        let query = `SELECT * FROM SCHE$SIPLAN20.SP20$PRODUCTO WHERE SPPRO$INSTO = '${idEntidad}'`;

        await models.query(query).spread((result: any) => { resultado = result; }).catch((error: any) => {
            res.status(500).json({
                msg: "Error",
                error,
            });
        });

        if (resultado) {
            resultado.map((res: any) => {
                let dato = {
                    codigo: res.SPPRO$ID_PRODUCTO,
                    nombre: res.SPPRO$DESCRIPCION,
                    idEntidad: res.SPPRO$INSTO,
                }
                data.push(dato);
            })
            const eliminaDatosDuplicados = (arr: any) => {
                const datosMap = arr.map((dato: any) => {
                    return [dato.nombre, dato]
                });
                return [...new Map(datosMap).values()];
            }
            datar = eliminaDatosDuplicados(data);
        }

        res.status(200).json({
            msg: "Datos Obtenidos",
            data: datar,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
};

export const getEntidades = async (req: Request, res: Response) => {
    try {



        let resultado: any[] = [];
        let data: any[] = [];
        let datar: any[] = [];

        let query = `select * from SINIP.CG_ENTIDADES
        where SINIP.CG_ENTIDADES."SIGLA" IS NOT NULL`;

        await models.query(query).spread((result: any) => { resultado = result; }).catch((error: any) => {
            res.status(500).json({
                msg: "Error",
                error,
            });
        });

        if (resultado) {
            resultado.map((res: any) => {
                let dato = {
                    idEntidad: res.ENTIDAD,
                    nombre: res.NOMBRE,
                    sigla: res.SIGLA
                }
                data.push(dato);
            })
            const eliminaDatosDuplicados = (arr: any) => {
                const datosMap = arr.map((dato: any) => {
                    return [dato.nombre, dato]
                });
                return [...new Map(datosMap).values()];
            }
            datar = eliminaDatosDuplicados(data);
        }

        res.status(200).json({
            msg: "Datos Obtenidos",
            data: datar,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
};