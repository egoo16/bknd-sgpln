"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dataProponent_1 = require("../../controllers/dataProponent");
const generalInformation_1 = require("../../controllers/generalInformation");
const problemDefinition_1 = require("../../controllers/problemDefinition");
const generalRouter = (0, express_1.Router)();
generalRouter.post("/", generalInformation_1.postGeneralInformation);
generalRouter.post("/dataProponent", dataProponent_1.postDataProponent);
generalRouter.post("/problemDefinition", problemDefinition_1.postProblemDefinition);
exports.default = generalRouter;
//# sourceMappingURL=generalInformationRoute.js.map