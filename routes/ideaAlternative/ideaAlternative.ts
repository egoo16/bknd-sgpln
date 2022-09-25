import { Router } from "express";
import { addPertinenceQuality, createIdeaAlternativeComplete, updateIdeaAlternativeComplete, getAlternative, getDenomination, getPertinencia, getPreinversion, getReferencePopulation } from "../../controllers/alternativeIdea";

const preliminarRoute = Router();

preliminarRoute.get("/preinversion/:id", getPreinversion);
preliminarRoute.post("/", createIdeaAlternativeComplete);
preliminarRoute.put("/", updateIdeaAlternativeComplete);
preliminarRoute.get("/denomination", getDenomination);
preliminarRoute.get("/referencePopulation", getReferencePopulation);
preliminarRoute.get("/:id", getAlternative);
preliminarRoute.get("/pertinencia/:id", getPertinencia);
preliminarRoute.post("/send-pertinencia/", addPertinenceQuality);


export default preliminarRoute;
