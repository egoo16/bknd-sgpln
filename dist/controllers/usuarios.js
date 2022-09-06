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
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcrypt = require('bcrypt');
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json({
        usuarios,
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findById(id);
    res.json({
        msg: "getUsuario",
        id,
        usuario
    });
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => {
    try {
        if (req.body) {
            const { body } = req;
            let usuario = {
                username: body.username,
                password: bcrypt.hashSync(body.password, 10),
                name: body.name,
                id_Institution: '1',
                name_Institution: 'INSTITUCION TEST'
            };
            res.json({
                msg: "postUsuario",
                body,
            });
        }
    }
    catch (error) {
    }
};
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    res.json({
        msg: "putUsuario",
        body,
        id,
    });
};
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: "deleteUsuario",
        id,
    });
};
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map