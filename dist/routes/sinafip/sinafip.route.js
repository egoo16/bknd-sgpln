"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const list_controller_1 = require("../../controllers/sinafip/list.controller");
const request_controller_1 = require("../../controllers/sinafip/request.controller");
const sinafipRouter = (0, express_1.Router)();
// Listados
sinafipRouter.get('/entities', list_controller_1.getAllEntities);
sinafipRouter.get('/project-function', list_controller_1.getAllProjectFunction);
sinafipRouter.get('/general-studies', list_controller_1.getAllgeneralStudies);
sinafipRouter.get('/preinv-document', list_controller_1.getAllpreinvDocument);
sinafipRouter.get('/modality-financing', list_controller_1.getAllmodalityFinancing);
sinafipRouter.post('/request/create', request_controller_1.createRequest);
sinafipRouter.get('/request/get-all', request_controller_1.getAllRequest);
sinafipRouter.get('/request/:id', request_controller_1.getOneRequest);
sinafipRouter.delete('/request/delete/:id', request_controller_1.deleteOneRequest);
exports.default = sinafipRouter;
