"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = require("../controllers/auth/login");
const usuarioRouter = (0, express_1.Router)();
// usuarioRouter.get("/", getUsuarios);
// usuarioRouter.get("/:id",verificaToken, getUsuario);
usuarioRouter.post("/", login_1.postUsuario);
// usuarioRouter.put("/", putUsuario);
// usuarioRouter.delete("/", deleteUsuario);
exports.default = usuarioRouter;
