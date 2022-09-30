"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const executionTime_1 = __importDefault(require("./executionTime"));
const projectDescription = connection_1.default.define("projDesc", {
    codigo: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    AlterId: { type: sequelize_oracle_1.default.UUID, allowNull: false },
    projectType: { type: sequelize_oracle_1.default.STRING, allowNull: false },
    formulationProcess: { type: sequelize_oracle_1.default.STRING, allowNull: false },
    formulationProcessDescription: { type: sequelize_oracle_1.default.STRING },
    descriptionInterventions: { type: sequelize_oracle_1.default.STRING },
    complexity: { type: sequelize_oracle_1.default.STRING, allowNull: false },
    estimatedCost: { type: sequelize_oracle_1.default.INTEGER },
    investmentCost: { type: sequelize_oracle_1.default.INTEGER },
    fundingSources: { type: sequelize_oracle_1.default.INTEGER },
    foundingSourcesName: { type: sequelize_oracle_1.default.STRING },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
projectDescription.hasOne(executionTime_1.default, {
    foreignKey: "projDescId",
});
exports.default = projectDescription;
