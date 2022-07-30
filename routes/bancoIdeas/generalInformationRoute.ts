import { Router } from "express";
import { postGeneralInformation } from "../../controllers/generalInformation";


const generalRouter = Router();


generalRouter.post("/", postGeneralInformation);


export default generalRouter;
 