"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controller_1 = require("../../controllers/report/report.controller");
const privateRouter = (0, express_1.Router)();
privateRouter.post('/query', report_controller_1.queryToSend);
exports.default = privateRouter;
