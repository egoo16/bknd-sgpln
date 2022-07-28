import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SEED } from "../global/environment";

export const verificaToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = String(req.query.token);
    if (token) {
      const verify: any = jwt.verify(token, SEED);

      if (!verify) {
        return res.status(401).json({ ok: false, error: "Invalid token" });
      }
      req.body.usuario = verify.usuario;
      next()
    //   res.status(200).json({ ok: true, verify})
    }
  } catch (error) {
    return res.status(500).json({ ok: false, mensaje: "Invalid token", error });
  }
};
