"use strict";
// import {Sequelize} from 'sequelize-oracle';
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize-oracle');
// oracledb.initOracleClient({ libDir: "C:Oracleinstantclient_21_6" });
let db;
db = new Sequelize('xepdb1', 'SYSTEM', 'database', {
    host: 'localhost',
    dialect: 'oracle',
    // logging: false,
});
exports.default = db;
//# sourceMappingURL=connection.js.map