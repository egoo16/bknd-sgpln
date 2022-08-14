import { Router } from "express";
import { getGeograficos, getObjetos, getProcesos, getProductos } from "../../controllers/integrations";
const integrationsRouter = Router();

integrationsRouter.get("/geograficos", getGeograficos);
integrationsRouter.get("/procesos", getProcesos);
integrationsRouter.get("/objetos", getObjetos);
integrationsRouter.get("/productos", getProductos);

export default integrationsRouter;
