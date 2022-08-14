import { Request, Response } from "express";
import models from "../../db/connection";
import moment from "moment";
const Sequelize = require('sequelize-oracle');

export const getGeograficos = async (req: Request, res: Response) => {
    try {

        let geograficos: any[] = []
        await models.query('select * from SINIP.CG_GEOGRAFICO').spread((result: any) => { geograficos = result; console.log(result) })
            .catch((error: any) => {
                res.status(500).json({
                    msg: "Error",
                    error,
                });
            });

        res.status(200).json({
            msg: "Datos Obtenidos",
            data: geograficos,
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

        let resultado: any[] = [];
        let data: any[] = [];

        let query = `SELECT * FROM SCHE$SIPLAN20.SP20$PRODUCTO`;

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
                }
                data.push(dato);
            })
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