"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const geographicArea = connection_1.default.define("geographicArea", {
    codigo: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    ideaAlternativeId: { type: sequelize_oracle_1.default.UUID, allowNull: false },
    availableTerrain: { type: sequelize_oracle_1.default.BOOLEAN },
    oneAvailableTerrain: { type: sequelize_oracle_1.default.BOOLEAN },
    investPurchase: { type: sequelize_oracle_1.default.BOOLEAN },
    governmentTerrain: { type: sequelize_oracle_1.default.BOOLEAN },
    registerGovernmentTerrain: { type: sequelize_oracle_1.default.BOOLEAN },
    statusDescribe: { type: sequelize_oracle_1.default.STRING },
    finca: { type: sequelize_oracle_1.default.STRING },
    folio: { type: sequelize_oracle_1.default.STRING },
    libro: { type: sequelize_oracle_1.default.STRING },
    plano: { type: sequelize_oracle_1.default.BOOLEAN },
    slightIncline: { type: sequelize_oracle_1.default.BOOLEAN },
    broken: { type: sequelize_oracle_1.default.BOOLEAN },
    image: { type: sequelize_oracle_1.default.BOOLEAN },
    imageUrl: { type: sequelize_oracle_1.default.STRING },
    description: { type: sequelize_oracle_1.default.STRING },
    basicServices: { type: sequelize_oracle_1.default.BOOLEAN },
    descriptionBasicServices: { type: sequelize_oracle_1.default.STRING },
    descriptionLocation: { type: sequelize_oracle_1.default.STRING },
}, {
    underscoded: true,
    paranoid: true,
});
exports.default = geographicArea;
//# sourceMappingURL=geographicArea.js.map