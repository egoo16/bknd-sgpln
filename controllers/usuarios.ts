import { Request, Response } from "express";
import Usuario from "../models/usuario";
const bcrypt = require('bcrypt');


export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll();

  res.json({
    usuarios,
  });
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findById(id);
  res.json({
    msg: "getUsuario",
    id,
    usuario
  });
};

export const postUsuario = (req: Request, res: Response) => {
  try {
    if (req.body) {
      const { body } = req;
      let usuario = {
        username: body.username,
        password: bcrypt.hashSync(body.password, 10),
        name: body.name,
        id_Institution: '1',
        name_Institution: 'INSTITUCION TEST'
      }
  
      res.json({
        msg: "postUsuario",
        body,
      });
    }

  } catch (error) {

  }

};

export const putUsuario = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  res.json({
    msg: "putUsuario",
    body,
    id,
  });
};

export const deleteUsuario = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    msg: "deleteUsuario",
    id,
  });
};
