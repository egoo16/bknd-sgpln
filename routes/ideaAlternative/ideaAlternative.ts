import { Router } from "express";
import { addPertinenceQuality, createIdeaAlternativeComplete, updateIdeaAlternativeComplete, getAlternative, getDenomination, getPertinencia, getPreinversion, getReferencePopulation } from "../../controllers/alternativeIdea";
import { verificaToken } from "../../middlewares/authentication";

const preliminarRoute = Router();

preliminarRoute.get("/preinversion/:id", getPreinversion);
preliminarRoute.post("/", verificaToken, createIdeaAlternativeComplete);
preliminarRoute.put("/", verificaToken, updateIdeaAlternativeComplete);
preliminarRoute.get("/denomination", getDenomination);
preliminarRoute.get("/referencePopulation", getReferencePopulation);
preliminarRoute.get("/:id", getAlternative);
preliminarRoute.get("/pertinencia/:id", getPertinencia);
preliminarRoute.post("/send-pertinencia/", verificaToken, addPertinenceQuality);


export default preliminarRoute;
