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
    descriptionProblem: { type: sequelize_oracle_1.default.INTEGER },
    descriptionProblemDescription: { type: sequelize_oracle_1.default.STRING },
    generalObjective: { type: sequelize_oracle_1.default.INTEGER },
    generalObjectiveDescription: { type: sequelize_oracle_1.default.STRING },
    analysisDelimitation: { type: sequelize_oracle_1.default.INTEGER },
    analysisDelimitationDescription: { type: sequelize_oracle_1.default.STRING },
    terrainIdentification: { type: sequelize_oracle_1.default.INTEGER },
    terrainIdentificationDescription: { type: sequelize_oracle_1.default.STRING },
    legalSituation: { type: sequelize_oracle_1.default.INTEGER },
    legalSituationDescription: { type: sequelize_oracle_1.default.STRING },
    descriptionAnalysis: { type: sequelize_oracle_1.default.INTEGER },
    descriptionAnalysisDescription: { type: sequelize_oracle_1.default.STRING },
    descriptionGeneral: { type: sequelize_oracle_1.default.STRING },
    total: { type: sequelize_oracle_1.default.INTEGER },
    result: { type: sequelize_oracle_1.default.STRING }, // Pertinente o No Pertinente
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
exports.default = qualification;
//# sourceMappingURL=qualification.js.map