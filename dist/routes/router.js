"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Importaciones
const app_1 = __importDefault(require("./app"));
const login_1 = __importDefault(require("./auth/login"));
const generalInformationRoute_1 = __importDefault(require("./bancoIdeas/generalInformationRoute"));
const uploads_1 = __importDefault(require("./files/uploads"));
const ideaAlternative_1 = __importDefault(require("./ideaAlternative/ideaAlternative"));
const integrations_1 = __importDefault(require("./integrations/integrations"));
const usuarios_1 = __importDefault(require("./usuarios"));
const sinafip_route_1 = __importDefault(require("./sinafip/sinafip.route"));
const router = (0, express_1.Router)();
const prefix = 'api';
// Rutas
router.use("/api/upload/", uploads_1.default);
router.use(`/${prefix}/sinafip/`, sinafip_route_1.default);
router.use("/api/integrations/", integrations_1.default);
router.use("/api/alternative/", ideaAlternative_1.default);
router.use("/api/general/", generalInformationRoute_1.default);
router.use("/api/login/", login_1.default);
router.use("/api/usuarios/", usuarios_1.default);
router.use("/", app_1.default);
exports.default = router;
