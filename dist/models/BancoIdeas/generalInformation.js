"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const dataProponent_1 = __importDefault(require("./dataProponent"));
const stage_1 = __importDefault(require("./stage"));
const generalInformation = connection_1.default.define("generalInformation", {
    codigo: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    sectionBI: { type: sequelize_oracle_1.default.UUID, required: true },
    idStage: { type: sequelize_oracle_1.default.UUID, required: true },
    productId: { type: sequelize_oracle_1.default.STRING },
    productName: { type: sequelize_oracle_1.default.STRING },
    date: { type: sequelize_oracle_1.default.DATE },
    registerCode: { type: sequelize_oracle_1.default.STRING },
    planningInstrument: { type: sequelize_oracle_1.default.BOOLEAN, allowNull: false },
    description: { type: sequelize_oracle_1.default.STRING },
}, {
    underscoded: true,
    paranoid: true,
});
generalInformation.belongsTo(stage_1.default, {
    foreignKey: "idStage",
    sourceKey: "codigo",
});
generalInformation.hasOne(dataProponent_1.default, {
    foreignKey: "generalInformationId",
});
exports.default = generalInformation;
//# sourceMappingURL=generalInformation.js.map