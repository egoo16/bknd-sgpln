"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = require("../../controllers/auth/login");
const loginRouter = (0, express_1.Router)();
loginRouter.post("/", login_1.loginUsuario);
loginRouter.get('/refresh-token', login_1.renovarToken);
exports.default = loginRouter;
