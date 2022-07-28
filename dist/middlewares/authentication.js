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
        const token = String(req.query.token);
        if (token) {
            const verify = jsonwebtoken_1.default.verify(token, environment_1.SEED);
            if (!verify) {
                return res.status(401).json({ ok: false, error: "Invalid token" });
            }
            req.body.usuario = verify.usuario;
            next();
            //   res.status(200).json({ ok: true, verify})
        }
    }
    catch (error) {
        return res.status(500).json({ ok: false, mensaje: "Invalid token", error });
    }
};
exports.verificaToken = verificaToken;
//# sourceMappingURL=authentication.js.map