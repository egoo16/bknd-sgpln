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
exports.getProductos = exports.getObjetos = exports.getProcesos = exports.getGeograficos = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const Sequelize = require('sequelize-oracle');
const getGeograficos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let geograficos = [];
        let data = [];
        yield connection_1.default.query('select * from SINIP.CG_GEOGRAFICO').spread((result) => { geograficos = result; })
            .catch((error) => {
            res.status(500).json({
                msg: "Error",
                error,
            });
        });
        geograficos.map((localidad) => {
            if (localidad.SIGLA) {
                let mncpio = geograficos.filter((geo) => geo.DEPTO == localidad.GEOGRAFICO);
                localidad.municipios = mncpio;
                data.push(localidad);
            }
        });
        // let dato1 = data.indexOf((dato: any) => dato.NOMBRE == 'Centro Recepcion Central');
        let dato1 = data.findIndex(dato => dato.NOMBRE == 'Centro Recepcion Central');
        let dato2 = data.findIndex(dato => dato.NOMBRE == 'No Aplica');
        let dato3 = data.findIndex(dato => dato.NOMBRE == 'Sin clasificar');
        let dato4 = data.findIndex(dato => dato.NOMBRE == 'MULTIREGIONAL - NACIONAL');
        console.log("🚀 ~ file: index.ts ~ line 33 ~ getGeograficos ~ dato4", dato1, dato2, dato3, dato4);
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
        console.log(data);
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
exports.getGeograficos = getGeograficos;
const getProcesos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let resultado = [];
        let formaCapital = [];
        let noFormaCapital = [];
        let query = `SELECT a.proceso, a.descripcion ,a.tipo_proyecto FROM ci_proceso a WHERE A.restrictiva = 'N'`;
        yield connection_1.default.query(query).spread((result) => { resultado = result; }).catch((error) => {
            res.status(500).json({
                msg: "Error",
                error,
            });
        });
        ;
        if (resultado) {
            noFormaCapital = resultado.filter((proceso) => proceso.TIPO_PROYECTO == 'N');
            formaCapital = resultado.filter((proceso) => proceso.TIPO_PROYECTO == 'F');
        }
        let data = {
            noFormaCapital,
            formaCapital
        };
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
exports.getProcesos = getProcesos;
const getObjetos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let resultado = [];
        let data = [];
        let query = `SELECT a.especie, a.nombre,a.nombre_generico   FROM ci_especie a WHERE A.restrictiva = 'N'`;
        yield connection_1.default.query(query).spread((result) => { resultado = result; }).catch((error) => {
            res.status(500).json({
                msg: "Error",
                error,
            });
        });
        if (resultado) {
            const eliminaDatosDuplicados = (arr) => {
                const datosMap = arr.map((dato) => {
                    return [dato.NOMBRE, dato];
                });
                return [...new Map(datosMap).values()];
            };
            data = eliminaDatosDuplicados(resultado);
        }
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
exports.getObjetos = getObjetos;
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log();
        if (!req.query.idEntidad) {
            throw 'Se esperaba Id de la Entidad';
        }
        let idEntidad = req.query.idEntidad;
        let resultado = [];
        let data = [];
        let datar = [];
        let query = `SELECT * FROM SCHE$SIPLAN20.SP20$PRODUCTO WHERE SPPRO$INSTO = '${idEntidad}'`;
        yield connection_1.default.query(query).spread((result) => { resultado = result; }).catch((error) => {
            res.status(500).json({
                msg: "Error",
                error,
            });
        });
        if (resultado) {
            resultado.map((res) => {
                let dato = {
                    codigo: res.SPPRO$ID_PRODUCTO,
                    nombre: res.SPPRO$DESCRIPCION,
                    idEntidad: res.SPPRO$INSTO,
                };
                data.push(dato);
            });
            const eliminaDatosDuplicados = (arr) => {
                const datosMap = arr.map((dato) => {
                    return [dato.nombre, dato];
                });
                return [...new Map(datosMap).values()];
            };
            datar = eliminaDatosDuplicados(data);
        }
        res.status(200).json({
            msg: "Datos Obtenidos",
            data: datar,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error,
        });
    }
});
exports.getProductos = getProductos;
