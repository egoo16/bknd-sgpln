"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const executionTime = connection_1.default.define("executionTime", {
    codigo: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    projDescId: { type: sequelize_oracle_1.default.UUID, allowNull: false },
    tentativeTermMonth: { type: sequelize_oracle_1.default.STRING },
    tentativeTermYear: { type: sequelize_oracle_1.default.STRING },
    executionDateMonth: { type: sequelize_oracle_1.default.STRING },
    executionDateYear: { type: sequelize_oracle_1.default.STRING },
    finishDateMonth: { type: sequelize_oracle_1.default.STRING },
    finishDateYear: { type: sequelize_oracle_1.default.STRING },
    annual: { type: sequelize_oracle_1.default.BOOLEAN },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
exports.default = executionTime;
//# sourceMappingURL=executionTime.js.map