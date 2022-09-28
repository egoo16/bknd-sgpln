import { Router } from "express";
// Importaciones
import appRouter from "./app";
import loginRouter from "./auth/login";
import generalRouter from "./bancoIdeas/generalInformationRoute";
import UPLOAD_ROUTER from "./files/uploads";
import ideaAlternative from "./ideaAlternative/ideaAlternative";
import integrations from "./integrations/integrations";
import usuarioRouter from "./usuarios";

const router = Router();

// Rutas
router.use("/api/upload/", UPLOAD_ROUTER);
router.use("/api/integrations/", integrations);
router.use("/api/alternative/", ideaAlternative);
router.use("/api/general/", generalRouter);
router.use("/api/login/", loginRouter);
router.use("/api/usuarios/", usuarioRouter);
router.use("/", appRouter);

export default router;
