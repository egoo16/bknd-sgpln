import { Router, Request, Response } from "express";

const appRouter = Router();

appRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    mensaje: "Bienvenido bro!",
  });
});

export default appRouter;