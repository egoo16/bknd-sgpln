"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controller_1 = require("../../controllers/report/report.controller");
const reportRouter = (0, express_1.Router)();
reportRouter.get('/ideas-general', report_controller_1.getIdeasFitered);
reportRouter.get('/register-studies', report_controller_1.getRegisterSinafip);
exports.default = reportRouter;
