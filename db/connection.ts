// import {Sequelize} from 'sequelize-oracle';

import Sequelize from 'sequelize-oracle';

// import oracledb from 'oracledb'; 
import oracledb  from 'oracledb'; 

// oracledb.initOracleClient({ libDir: "C:Oracleinstantclient_21_6" });
let db: any;

// db = new Sequelize('xepdb1', 'SYSTEM', 'database', {
//     host: 'localhost',
//     dialect: 'oracle',
//     // logging: false,
// });
db = new Sequelize('osnip', 'PREINV2022', 'F6HRj3T0L3A', {
    host: '192.168.9.14',
    dialect: 'oracle',
    // logging: false,
});
export default db;