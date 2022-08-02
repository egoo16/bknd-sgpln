import { Request, Response } from "express";
import generalInformation from "../../models/BancoIdeas/generalInformation";
import sequelize from "sequelize-oracle";
import models from "../../db/connection";

export const postGeneralInformation = async (req: Request, res: Response) => {
  let transaction = await models.transaction();
  try {
    const { body } = req;
    const informationModel = body;
	
    const correlative = await generalInformation.max("correlation");
	if (correlative){
		informationModel.correlation = parseInt(correlative, 10) + 1;
	} else {
		informationModel.correlation =  1;
	}

    const informationIsert = await generalInformation.create(informationModel, {
      transaction,
    });

    await transaction.commit();

    res.status(201).json({
      msg: "ideaIsertada Correctamente",
	  informationModel,
      informationIsert,
      correlative,
    });
  } catch (error) {
	transaction.rollback();
    res.status(500).json({
      msg: "No se pudo insertrar la Información General",
      error,
    });
  }
};

export const getGeneralInformation = async (req: Request, res: Response) => {
  try {

    const generalInformations = await generalInformation.findAll();

    res.status(201).json({
      msg: "Datos Obtenidos",
      generalInformations,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error,
    });
  }
};
