import { Router } from "express";
import { createPreleminaryName } from "../../controllers/alternativeIdea";

const preliminarRoute = Router();

preliminarRoute.post("/name", createPreleminaryName);

export default preliminarRoute;
