"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("../global/environment");
const verificaToken = (req, res, next) => {
    try {
        const token = req.headers.token;
        jsonwebtoken_1.default.verify(token, environment_1.SEED, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    mensaje: 'Token Incorrecto',
                    errors: err,
                });
            }
            req.user = decoded.user;
            next();
        });
    }
    catch (error) {
        return res.status(500).json({ ok: false, mensaje: "Invalid token", error });
    }
};
exports.verificaToken = verificaToken;
