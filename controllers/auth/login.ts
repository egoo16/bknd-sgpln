import { Request, Response } from "express";
import Usuario from "../../models/usuario";
import jwt from "jsonwebtoken";

export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    if (body) {
      const usuario = await Usuario.findOne({
        where: { username: body.username },
      });

      if (usuario) {
        if (body.password === usuario.password) {
          //Creacion del Token

          const token = jwt.sign({ usuario }, "S33D-0F-P45W0ORD", {
            expiresIn: 14400,
          }); //4 horas de expiracion
          usuario.password = ":D";

          res.status(200).json({
            ok: true,
            usuario,
            id: usuario.id,
            token,
          });
        } else {
          return res
            .status(400)
            .json({ ok: false, error: "Credenciales Incorrectas" });
        }
      } else {
        return res
          .status(400)
          .json({ ok: false, error: "Credenciales Incorrectas" });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
