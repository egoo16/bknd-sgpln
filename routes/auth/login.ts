import { Router } from "express";
import { loginUsuario, renovarToken } from "../../controllers/auth/login";
import { verificaToken } from "../../middlewares/authentication";


const loginRouter = Router();


loginRouter.post("/", loginUsuario);
loginRouter.get('/renuevatoken', renovarToken);


export default loginRouter;
