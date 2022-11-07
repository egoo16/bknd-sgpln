"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seguimiento_controller_1 = require("../../controllers/seguimiento/seguimiento.controller");
const seguimientoRouter = (0, express_1.Router)();
// // Listados
// seguimientoRouter.get('/entities', getAllEntities)
// seguimientoRouter.get('/project-function', getAllProjectFunction)
// seguimientoRouter.get('/general-studies', getAllgeneralStudies)
// seguimientoRouter.get('/preinv-document', getAllpreinvDocument)
// seguimientoRouter.get('/modality-financing', getAllmodalityFinancing)
seguimientoRouter.post('/project/new', seguimiento_controller_1.createProject);
// seguimientoRouter.get('/request/get-all', getAllRequest)
// seguimientoRouter.get('/request/:id', getOneRequest)
// // sinafipRouter.post('/request/create', createRequest)
// sinafipRouter.delete('/request/delete/:id', deleteOneRequest)
// seguimientoRouter.put('/request/:status/:id', updateState)
// seguimientoRouter.post('/request/admission/:id', createAdmissionQuanty)
// seguimientoRouter.get('/request/data-priorization/:id', getDataPriorization)
exports.default = seguimientoRouter;
