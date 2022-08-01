"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const populationDelimitation = connection_1.default.define("populationDelimitation", {
    codigo: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    ideaAlternativeId: { type: sequelize_oracle_1.default.UUID, allowNull: false },
    referencePopulationId: { type: sequelize_oracle_1.default.UUID, allowNull: false },
    denominationId: { type: sequelize_oracle_1.default.UUID, allowNull: false },
    totalPopulation: { type: sequelize_oracle_1.default.INTEGER },
    estimateBeneficiaries: { type: sequelize_oracle_1.default.INTEGER },
    preliminaryCharacterization: { type: sequelize_oracle_1.default.STRING },
    coverage: { type: sequelize_oracle_1.default.INTEGER },
}, {
    underscoded: true,
    paranoid: true,
});
exports.default = populationDelimitation;
//# sourceMappingURL=populationDelimitation.js.map