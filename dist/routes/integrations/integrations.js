"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const integrations_1 = require("../../controllers/integrations");
const integrationsRouter = (0, express_1.Router)();
integrationsRouter.get("/geograficos", integrations_1.getGeograficos);
integrationsRouter.get("/procesos", integrations_1.getProcesos);
integrationsRouter.get("/objetos", integrations_1.getObjetos);
integrationsRouter.get("/productos", integrations_1.getProductos);
exports.default = integrationsRouter;
//# sourceMappingURL=integrations.js.map