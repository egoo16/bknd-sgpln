"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dataProponent_1 = require("../../controllers/dataProponent");
const generalRouter = (0, express_1.Router)();
generalRouter.post("/", dataProponent_1.postDataProponent);
exports.default = generalRouter;
//# sourceMappingURL=dataPoponentRoute.js.map