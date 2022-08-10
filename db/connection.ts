// import {Sequelize} from 'sequelize-oracle';

const Sequelize = require('sequelize-oracle');

import oracledb from 'oracledb'; 

// oracledb.initOracleClient({ libDir: "C:Oracleinstantclient_21_6" });
let db: any;

db = new Sequelize('xepdb1', 'SYSTEM', '123456', {
    host: 'localhost',
    dialect: 'oracle',
    // logging: false,
});

export default db;