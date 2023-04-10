"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const list_controller_1 = require("../../controllers/sinafip/list.controller");
const sinafip_controller_1 = require("../../controllers/sinafip/sinafip.controller");
const authentication_1 = require("../../middlewares/authentication");
const sinafipRouter = (0, express_1.Router)();
// Listados
sinafipRouter.get('/entities', list_controller_1.getAllEntities);
sinafipRouter.get('/project-function', list_controller_1.getAllProjectFunction);
sinafipRouter.get('/general-studies', list_controller_1.getAllgeneralStudies);
sinafipRouter.get('/preinv-document', list_controller_1.getAllpreinvDocument);
// Modality Financing
sinafipRouter.get('/modality-financing', list_controller_1.getAllmodalityFinancing);
sinafipRouter.post("/modality-financing/", list_controller_1.createModalityFinancing);
sinafipRouter.delete("/modality-financing/:id", list_controller_1.deleteModalityFinancing);
sinafipRouter.put("/modality-financing/:id", list_controller_1.updateModalityFinancing);
sinafipRouter.get("/sector-adb/", list_controller_1.getAdvisedEntities);
sinafipRouter.post('/request/new', authentication_1.verificaToken, sinafip_controller_1.createRequestSinafip);
sinafipRouter.post('/request/new', authentication_1.verificaToken, sinafip_controller_1.createRequestSinafip);
sinafipRouter.put('/request/update/:id', sinafip_controller_1.updateRequest);
sinafipRouter.get('/request/get-all', authentication_1.verificaToken, sinafip_controller_1.getAllRequest);
sinafipRouter.get('/request/:id', sinafip_controller_1.getOneRequest);
// sinafipRouter.post('/request/create', createRequest)
// sinafipRouter.delete('/request/delete/:id', deleteOneRequest)
sinafipRouter.put('/request/:status/:id', authentication_1.verificaToken, sinafip_controller_1.updateState);
sinafipRouter.post('/request/admission/:id', authentication_1.verificaToken, sinafip_controller_1.createAdmissionQuanty);
sinafipRouter.get('/request/data-priorization/:id', sinafip_controller_1.getDataPriorization);
exports.default = sinafipRouter;
