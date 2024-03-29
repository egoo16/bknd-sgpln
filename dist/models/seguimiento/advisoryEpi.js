"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const advisoryEpi = connection_1.default.define("advisoryEpi", {
    id: { type: sequelize_oracle_1.default.UUID, primaryKey: true, allowNull: false, defaultValue: sequelize_oracle_1.default.UUIDV4, },
    trackId: { type: sequelize_oracle_1.default.UUID },
    goal: { type: sequelize_oracle_1.default.STRING },
    action: { type: sequelize_oracle_1.default.STRING },
    unitSpecific: { type: sequelize_oracle_1.default.STRING },
    sectorization: { type: sequelize_oracle_1.default.STRING },
    subSectorization: { type: sequelize_oracle_1.default.STRING },
    advTheme: { type: sequelize_oracle_1.default.STRING },
    participantName: { type: sequelize_oracle_1.default.STRING },
    participantPosition: { type: sequelize_oracle_1.default.STRING },
    menAttended: { type: sequelize_oracle_1.default.INTEGER },
    womenAttended: { type: sequelize_oracle_1.default.INTEGER },
    totalAttended: { type: sequelize_oracle_1.default.INTEGER },
    advDate: { type: sequelize_oracle_1.default.STRING },
    reportDate: { type: sequelize_oracle_1.default.STRING },
    counselingModality: { type: sequelize_oracle_1.default.STRING },
    place: { type: sequelize_oracle_1.default.STRING },
    objective: { type: sequelize_oracle_1.default.STRING(1000) },
    devAdv: { type: sequelize_oracle_1.default.STRING(1500) },
    conclusions: { type: sequelize_oracle_1.default.STRING(1000) },
    commitments: { type: sequelize_oracle_1.default.STRING(1000) },
    specialist: { type: sequelize_oracle_1.default.STRING },
    doc: { type: sequelize_oracle_1.default.STRING },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
exports.default = advisoryEpi;
