import { Request, Response } from "express";
import problemDefinition from "../../models/BancoIdeas/problemDefinition";

export const postProblemDefinition = async (req: Request, res: Response) => {
	try {
		const { body } = req;

        const insertModel = body;

        const dataIserted = await problemDefinition.create(insertModel);

	  
		res.status(201).json({
		  msg: "Definicion de Problemas Insertados Correctamente",
          dataIserted
		});
	} catch (error) {
		res.status(500).json({
			msg: "No se pudo insertrar Definicion de Problemas",
			error
		  });
	}

};
