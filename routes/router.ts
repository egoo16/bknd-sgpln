import { Router } from "express";
// Importaciones
import appRouter from "./app";
import loginRouter from "./auth/login";
import generalRouter from "./bancoIdeas/generalInformationRoute";
import ideaAlternative from "./ideaAlternative/ideaAlternative";
import integrations from "./integrations/integrations";
import usuarioRouter from "./usuarios";
import sinafipRouter from  './sinafip/sinafip.route'

const router = Router();

const prefix= 'api'
// Rutas
router.use(`/${prefix}/sinafip/`,sinafipRouter)
router.use("/api/integrations/", integrations);
router.use("/api/alternative/", ideaAlternative);
router.use("/api/general/", generalRouter);
router.use("/api/login/", loginRouter);
router.use("/api/usuarios/", usuarioRouter);
router.use("/", appRouter);

export default router;
