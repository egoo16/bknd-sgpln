import { Router } from "express";
import { postDataProponent } from "../../controllers/dataProponent";
import { postGeneralInformation } from "../../controllers/generalInformation";

const generalRouter = Router();

generalRouter.post("/", postGeneralInformation);
generalRouter.post("/dataProponent", postDataProponent);

export default generalRouter;
