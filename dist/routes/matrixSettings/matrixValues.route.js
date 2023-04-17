"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const matrix_controller_1 = require("../../controllers/matrixValues/matrix.controller");
const matrixRouter = (0, express_1.Router)();
matrixRouter.get('/admission', matrix_controller_1.getAdmissionMatrixValues);
matrixRouter.get('/relevance', matrix_controller_1.getRelevanceMatrixValues);
exports.default = matrixRouter;
