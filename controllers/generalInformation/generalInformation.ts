import { Request, Response } from "express";
import idea from "../../models/BancoIdeas/idea";
import sectionBI from "../../models/BancoIdeas/sectionBi";
import generalInformation from '../../models/BancoIdeas/generalInformation';

export const postGeneralInformation = async (req: Request, res: Response) => {
	try {
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
		};
	  
		const sectionIserted = await sectionBI.create(sectionModel);
		const informationModel = body;
		informationModel.sectionBI = sectionIserted.codigo;
	  
		const informationIsert = await generalInformation.create(informationModel); 
	  
		res.status(201).json({
		  msg: "ideaIsertada Correctamente",
		  ideaInserted,
		  sectionIserted,
		  informationIsert,
		});
	} catch (error) {
		res.status(500).json({
			msg: "No se pudo insertrar la Información General",
			error
		  });
	}

};
