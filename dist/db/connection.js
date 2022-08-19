"use strict";
// import {Sequelize} from 'sequelize-oracle';
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize-oracle');
// oracledb.initOracleClient({ libDir: "C:Oracleinstantclient_21_6" });
let db;
db = new Sequelize('xepdb1', 'SYSTEM', '123456', {
    host: 'localhost',
    dialect: 'oracle',
    // logging: false,
});
// db = new Sequelize('osnip', 'PREINV2022', 'F6HRj3T0L3A', {
//     host: '192.168.9.14',
//     dialect: 'oracle',
//     // logging: false,
// });
exports.default = db;
//# sourceMappingURL=connection.js.map