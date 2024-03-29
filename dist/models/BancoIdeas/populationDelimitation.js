"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const denomination_1 = __importDefault(require("./denomination"));
const populationAlt_1 = __importDefault(require("./populationAlt"));
const referencePopulation_1 = __importDefault(require("./referencePopulation"));
const populationDelimitation = connection_1.default.define("popDelimit", {
    codigo: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    AlterId: { type: sequelize_oracle_1.default.UUID, allowNull: false },
    refPopId: { type: sequelize_oracle_1.default.UUID, allowNull: false },
    denId: { type: sequelize_oracle_1.default.UUID, allowNull: false },
    totalPopulation: { type: sequelize_oracle_1.default.INTEGER },
    gender: { type: sequelize_oracle_1.default.STRING },
    estimateBeneficiaries: { type: sequelize_oracle_1.default.INTEGER },
    preliminaryCharacterization: { type: sequelize_oracle_1.default.STRING },
    coverage: { type: sequelize_oracle_1.default.INTEGER },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
populationDelimitation.hasMany(populationAlt_1.default, { foreignKey: "popId" });
populationDelimitation.belongsTo(referencePopulation_1.default, {
    foreignKey: "refPopId",
    sourceKey: "codigo",
});
populationDelimitation.belongsTo(denomination_1.default, {
    foreignKey: "denId",
    sourceKey: "codigo",
});
exports.default = populationDelimitation;
