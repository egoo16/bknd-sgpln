"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const possibleAlternatives_1 = __importDefault(require("./possibleAlternatives"));
const possibleCauses_1 = __importDefault(require("./possibleCauses"));
const possibleEffects_1 = __importDefault(require("./possibleEffects"));
const qualification_1 = __importDefault(require("./qualification"));
const stage_1 = __importDefault(require("./stage"));
const generalInformation = connection_1.default.define("generalInformation", {
    codigo: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    idStage: { type: sequelize_oracle_1.default.UUID, required: true },
    productId: { type: sequelize_oracle_1.default.STRING },
    productName: { type: sequelize_oracle_1.default.STRING },
    date: { type: sequelize_oracle_1.default.DATE },
    correlation: { type: sequelize_oracle_1.default.INTEGER },
    registerCode: { type: sequelize_oracle_1.default.STRING },
    planningInstrument: { type: sequelize_oracle_1.default.BOOLEAN, allowNull: false },
    description: { type: sequelize_oracle_1.default.STRING },
    dateOut: { type: sequelize_oracle_1.default.DATE },
    punctuation: { type: sequelize_oracle_1.default.INTEGER },
    state: { type: sequelize_oracle_1.default.BOOLEAN, defaultValue: true },
    idEntity: { type: sequelize_oracle_1.default.STRING, required: true, allowNull: false },
    nameEntity: { type: sequelize_oracle_1.default.STRING, required: true, allowNull: false },
    responsibleName: {
        type: sequelize_oracle_1.default.STRING,
        required: true,
        allowNull: false,
    },
    email: { type: sequelize_oracle_1.default.STRING, required: true, allowNull: false },
    phone: { type: sequelize_oracle_1.default.STRING, required: true, allowNull: false },
    definitionPotentiality: { type: sequelize_oracle_1.default.STRING },
    baseLine: { type: sequelize_oracle_1.default.STRING },
    descriptionCurrentSituation: { type: sequelize_oracle_1.default.STRING },
    generalObjective: { type: sequelize_oracle_1.default.STRING },
    expectedChange: { type: sequelize_oracle_1.default.STRING },
}, {
    underscoded: true,
    paranoid: true,
});
generalInformation.hasMany(possibleEffects_1.default, {
    foreignKey: "generalInformationId",
});
generalInformation.hasMany(possibleCauses_1.default, {
    foreignKey: "generalInformationId",
});
generalInformation.hasMany(possibleAlternatives_1.default, {
    foreignKey: "generalInformationId",
});
generalInformation.hasOne(qualification_1.default, { foreignKey: "generalInformationId" });
generalInformation.belongsTo(stage_1.default, {
    foreignKey: "idStage",
    sourceKey: "codigo",
});
exports.default = generalInformation;
//# sourceMappingURL=generalInformation.js.map