"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const responsibleEntity = connection_1.default.define("resEntity", {
    codigo: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    AlterId: { type: sequelize_oracle_1.default.UUID, allowNull: false },
    nameEPI: { type: sequelize_oracle_1.default.STRING },
    executionUnit: { type: sequelize_oracle_1.default.STRING },
    leaderName: { type: sequelize_oracle_1.default.STRING },
    email: { type: sequelize_oracle_1.default.STRING },
    phone: { type: sequelize_oracle_1.default.STRING },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
exports.default = responsibleEntity;
