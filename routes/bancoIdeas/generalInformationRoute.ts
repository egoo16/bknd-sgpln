import { Router } from "express";
import { getGeneralInformation, postGeneralInformation } from "../../controllers/generalInformation";

const generalRouter = Router();

generalRouter.post("/information", postGeneralInformation);
generalRouter.get("/information", getGeneralInformation);

export default generalRouter;
