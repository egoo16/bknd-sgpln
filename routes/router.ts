import { Router } from "express";
// Importaciones
import appRouter from "./app";
import loginRouter from "./auth/login";
import generalRouter from "./bancoIdeas/generalInformationRoute";
import UPLOAD_ROUTER from "./files/uploads";
import ideaAlternative from "./ideaAlternative/ideaAlternative";
import integrations from "./integrations/integrations";
import usuarioRouter from "./usuarios";
import sinafipRouter from  './sinafip/sinafip.route'
import READ_FILE_ROUTER from "./files/readFile";
import seguimientoRouter from "./seguimiento/seguimiento.route";

const router = Router();

const prefix= 'api'
// Rutas
router.use("/api/readFile", READ_FILE_ROUTER);
router.use("/api/upload/", UPLOAD_ROUTER);
router.use(`/${prefix}/seguimiento/`,seguimientoRouter)
router.use(`/${prefix}/sinafip/`,sinafipRouter)
router.use(`/${prefix}/integrations/`, integrations);
router.use(`/${prefix}/alternative/`, ideaAlternative);
router.use(`/${prefix}/general/`, generalRouter);
router.use(`/${prefix}/login/`, loginRouter);
router.use(`/${prefix}/usuarios/`, usuarioRouter);
router.use(`/`, appRouter);

export default router;
