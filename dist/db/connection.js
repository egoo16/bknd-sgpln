"use strict";
// import {Sequelize} from 'sequelize-oracle';
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize-oracle');
// oracledb.initOracleClient({ libDir: "C:Oracleinstantclient_21_6" });
let sequelize;
sequelize = new Sequelize('xepdb1', 'SYSTEM', 'database', {
    host: 'localhost',
    dialect: 'oracle',
    // logging: false,
});
exports.default = sequelize;
//# sourceMappingURL=connection.js.map