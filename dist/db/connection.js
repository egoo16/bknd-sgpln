"use strict";
// import {Sequelize} from 'sequelize-oracle';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
// oracledb.initOracleClient({ libDir: "C:Oracleinstantclient_21_6" });
let db;
// db = new Sequelize('xepdb1', 'SYSTEM', 'database', {
//     host: 'localhost',
//     dialect: 'oracle',
//     // logging: false,
// });
db = new sequelize_oracle_1.default('desa', 'PREINV2022', 'F6HRj3T0L3A', {
    host: '192.168.8.11',
    dialect: 'oracle',
    // logging: false,
});
exports.default = db;
