"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const preInvestmentHistoy = connection_1.default.define("preInvestmentHistoy", {
    codigo: {
        type: sequelize_oracle_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    min: { type: sequelize_oracle_1.default.INTEGER },
    max: { type: sequelize_oracle_1.default.INTEGER },
    complexity: { type: sequelize_oracle_1.default.STRING },
    clasification: { type: sequelize_oracle_1.default.STRING, },
    result: { type: sequelize_oracle_1.default.DECIMAL(10, 2) },
    resultData: { type: sequelize_oracle_1.default.STRING },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
exports.default = preInvestmentHistoy;
//# sourceMappingURL=configPreInvestment.js.map