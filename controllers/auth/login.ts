import { Request, Response } from "express";
import Usuario from "../../models/usuario";
import jwt from "jsonwebtoken";
import { SEED } from '../../global/environment';
const bcrypt = require('bcrypt');

export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    if (body) {

      const usuarios = await Usuario.findAll();

      if (!usuarios || usuarios.length <= 0) {

        let userTest = {
          username: 'normal',
          password: bcrypt.hashSync('123456', 10),
          name: 'Usuario Externo de Prueba',
          id_inst: '9000',
          name_inst: 'MINISTERIO DE SALUD PUBLICA Y ASISTENCIA SOCIAL',
          role: 'USER_ROLE',

        };
        let userTestCreate = await Usuario.create(userTest);

        userTest = {
          username: 'admin',
          password: bcrypt.hashSync('123456', 10),
          name: 'Usuario Administrador de Prueba',
          id_inst: '1',
          name_inst: 'INSTITUCION TEST',
          role: 'ADMIN_ROLE',

        };
        userTestCreate = await Usuario.create(userTest);

      }

      const usuario = await Usuario.findOne({
        where: { username: body.username },
      });

      if (usuario) {
        if (bcrypt.compareSync(body.password, usuario.password)) {
          usuario.password = ":D";
          //Creacion del Token

          const token = jwt.sign({ usuario }, SEED, {
            expiresIn: 14400,
          }); //4 horas de expiracion

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
