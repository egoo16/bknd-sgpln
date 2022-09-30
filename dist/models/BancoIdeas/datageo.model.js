"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const dataGeo = connection_1.default.define("dataGeo", {
    id: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    geoAreaId: { type: sequelize_oracle_1.default.UUID, allowNull: false },
    // Situacion Legal del posible bien
    governmentTerrain: { type: sequelize_oracle_1.default.BOOLEAN },
    registerGovernmentTerrain: { type: sequelize_oracle_1.default.BOOLEAN },
    statusDescribe: { type: sequelize_oracle_1.default.STRING },
    finca: { type: sequelize_oracle_1.default.STRING },
    folio: { type: sequelize_oracle_1.default.STRING },
    libro: { type: sequelize_oracle_1.default.STRING },
    // caracteristicas del posible terreno
    plano: { type: sequelize_oracle_1.default.BOOLEAN },
    slightIncline: { type: sequelize_oracle_1.default.BOOLEAN },
    broken: { type: sequelize_oracle_1.default.BOOLEAN },
    image: { type: sequelize_oracle_1.default.BOOLEAN },
    imageUrl: { type: sequelize_oracle_1.default.STRING },
    description: { type: sequelize_oracle_1.default.STRING },
    // Servicios basicos
    basicServices: { type: sequelize_oracle_1.default.BOOLEAN },
    descriptionBasicServices: { type: sequelize_oracle_1.default.STRING },
    // Coordenadas
    degreesx: { type: sequelize_oracle_1.default.STRING },
    minutesx: { type: sequelize_oracle_1.default.STRING },
    secondsx: { type: sequelize_oracle_1.default.STRING },
    degreesy: { type: sequelize_oracle_1.default.STRING },
    minutesy: { type: sequelize_oracle_1.default.STRING },
    secondsy: { type: sequelize_oracle_1.default.STRING },
    descriptionLocation: { type: sequelize_oracle_1.default.STRING },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
exports.default = dataGeo;
