"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const disasters = connection_1.default.define("disasters", {
    id: { type: sequelize_oracle_1.default.UUID, primaryKey: true, allowNull: false, defaultValue: sequelize_oracle_1.default.UUIDV4, },
    visitCardId: { type: sequelize_oracle_1.default.UUID },
    no: { type: sequelize_oracle_1.default.STRING },
    date: { type: sequelize_oracle_1.default.STRING },
    hour: { type: sequelize_oracle_1.default.STRING },
    eventType: { type: sequelize_oracle_1.default.STRING },
    causes: { type: sequelize_oracle_1.default.STRING },
    impact: { type: sequelize_oracle_1.default.STRING },
    recurrence: { type: sequelize_oracle_1.default.STRING },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
exports.default = disasters;
