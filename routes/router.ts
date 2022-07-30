import { Router } from "express";
// Importaciones
import appRouter from "./app";
import loginRouter from "./auth/login";
import generalRouter from "./bancoIdeas/generalInformationRoute";
import usuarioRouter from "./usuarios";

const router = Router();

// Rutas
router.use("/api/general/", generalRouter);
router.use("/api/login/", loginRouter);
router.use("/api/usuarios/", usuarioRouter);
router.use("/", appRouter);

export default router;
