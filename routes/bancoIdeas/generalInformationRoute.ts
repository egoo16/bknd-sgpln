import { Router } from "express";
import { getGeneralInformation, postGeneralInformation } from "../../controllers/generalInformation";
import { postProblemDefinition } from "../../controllers/problemDefinition";

const generalRouter = Router();

generalRouter.post("/information", postGeneralInformation);
generalRouter.get("/information", getGeneralInformation);
generalRouter.post("/problemDefinition", postProblemDefinition);
generalRouter.post("/preliminary", postProblemDefinition);

export default generalRouter;
