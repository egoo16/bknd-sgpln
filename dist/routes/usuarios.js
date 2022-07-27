"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const usuarioRouter = (0, express_1.Router)();
usuarioRouter.get("/", usuarios_1.getUsuarios);
usuarioRouter.get("/:id", usuarios_1.getUsuario);
usuarioRouter.post("/", usuarios_1.postUsuario);
usuarioRouter.put("/", usuarios_1.putUsuario);
usuarioRouter.delete("/", usuarios_1.deleteUsuario);
exports.default = usuarioRouter;
//# sourceMappingURL=usuarios.js.map