import { Router } from "express";
import { getGeneralInformation, postGeneralInformation, returnIdea, sendIdea } from "../../controllers/generalInformation";
import { verificaToken } from "../../middlewares/authentication";

const generalRouter = Router();

generalRouter.post("/information", postGeneralInformation);
generalRouter.get("/information", getGeneralInformation);
generalRouter.get("/send-idea/:id", sendIdea);
generalRouter.get("/return-idea/:id", returnIdea);

export default generalRouter;
