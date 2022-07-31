import { Request, Response } from "express";
import possibleAlternatives from "../../models/BancoIdeas/possibleAlternatives";
import preliminaryDefinition from "../../models/BancoIdeas/preliminaryDefinition";

export const postPreliminaryDefinition = async (req: Request, res: Response) => {
	try {
		const { body } = req;

        const insertModel = body;
		
        const dataIserted = await preliminaryDefinition.create(insertModel);

		const alternatives = body.alternatives;

		let resAlternatives = await Promise.all(alternatives.map(async (alternative: any) => {
			alternative.preliminaryDefinitionId = dataIserted.codigo;
			let res = await possibleAlternatives.create(alternative);
			return res;
		}));
	  
		res.status(201).json({
		  msg: "Definicion Preliminar Insertados Correctamente",
          dataIserted
		});
	} catch (error) {
		res.status(500).json({
			msg: "No se pudo insertrar Definicion Preliminar",
			error
		  });
	}

};
