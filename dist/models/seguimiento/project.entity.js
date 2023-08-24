"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const track_entity_1 = __importDefault(require("./track.entity"));
const project = connection_1.default.define("project", {
    id: {
        type: sequelize_oracle_1.default.UUID, primaryKey: true, allowNull: false, defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    author: { type: sequelize_oracle_1.default.STRING },
    correlative: { type: sequelize_oracle_1.default.INTEGER },
    process: { type: sequelize_oracle_1.default.STRING },
    sector: { type: sequelize_oracle_1.default.STRING },
    depto: { type: sequelize_oracle_1.default.STRING },
    munic: { type: sequelize_oracle_1.default.STRING },
    nameProject: { type: sequelize_oracle_1.default.STRING },
    ministry: { type: sequelize_oracle_1.default.STRING },
    isMinistry: { type: sequelize_oracle_1.default.BOOLEAN },
    legalLand: { type: sequelize_oracle_1.default.BOOLEAN },
    agripManage: { type: sequelize_oracle_1.default.BOOLEAN },
    snipCode: { type: sequelize_oracle_1.default.STRING },
    observations: { type: sequelize_oracle_1.default.STRING(1100) },
    advance: { type: sequelize_oracle_1.default.INTEGER },
    status: { type: sequelize_oracle_1.default.STRING },
    createdAt: { type: sequelize_oracle_1.default.DATE, field: 'createdAt' }
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
project.hasMany(track_entity_1.default, { foreignKey: "projectId" });
exports.default = project;
