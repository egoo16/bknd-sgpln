import express from "express";
import db from "../db/connection";
import { SERVER_PORT } from "../global/environment";

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
      // await db.authenticate().then(() => {
      // await db.sync({ force: true }).then(() => {
      await db.sync().then(() => {
        console.log("Database online");
      });
    } catch (error) {
      throw new Error("Error de conexion: " + error);
    }
  }

  start(callback: () => void) {
    this.app.listen(this.port, callback);
  }
}
