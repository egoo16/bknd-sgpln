import { Router } from "express";
import { postGeneralInformation } from "../../controllers/generalInformation";
import { postProblemDefinition } from "../../controllers/problemDefinition";

const generalRouter = Router();

generalRouter.post("/information", postGeneralInformation);
generalRouter.post("/problemDefinition", postProblemDefinition);
generalRouter.post("/preliminary", postProblemDefinition);

export default generalRouter;
