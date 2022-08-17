"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const denomination_1 = __importDefault(require("./denomination"));
const referencePopulation_1 = __importDefault(require("./referencePopulation"));
const populationDelimitation = connection_1.default.define("populationDelimitation", {
    codigo: {
        type: sequelize_oracle_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ideaAlternativeId: { type: sequelize_oracle_1.default.INTEGER, allowNull: false },
    referencePopulationId: { type: sequelize_oracle_1.default.INTEGER, allowNull: false },
    denominationId: { type: sequelize_oracle_1.default.INTEGER, allowNull: false },
    totalPopulation: { type: sequelize_oracle_1.default.INTEGER },
    gender: { type: sequelize_oracle_1.default.STRING },
    estimateBeneficiaries: { type: sequelize_oracle_1.default.INTEGER },
    preliminaryCharacterization: { type: sequelize_oracle_1.default.STRING },
    coverage: { type: sequelize_oracle_1.default.INTEGER },
}, {
    underscoded: true,
    paranoid: true,
});
populationDelimitation.belongsTo(referencePopulation_1.default, {
    foreignKey: "referencePopulationId",
    sourceKey: "codigo",
});
populationDelimitation.belongsTo(denomination_1.default, {
    foreignKey: "denominationId",
    sourceKey: "codigo",
});
exports.default = populationDelimitation;
//# sourceMappingURL=populationDelimitation.js.map