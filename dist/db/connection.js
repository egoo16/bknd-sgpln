"use strict";
// import {Sequelize} from 'sequelize-oracle';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize-oracle');
// import oracledb from 'oracledb'; 
const oracledb_1 = __importDefault(require("oracledb"));
oracledb_1.default.maxRows = 0;
// oracledb.initOracleClient({ libDir: "C:Oracleinstantclient_21_6" });
let db;
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
exports.default = db;
//# sourceMappingURL=connection.js.map