import { Router } from "express";
import { createIdeaAlternativeComplete } from "../../controllers/alternativeIdea";

const preliminarRoute = Router();

preliminarRoute.post("/", createIdeaAlternativeComplete);

export default preliminarRoute;
