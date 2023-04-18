import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SEED } from "../global/environment";

export const verificaToken = (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
       ok: false,
       mensaje: 'Invalid Token',
      });
     }
    
     const TOKEN = req.headers.authorization.split(" ")[1];
    
     jwt.verify(TOKEN, SEED, (err: any, decoded: any) => {
      if (err) {
       return res.status(401).json({
        ok: false,
        mensaje: 'Sesión expirada...',
        errors: err,
       });
      }
    
      req.user = decoded.user;
    
      next();
     });
  } catch (error) {
    return res.status(500).json({ ok: false, mensaje: "Invalid token", error });
  }
};
