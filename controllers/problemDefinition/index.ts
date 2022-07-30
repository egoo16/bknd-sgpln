import { Request, Response } from "express";
import possibleCauses from "../../models/BancoIdeas/possibleCauses";
import possibleEffects from "../../models/BancoIdeas/possibleEffects";
import problemDefinition from "../../models/BancoIdeas/problemDefinition";

export const postProblemDefinition = async (req: Request, res: Response) => {
	try {
		const { body } = req;

        const insertModel = body;
		
        const dataIserted = await problemDefinition.create(insertModel);

		const effects = body.effects;

		let resEffects = await Promise.all(effects.map(async (effect: any) => {
			effect.problemDefinitionId = dataIserted.codigo;
			let res = await possibleEffects.create(effect);
			return res;
		}));

		const causes = body.causes;

		let resCauses = await Promise.all(causes.map(async (cause: any) => {
			cause.problemDefinitionId = dataIserted.codigo;
			let res = await possibleCauses.create(cause);
			return res;
		}));

	  
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
