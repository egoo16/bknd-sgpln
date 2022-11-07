"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const track = connection_1.default.define("track", {
    id: { type: sequelize_oracle_1.default.UUID, primaryKey: true, allowNull: false, defaultValue: sequelize_oracle_1.default.UUIDV4, },
    iapa: { type: sequelize_oracle_1.default.INTEGER },
    iapb: { type: sequelize_oracle_1.default.INTEGER },
    iapc: { type: sequelize_oracle_1.default.INTEGER },
    activity: { type: sequelize_oracle_1.default.STRING },
    reportDate: { type: sequelize_oracle_1.default.STRING },
    projectId: { type: sequelize_oracle_1.default.UUID },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
exports.default = track;
