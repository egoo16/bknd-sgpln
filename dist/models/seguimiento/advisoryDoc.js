"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const comment_1 = __importDefault(require("./comment"));
const advisoryDoc = connection_1.default.define("advisoryDoc", {
    id: { type: sequelize_oracle_1.default.UUID, primaryKey: true, allowNull: false, defaultValue: sequelize_oracle_1.default.UUIDV4, },
    trackId: { type: sequelize_oracle_1.default.UUID },
    goal: { type: sequelize_oracle_1.default.STRING },
    action: { type: sequelize_oracle_1.default.STRING },
    unitSpecific: { type: sequelize_oracle_1.default.STRING },
    sectorization: { type: sequelize_oracle_1.default.STRING },
    subSectorization: { type: sequelize_oracle_1.default.STRING },
    menAttended: { type: sequelize_oracle_1.default.INTEGER },
    womenAttended: { type: sequelize_oracle_1.default.INTEGER },
    totalAttended: { type: sequelize_oracle_1.default.INTEGER },
    counselingModality: { type: sequelize_oracle_1.default.STRING },
    advTheme: { type: sequelize_oracle_1.default.STRING },
    snipCode: { type: sequelize_oracle_1.default.STRING },
    projectName: { type: sequelize_oracle_1.default.STRING },
    participant: { type: sequelize_oracle_1.default.STRING },
    analysisDate: { type: sequelize_oracle_1.default.STRING },
    advDate: { type: sequelize_oracle_1.default.STRING },
    assistant: { type: sequelize_oracle_1.default.STRING },
    conclusions: { type: sequelize_oracle_1.default.STRING(500) },
    recomend: { type: sequelize_oracle_1.default.STRING(500) },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
advisoryDoc.hasMany(comment_1.default, { foreignKey: "advisoryDocId", });
exports.default = advisoryDoc;
