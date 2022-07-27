import { Router } from "express";
import {
  deleteUsuario,
  getUsuario,
  getUsuarios,
  postUsuario,
  putUsuario,
} from "../controllers/usuarios";

const usuarioRouter = Router();

usuarioRouter.get("/", getUsuarios);
usuarioRouter.get("/:id", getUsuario);
usuarioRouter.post("/", postUsuario);
usuarioRouter.put("/", putUsuario);
usuarioRouter.delete("/", deleteUsuario);

export default usuarioRouter;
