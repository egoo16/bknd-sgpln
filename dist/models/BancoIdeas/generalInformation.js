"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const ideaAlternative_1 = __importDefault(require("./ideaAlternative"));
const possibleCauses_1 = __importDefault(require("./possibleCauses"));
const possibleEffects_1 = __importDefault(require("./possibleEffects"));
const stage_1 = __importDefault(require("./stage"));
const possibleAlternatives_1 = __importDefault(require("./possibleAlternatives"));
const generalInformation = connection_1.default.define("Information", {
    codigo: {
        type: sequelize_oracle_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idStage: { type: sequelize_oracle_1.default.INTEGER, required: true },
    productId: { type: sequelize_oracle_1.default.STRING },
    productName: { type: sequelize_oracle_1.default.STRING },
    date: { type: sequelize_oracle_1.default.DATE },
    correlation: { type: sequelize_oracle_1.default.INTEGER },
    registerCode: { type: sequelize_oracle_1.default.STRING },
    planningInstrument: { type: sequelize_oracle_1.default.BOOLEAN, allowNull: false },
    description: { type: sequelize_oracle_1.default.STRING },
    dateOut: { type: sequelize_oracle_1.default.DATE },
    punctuation: { type: sequelize_oracle_1.default.INTEGER },
    state: { type: sequelize_oracle_1.default.STRING },
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
    foreignKey: "InformationId",
});
generalInformation.hasMany(possibleCauses_1.default, {
    foreignKey: "InformationId",
});
generalInformation.hasMany(possibleAlternatives_1.default, {
    foreignKey: "InformationId",
});
generalInformation.hasMany(ideaAlternative_1.default, { foreignKey: "sectionBIId" });
generalInformation.belongsTo(stage_1.default, {
    foreignKey: "idStage",
    sourceKey: "codigo",
});
exports.default = generalInformation;
//# sourceMappingURL=generalInformation.js.map