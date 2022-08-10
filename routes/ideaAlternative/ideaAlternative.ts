import { Router } from "express";
import { createIdeaAlternativeComplete, getPreinversion } from "../../controllers/alternativeIdea";

const preliminarRoute = Router();

preliminarRoute.get("/preinversion/:id", getPreinversion);
preliminarRoute.post("/", createIdeaAlternativeComplete);

export default preliminarRoute;
