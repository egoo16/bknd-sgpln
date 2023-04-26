import { Router } from "express";
import { loginUsuario, renovarToken } from "../../controllers/auth/login";
import { verificaToken } from "../../middlewares/authentication";


const loginRouter = Router();


loginRouter.post("/", loginUsuario);
loginRouter.get('/refresh-token', verificaToken, renovarToken);


export default loginRouter;
