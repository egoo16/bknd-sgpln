import { Router } from "express";
import { addPertinenceQuality, createDenomination, createIdeaAlternativeComplete, createIdeaAlternativeFirstPart, createIdeaAlternativeSecondPart, getAlternative, getDenomination, getOneAlternative, getPertinencia, getPreinversion, listResults, updateIdeaAlternativeComplete } from "../../controllers";
import { verificaToken } from "../../middlewares/authentication";
import { createReferencePopulation, deleteDenomination, deleteReferencePopulation, getReferencePopulation, updateDenomination, updateReferencePopulation } from '../../controllers/sinafip/list.controller';

const preliminarRoute = Router();

// Demonimation
preliminarRoute.get("/denomination", getDenomination);
preliminarRoute.post("/denomination/", createDenomination);
preliminarRoute.delete("/denomination/:id", deleteDenomination);
preliminarRoute.put("/denomination/:id", updateDenomination);

// Reference Population
preliminarRoute.get("/referencePopulation", getReferencePopulation);
preliminarRoute.post("/referencePopulation/", createReferencePopulation);
preliminarRoute.delete("/referencePopulation/:id", deleteReferencePopulation);
preliminarRoute.put("/referencePopulation/:id", updateReferencePopulation);

// Alternative
preliminarRoute.get("/get-results/", verificaToken, listResults);
preliminarRoute.get("/preinversion/:id", getPreinversion);
preliminarRoute.get("/:id", getAlternative);
preliminarRoute.get("/one/:id", getOneAlternative);
preliminarRoute.get("/pertinencia/:id", getPertinencia);
preliminarRoute.post("/", verificaToken, createIdeaAlternativeComplete);
preliminarRoute.post("/first", createIdeaAlternativeFirstPart);
preliminarRoute.post("/second/:id", createIdeaAlternativeSecondPart);
preliminarRoute.put("/", verificaToken, updateIdeaAlternativeComplete);
preliminarRoute.post("/send-pertinencia/", verificaToken, addPertinenceQuality);


export default preliminarRoute;
