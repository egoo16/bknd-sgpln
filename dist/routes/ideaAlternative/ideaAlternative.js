"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const authentication_1 = require("../../middlewares/authentication");
const list_controller_1 = require("../../controllers/sinafip/list.controller");
const preliminarRoute = (0, express_1.Router)();
// Demonimation
preliminarRoute.get("/denomination", controllers_1.getDenomination);
preliminarRoute.post("/denomination/", controllers_1.createDenomination);
preliminarRoute.delete("/denomination/:id", list_controller_1.deleteDenomination);
preliminarRoute.put("/denomination/:id", list_controller_1.updateDenomination);
// Reference Population
preliminarRoute.get("/referencePopulation", list_controller_1.getReferencePopulation);
preliminarRoute.post("/referencePopulation/", list_controller_1.createReferencePopulation);
preliminarRoute.delete("/referencePopulation/:id", list_controller_1.deleteReferencePopulation);
preliminarRoute.put("/referencePopulation/:id", list_controller_1.updateReferencePopulation);
// Alternative
preliminarRoute.get("/get-results/", authentication_1.verificaToken, controllers_1.listResults);
preliminarRoute.get("/preinversion/:id", controllers_1.getPreinversion);
preliminarRoute.get("/:id", controllers_1.getAlternative);
preliminarRoute.get("/pertinencia/:id", controllers_1.getPertinencia);
preliminarRoute.post("/", authentication_1.verificaToken, controllers_1.createIdeaAlternativeComplete);
preliminarRoute.post("/first", controllers_1.createIdeaAlternativeFirstPart);
preliminarRoute.post("/second/:id", controllers_1.createIdeaAlternativeSecondPart);
preliminarRoute.put("/", authentication_1.verificaToken, controllers_1.updateIdeaAlternativeComplete);
preliminarRoute.post("/send-pertinencia/", authentication_1.verificaToken, controllers_1.addPertinenceQuality);
exports.default = preliminarRoute;
