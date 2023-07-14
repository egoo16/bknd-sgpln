"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const comment = connection_1.default.define("comment", {
    id: { type: sequelize_oracle_1.default.UUID, primaryKey: true, allowNull: false, defaultValue: sequelize_oracle_1.default.UUIDV4, },
    advisoryDocId: { type: sequelize_oracle_1.default.UUID },
    theme: { type: sequelize_oracle_1.default.STRING },
    description: { type: sequelize_oracle_1.default.STRING(1000) },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
exports.default = comment;
