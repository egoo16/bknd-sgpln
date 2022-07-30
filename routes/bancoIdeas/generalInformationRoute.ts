import { Router } from "express";
import { postDataProponent } from "../../controllers/dataProponent";
import { postGeneralInformation } from "../../controllers/generalInformation";
import { postProblemDefinition } from "../../controllers/problemDefinition";

const generalRouter = Router();

generalRouter.post("/", postGeneralInformation);
generalRouter.post("/dataProponent", postDataProponent);
generalRouter.post("/problemDefinition", postProblemDefinition);

export default generalRouter;
