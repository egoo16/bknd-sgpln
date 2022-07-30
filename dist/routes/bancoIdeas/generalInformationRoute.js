"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generalInformation_1 = require("../../controllers/generalInformation");
const generalRouter = (0, express_1.Router)();
generalRouter.post("/", generalInformation_1.postGeneralInformation);
exports.default = generalRouter;
//# sourceMappingURL=generalInformationRoute.js.map