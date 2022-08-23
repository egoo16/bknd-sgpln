"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generalInformation_1 = require("../../controllers/generalInformation");
const generalRouter = (0, express_1.Router)();
generalRouter.post("/information", generalInformation_1.postGeneralInformation);
generalRouter.get("/information", generalInformation_1.getGeneralInformation);
generalRouter.get("/send-idea", generalInformation_1.sendIdea);
generalRouter.get("/return-idea", generalInformation_1.returnIdea);
exports.default = generalRouter;
//# sourceMappingURL=generalInformationRoute.js.map