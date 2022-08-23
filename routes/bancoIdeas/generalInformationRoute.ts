import { Router } from "express";
import { getGeneralInformation, postGeneralInformation, returnIdea, sendIdea } from "../../controllers/generalInformation";

const generalRouter = Router();

generalRouter.post("/information", postGeneralInformation);
generalRouter.get("/information", getGeneralInformation);
generalRouter.get("/send-idea", sendIdea);
generalRouter.get("/return-idea", returnIdea);

export default generalRouter;
