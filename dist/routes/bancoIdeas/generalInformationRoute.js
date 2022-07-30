"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dataProponent_1 = require("../../controllers/dataProponent");
const generalInformation_1 = require("../../controllers/generalInformation");
const generalRouter = (0, express_1.Router)();
generalRouter.post("/", generalInformation_1.postGeneralInformation);
generalRouter.post("/dataProponent", dataProponent_1.postDataProponent);
exports.default = generalRouter;
//# sourceMappingURL=generalInformationRoute.js.map