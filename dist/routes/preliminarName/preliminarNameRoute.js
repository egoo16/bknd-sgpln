"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alternativeIdea_1 = require("../../controllers/alternativeIdea");
const preliminarRoute = (0, express_1.Router)();
preliminarRoute.post("/name", alternativeIdea_1.createPreleminaryName);
exports.default = preliminarRoute;
//# sourceMappingURL=preliminarNameRoute.js.map