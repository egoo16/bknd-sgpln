"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const preInvestmentHistory = connection_1.default.define("preInvestmentHistory", {
    codigo: {
        type: sequelize_oracle_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ideaAlternativeId: { type: sequelize_oracle_1.default.INTEGER, allowNull: false },
    rangoValor: { type: sequelize_oracle_1.default.INTEGER },
    rangoResultado: { type: sequelize_oracle_1.default.STRING },
    estimacionValor: { type: sequelize_oracle_1.default.INTEGER },
    estimacionResultado: { type: sequelize_oracle_1.default.STRING, },
    complejidadValor: { type: sequelize_oracle_1.default.INTEGER },
    complejidadResultado: { type: sequelize_oracle_1.default.STRING },
    etapaValor: { type: sequelize_oracle_1.default.INTEGER },
    etapaResultado: { type: sequelize_oracle_1.default.STRING },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
exports.default = preInvestmentHistory;
//# sourceMappingURL=preInvestmentHistory.js.map