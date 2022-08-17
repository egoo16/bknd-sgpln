"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const linkSNP = connection_1.default.define("linkSNP", {
    codigo: {
        type: sequelize_oracle_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ideaAlternativeId: { type: sequelize_oracle_1.default.INTEGER, allowNull: false },
    typePlanningId: { type: sequelize_oracle_1.default.INTEGER, allowNull: false },
    observation: { type: sequelize_oracle_1.default.STRING },
    approachJustification: { type: sequelize_oracle_1.default.STRING },
}, {
    underscoded: true,
    paranoid: true,
});
exports.default = linkSNP;
//# sourceMappingURL=linkSNP.js.map