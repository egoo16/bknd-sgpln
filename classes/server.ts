import express from 'express';
import sequelize from '../db/connection';
import { SERVER_PORT } from '../global/environment';

export default class Server {
    public app: express.Application;
    public port: number;

    constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.dbConnection()
    }

   async dbConnection() {
    try {
        
        await sequelize.authenticate();
        console.log('Database online');
    }
    catch (error) {
        throw new Error('Error de conexion: ' + error);
    }
    
   }
    
    start(callback: () => void) {
        this.app.listen(this.port, callback);
    }
}