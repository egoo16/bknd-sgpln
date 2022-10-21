"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const qualification = connection_1.default.define("qualification", {
    codigo: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    AlterId: { type: sequelize_oracle_1.default.UUID, required: true },
    descProblem: { type: sequelize_oracle_1.default.INTEGER },
    descProblemComment: { type: sequelize_oracle_1.default.STRING },
    generalObjct: { type: sequelize_oracle_1.default.INTEGER },
    generalObjctComment: { type: sequelize_oracle_1.default.STRING },
    anlysDelimitation: { type: sequelize_oracle_1.default.INTEGER },
    anlysDelimitationComment: { type: sequelize_oracle_1.default.STRING },
    terrainIdent: { type: sequelize_oracle_1.default.INTEGER },
    terrainIdentComment: { type: sequelize_oracle_1.default.STRING },
    legalSituation: { type: sequelize_oracle_1.default.INTEGER },
    legalSituationComment: { type: sequelize_oracle_1.default.STRING },
    terreno: { type: sequelize_oracle_1.default.STRING(2000) },
    descAnlys: { type: sequelize_oracle_1.default.INTEGER },
    descAnlysComment: { type: sequelize_oracle_1.default.STRING },
    descriptionGeneral: { type: sequelize_oracle_1.default.STRING },
    total: { type: sequelize_oracle_1.default.INTEGER },
    result: { type: sequelize_oracle_1.default.STRING }, // Pertinente o No Pertinente
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
exports.default = qualification;
