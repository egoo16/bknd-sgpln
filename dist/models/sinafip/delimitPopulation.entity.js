"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const delimitPopulation = connection_1.default.define("delimitPopulation", {
    id: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    type: { type: sequelize_oracle_1.default.STRING },
    total: { type: sequelize_oracle_1.default.INTEGER },
    delimitId: { type: sequelize_oracle_1.default.UUID, allowNull: false },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
exports.default = delimitPopulation;
