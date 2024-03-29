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
exports.postUsuario = exports.loginUsuario = exports.renovarToken = void 0;
const usuario_1 = __importDefault(require("../../models/usuario"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("../../global/environment");
const bcrypt = require('bcrypt');
const renovarToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Invalid Token',
            });
        }
        const token = jsonwebtoken_1.default.sign({
            user: req.user,
        }, environment_1.SEED, {
            expiresIn: '4h',
        });
        res.status(200).json({
            ok: true,
            id: req.user._id,
            user: req.user,
            token,
        });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.renovarToken = renovarToken;
const loginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (body) {
            const usuario = yield usuario_1.default.findOne({
                where: { username: body.username },
            });
            if (usuario) {
                if (bcrypt.compareSync(body.password, usuario.password)) {
                    usuario.password = ":D";
                    //Creacion del Token
                    const token = jsonwebtoken_1.default.sign({ user: usuario }, environment_1.SEED, {
                        expiresIn: 14400,
                    }); //4 horas de expiracion
                    res.status(200).json({
                        ok: true,
                        usuario,
                        id: usuario.id,
                        token,
                    });
                }
                else {
                    return res
                        .status(400)
                        .json({ ok: false, error: "Credenciales Incorrectas" });
                }
            }
            else {
                return res
                    .status(400)
                    .json({ ok: false, error: "Credenciales Incorrectas" });
            }
        }
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.loginUsuario = loginUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body) {
            const { body } = req;
            let usuario = {
                name: body.name,
                username: body.username,
                password: bcrypt.hashSync(body.password, 10),
                role: body.role,
                id_inst: body.id_inst,
                name_inst: body.name_inst,
                position: body.position
            };
            let userCreated = yield createUser(Object.assign({}, usuario));
            userCreated.password = 'like';
            return res.status(201).send({
                msg: 'Usuario Creado',
                data: userCreated
            });
        }
    }
    catch (error) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
    }
});
exports.postUsuario = postUsuario;
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (user) {
                let userCreated = yield usuario_1.default.create(Object.assign({}, user));
                return userCreated;
            }
            else {
                throw `Error Crear Usuario: ${user.username}`;
            }
        }
        catch (error) {
            throw `Error Crear User: ${error.message}`;
        }
    });
}
