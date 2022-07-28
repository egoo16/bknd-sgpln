import { Request, Response } from "express";
import Usuario from "../models/usuario";
import Idea from '../models/BancoIdeas/idea';


export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll();
  const ideas = await Idea.findAll();

  res.json({
    usuarios,
  });
};

export const getUsuario = async(req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findById(id);
  res.json({
    msg: "getUsuario",
    id,
    usuario
  });
};

export const postUsuario = (req: Request, res: Response) => {
  const { body } = req;

  res.json({
    msg: "postUsuario",
    body,
  });
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
