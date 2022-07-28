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
exports.loginUsuario = void 0;
const usuario_1 = __importDefault(require("../../models/usuario"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("../../global/environment");
const loginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (body) {
            const usuario = yield usuario_1.default.findOne({
                where: { username: body.username },
            });
            if (usuario) {
                if (body.password === usuario.password) {
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
//# sourceMappingURL=login.js.map