"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const list_controller_1 = require("../../controllers/sinafip/list.controller");
const sinafip_controller_1 = require("../../controllers/sinafip/sinafip.controller");
const sinafipRouter = (0, express_1.Router)();
// Listados
sinafipRouter.get('/entities', list_controller_1.getAllEntities);
sinafipRouter.get('/project-function', list_controller_1.getAllProjectFunction);
sinafipRouter.get('/general-studies', list_controller_1.getAllgeneralStudies);
sinafipRouter.get('/preinv-document', list_controller_1.getAllpreinvDocument);
sinafipRouter.get('/modality-financing', list_controller_1.getAllmodalityFinancing);
sinafipRouter.post('/request/new', sinafip_controller_1.createRequestSinafip);
sinafipRouter.get('/request/get-all', sinafip_controller_1.getAllRequest);
sinafipRouter.get('/request/:id', sinafip_controller_1.getOneRequest);
// sinafipRouter.post('/request/create', createRequest)
// sinafipRouter.delete('/request/delete/:id', deleteOneRequest)
sinafipRouter.put('/request/:status/:id', sinafip_controller_1.updateState);
sinafipRouter.post('/request/admission/:id', sinafip_controller_1.createAdmissionQuanty);
sinafipRouter.get('/request/data-priorization/:id', sinafip_controller_1.getDataPriorization);
exports.default = sinafipRouter;
