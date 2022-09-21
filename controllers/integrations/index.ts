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
        })

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

        console.log();
        if (!req.query.idEntidad) {
            throw 'Se esperaba Id de la Entidad'
        }

        let idEntidad = req.query.idEntidad

        let resultado: any[] = [];
        let data: any[] = [];

        let query = `SELECT * FROM SCHE$SIPLAN20.SP20$PRODUCTO WHERE SPPRO$INSTO = '${idEntidad}' FETCH FIRST 1000 ROWS ONLY`;

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
        }

        res.status(200).json({
            msg: "Datos Obtenidos",
            data,
            items1: data.length,
            resultado,
            items2: resultado.length
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
};