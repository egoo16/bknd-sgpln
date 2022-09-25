"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alternativeIdea_1 = require("../../controllers/alternativeIdea");
const preliminarRoute = (0, express_1.Router)();
preliminarRoute.get("/preinversion/:id", alternativeIdea_1.getPreinversion);
preliminarRoute.post("/", alternativeIdea_1.createIdeaAlternativeComplete);
preliminarRoute.put("/", alternativeIdea_1.updateIdeaAlternativeComplete);
preliminarRoute.get("/denomination", alternativeIdea_1.getDenomination);
preliminarRoute.get("/referencePopulation", alternativeIdea_1.getReferencePopulation);
preliminarRoute.get("/:id", alternativeIdea_1.getAlternative);
preliminarRoute.get("/pertinencia/:id", alternativeIdea_1.getPertinencia);
preliminarRoute.post("/send-pertinencia/", alternativeIdea_1.addPertinenceQuality);
exports.default = preliminarRoute;
//# sourceMappingURL=ideaAlternative.js.map