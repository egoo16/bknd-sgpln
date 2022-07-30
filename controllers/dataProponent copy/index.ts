import { Request, Response } from "express";
import dataProponent from "../../models/BancoIdeas/dataProponent";

export const postGeneralInformation = async (req: Request, res: Response) => {
	try {
		const { body } = req;

        const dataProponentModel = body;

        const dataIserted = await dataProponent.create(dataProponentModel);

	  
		res.status(201).json({
		  msg: "Datos de Quien Propone Insertados Correctamente",
          dataIserted
		});
	} catch (error) {
		res.status(500).json({
			msg: "No se pudo insertrar los Datos de Quien Propone",
			error
		  });
	}

};
