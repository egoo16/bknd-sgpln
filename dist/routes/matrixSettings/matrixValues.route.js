"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const matrix_controller_1 = require("../../controllers/matrixValues/matrix.controller");
const matrixRouter = (0, express_1.Router)();
// seguimientoRouter.post('/project/new', createProject)
matrixRouter.get('/admission', matrix_controller_1.getAdmissionMatrixValues);
// seguimientoRouter.get('/project/:id', getProjectById)
// seguimientoRouter.post('/project/track/:id', addTrack)
// sinafipRouter.delete('/request/delete/:id', deleteOneRequest)
// seguimientoRouter.put('/request/:status/:id', updateState)
// seguimientoRouter.post('/request/admission/:id', createAdmissionQuanty)
// seguimientoRouter.get('/request/data-priorization/:id', getDataPriorization)
exports.default = matrixRouter;
