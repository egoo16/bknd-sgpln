import { Router } from "express";
import { postUsuario } from "../controllers/auth/login";
import {
  deleteUsuario,
  getUsuario,
  getUsuarios,
  putUsuario,
} from "../controllers/auth/usuarios";
import { verificaToken } from "../middlewares/authentication";

const usuarioRouter = Router();

// usuarioRouter.get("/", getUsuarios);
// usuarioRouter.get("/:id",verificaToken, getUsuario);
usuarioRouter.post("/", postUsuario);
// usuarioRouter.put("/", putUsuario);
// usuarioRouter.delete("/", deleteUsuario);

export default usuarioRouter;
