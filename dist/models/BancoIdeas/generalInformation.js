"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const dataProponent_1 = __importDefault(require("./dataProponent"));
const preliminaryDefinition_1 = __importDefault(require("./preliminaryDefinition"));
const problemDefinition_1 = __importDefault(require("./problemDefinition"));
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
    state: { type: sequelize_oracle_1.default.BOOLEAN, defaultValue: true }
}, {
    underscoded: true,
    paranoid: true,
});
generalInformation.hasOne(problemDefinition_1.default, { foreignKey: "generalInformationId" });
generalInformation.hasOne(preliminaryDefinition_1.default, { foreignKey: "generalInformationId" });
generalInformation.hasOne(qualification_1.default, { foreignKey: "generalInformationId" });
generalInformation.belongsTo(stage_1.default, {
    foreignKey: "idStage",
    sourceKey: "codigo",
});
generalInformation.hasOne(dataProponent_1.default, {
    foreignKey: "generalInformationId",
});
exports.default = generalInformation;
//# sourceMappingURL=generalInformation.js.map