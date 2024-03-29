"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const preInvestment = connection_1.default.define("preInvestment", {
    codigo: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    AlterId: { type: sequelize_oracle_1.default.UUID, allowNull: false },
    rangoValor: { type: sequelize_oracle_1.default.INTEGER },
    rangoResultado: { type: sequelize_oracle_1.default.STRING },
    estimacionValor: { type: sequelize_oracle_1.default.INTEGER },
    estimacionResultado: { type: sequelize_oracle_1.default.STRING, },
    complejidadValor: { type: sequelize_oracle_1.default.INTEGER },
    complejidadResultado: { type: sequelize_oracle_1.default.STRING },
    etapaValor: { type: sequelize_oracle_1.default.STRING },
    etapaResultado: { type: sequelize_oracle_1.default.STRING },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
exports.default = preInvestment;
