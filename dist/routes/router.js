"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Importaciones
const app_1 = __importDefault(require("./app"));
const login_1 = __importDefault(require("./auth/login"));
const generalInformation_1 = __importDefault(require("./bancoIdeas/generalInformation"));
const usuarios_1 = __importDefault(require("./usuarios"));
const router = (0, express_1.Router)();
// Rutas
router.use("/api/general/", generalInformation_1.default);
router.use("/api/login/", login_1.default);
router.use("/api/usuarios/", usuarios_1.default);
router.use("/", app_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map