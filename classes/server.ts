import express from "express";
import db from "../db/connection";
import { SERVER_PORT } from "../global/environment";
import { admissionConfig } from "../models";
import { relevanceBeneficiaries, relevanceComplexy, relevanceInvestment, relevanceStage } from "../models/matrixModels/relevanceConfig";

export default class Server {
  public app: express.Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.dbConnection();
  }

  async dbConnection() {
    try {
      await db.authenticate().then(() => {
      // await db.sync({ force: true }).then(() => {
      // await db.sync().then(() => {
        console.log("Database online");
      });

      
      // await admisionConfig.sync({ force: true });
      // await relevanceInvestment.sync({ force: true });
      // await relevanceBeneficiaries.sync({ force: true });
      // await relevanceComplexy.sync({ force: true });
      // await relevanceStage.sync({ force: true });



      // await advisedEntity.sync({ force: true });
      // await subSectorization.sync({ force: true });
      // await institutionEntity.sync({ force: true });
      // await documentFinance.sync({ force: true });
      // await visitCard.sync({force: true})
      // await requestEntity.sync({force: true});
    } catch (error) {
      throw new Error("Error de conexion: " + error);
    }
  }

  start(callback: () => void) {
    this.app.listen(this.port, callback);
  }
}
