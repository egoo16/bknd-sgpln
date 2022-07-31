import { Request, Response } from "express";
import generalInformation from '../../models/BancoIdeas/generalInformation';

export const postGeneralInformation = async (req: Request, res: Response) => {
	try {
		const { body } = req;

		const informationModel = body;
		const informationIsert = await generalInformation.create(informationModel); 
	  
		res.status(201).json({
		  msg: "ideaIsertada Correctamente",
		  informationIsert,
		});
	} catch (error) {
		res.status(500).json({
			msg: "No se pudo insertrar la Información General",
			error
		  });
	}

};
