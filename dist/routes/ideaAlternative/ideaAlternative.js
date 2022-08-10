"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alternativeIdea_1 = require("../../controllers/alternativeIdea");
const preliminarRoute = (0, express_1.Router)();
preliminarRoute.post("/", alternativeIdea_1.createIdeaAlternativeComplete);
exports.default = preliminarRoute;
//# sourceMappingURL=ideaAlternative.js.map