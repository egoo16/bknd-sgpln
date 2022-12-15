"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const threatTypes = connection_1.default.define("threatTypes", {
    id: { type: sequelize_oracle_1.default.UUID, primaryKey: true, allowNull: false, defaultValue: sequelize_oracle_1.default.UUIDV4, },
    visitCardId: { type: sequelize_oracle_1.default.UUID },
    name: { type: sequelize_oracle_1.default.STRING },
    type: { type: sequelize_oracle_1.default.STRING },
    value: { type: sequelize_oracle_1.default.INTEGER },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
exports.default = threatTypes;
