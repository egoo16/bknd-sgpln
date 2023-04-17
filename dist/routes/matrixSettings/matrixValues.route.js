"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const matrix_controller_1 = require("../../controllers/matrixValues/matrix.controller");
const matrixRouter = (0, express_1.Router)();
matrixRouter.get('/admission', matrix_controller_1.getAdmissionMatrixValues);
matrixRouter.put('/admission', matrix_controller_1.updateAdmissionValues);
matrixRouter.get('/relevance', matrix_controller_1.getRelevanceMatrixValues);
matrixRouter.put('/relevance/investment', matrix_controller_1.updateRelevanceInvestment);
matrixRouter.put('/relevance/beneficiaries', matrix_controller_1.updateRelevanceBeneficiaries);
matrixRouter.put('/relevance/complexy', matrix_controller_1.updateRelevanceComplexy);
matrixRouter.put('/relevance/stage', matrix_controller_1.updateRelevanceStage);
exports.default = matrixRouter;
