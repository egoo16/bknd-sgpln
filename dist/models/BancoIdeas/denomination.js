"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const denomination = connection_1.default.define("denomination", {
    codigo: {
        type: sequelize_oracle_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: { type: sequelize_oracle_1.default.STRING },
}, {
    underscoded: true,
    paranoid: true,
});
exports.default = denomination;
//# sourceMappingURL=denomination.js.map