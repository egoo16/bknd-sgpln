import { Router } from "express";
import { loginUsuario } from "../../controllers/auth/login";


const loginRouter = Router();


loginRouter.post("/", loginUsuario);


export default loginRouter;
