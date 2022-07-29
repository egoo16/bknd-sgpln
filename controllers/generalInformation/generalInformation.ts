import { Request, Response } from "express";
import idea from "../../models/BancoIdeas/idea";
import sectionBI from "../../models/BancoIdeas/sectionBi";

export const postGeneralInformation = async (req: Request, res: Response) => {
  const { body } = req;

  const now = new Date();
  const milisegundos = now.getMilliseconds();

  const nameIdea = "idea-" + milisegundos;

  const ideaModel = {
    name: nameIdea,
  };

  const ideaInserted = await idea.create(ideaModel);

  const sectionModel = {
    name: nameIdea,
    IdeaId: ideaInserted.codigo,
  }

  const sectionIserted = await sectionBI.create(sectionModel);

  res.json({
    msg: "ideaIsertada Correctamente",
    ideaInserted,
    sectionIserted,
  });
};
