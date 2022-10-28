"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.priorizationQuanty = void 0;
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
exports.priorizationQuanty = connection_1.default.define('priorizationQuanty', {
    id: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4
    },
    value1: { type: sequelize_oracle_1.default.INTEGER },
    value2: { type: sequelize_oracle_1.default.INTEGER },
    value3: { type: sequelize_oracle_1.default.INTEGER },
    value4: { type: sequelize_oracle_1.default.INTEGER },
    value5: { type: sequelize_oracle_1.default.INTEGER },
    total: { type: sequelize_oracle_1.default.INTEGER },
    requestId: {
        type: sequelize_oracle_1.default.UUID
    }
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
