"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.povertyIndex = void 0;
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
exports.povertyIndex = connection_1.default.define('povertyIndex', {
    id: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4
    },
    name: {
        type: sequelize_oracle_1.default.STRING,
    },
    indice: {
        type: sequelize_oracle_1.default.DECIMAL,
    },
    isMunicipio: {
        type: sequelize_oracle_1.default.BOOLEAN,
    },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
