"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const datageo_model_1 = __importDefault(require("./datageo.model"));
const geographicArea = connection_1.default.define("geoArea", {
    codigo: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    AlterId: { type: sequelize_oracle_1.default.UUID, allowNull: false },
    oneAvailableTerrain: { type: sequelize_oracle_1.default.BOOLEAN },
    availableTerrain: { type: sequelize_oracle_1.default.BOOLEAN },
    investPurchase: { type: sequelize_oracle_1.default.BOOLEAN },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
geographicArea.hasMany(datageo_model_1.default, {
    foreignKey: "geoAreaId",
});
exports.default = geographicArea;
//# sourceMappingURL=geographicArea.js.map