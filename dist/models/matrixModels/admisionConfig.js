"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admisionConfig = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
exports.admisionConfig = connection_1.default.define('admisionConfig', {
    id: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4
    },
    statementMaxValue: { type: sequelize_oracle_1.default.INTEGER },
    beneficiariestMaxValue: { type: sequelize_oracle_1.default.INTEGER },
    goalsMaxValue: { type: sequelize_oracle_1.default.INTEGER },
    tdrMaxValue: { type: sequelize_oracle_1.default.INTEGER },
    costMaxValue: { type: sequelize_oracle_1.default.INTEGER },
    scheduleMaxValue: { type: sequelize_oracle_1.default.INTEGER },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
