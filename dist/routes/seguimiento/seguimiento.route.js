"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seguimiento_controller_1 = require("../../controllers/seguimiento/seguimiento.controller");
const seguimientoRouter = (0, express_1.Router)();
seguimientoRouter.post('/project/new', seguimiento_controller_1.createProject);
seguimientoRouter.get('/project/get-all', seguimiento_controller_1.getAllProjects);
seguimientoRouter.get('/project/:id', seguimiento_controller_1.getProjectById);
seguimientoRouter.put('/project/:id', seguimiento_controller_1.editProject);
seguimientoRouter.post('/project/track/:id', seguimiento_controller_1.addTrack);
seguimientoRouter.put('/project/track/:id', seguimiento_controller_1.editTrack);
seguimientoRouter.delete('/project/:id', seguimiento_controller_1.deleteProject);
seguimientoRouter.delete('/track/:id', seguimiento_controller_1.deleteTrack);
// sinafipRouter.delete('/request/delete/:id', deleteOneRequest)
// seguimientoRouter.put('/request/:status/:id', updateState)
// seguimientoRouter.post('/request/admission/:id', createAdmissionQuanty)
// seguimientoRouter.get('/request/data-priorization/:id', getDataPriorization)
exports.default = seguimientoRouter;
