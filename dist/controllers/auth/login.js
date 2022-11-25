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
exports.postUsuario = exports.loginUsuario = void 0;
const usuario_1 = __importDefault(require("../../models/usuario"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("../../global/environment");
const bcrypt = require('bcrypt');
const loginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (body) {
            const usuarios = yield usuario_1.default.findAll();
            if (!usuarios || usuarios.length <= 0) {
                let userTest = {
                    username: 'normal',
                    password: bcrypt.hashSync('123456', 10),
                    name: 'Usuario Externo de Prueba',
                    id_inst: '9000',
                    name_inst: 'MINISTERIO DE SALUD PUBLICA Y ASISTENCIA SOCIAL',
                    role: 'USER_ROLE',
                };
                let userTestCreate = yield createUser(userTest);
                userTest = {
                    username: 'admin',
                    password: bcrypt.hashSync('123456', 10),
                    name: 'Usuario Administrador de Prueba',
                    id_inst: '1',
                    name_inst: 'INSTITUCION TEST',
                    role: 'ADMIN_ROLE',
                };
                userTestCreate = yield createUser(userTest);
                userTest = {
                    username: 'digitador',
                    password: bcrypt.hashSync('123456', 10),
                    name: 'Usuario Administrador de Prueba',
                    id_inst: '1',
                    name_inst: 'INSTITUCION TEST',
                    role: 'DIGITADOR_ROLE',
                };
                userTestCreate = yield createUser(userTest);
            }
            const usuario = yield usuario_1.default.findOne({
                where: { username: body.username },
            });
            if (usuario) {
                if (bcrypt.compareSync(body.password, usuario.password)) {
                    usuario.password = ":D";
                    //Creacion del Token
                    const token = jsonwebtoken_1.default.sign({ usuario }, environment_1.SEED, {
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
