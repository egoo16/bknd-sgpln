"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statementNeed = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
exports.statementNeed = connection_1.default.define('statementNeed', {
    id: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4
    },
    minValue: { type: sequelize_oracle_1.default.INTEGER },
    dateEnd: { type: sequelize_oracle_1.default.DATE },
    activity: {
        type: sequelize_oracle_1.default.STRING
    },
    unitMeasure: {
        type: sequelize_oracle_1.default.STRING
    },
    cant: {
        type: sequelize_oracle_1.default.STRING
    },
    priceU: {
        type: sequelize_oracle_1.default.STRING
    },
    subTotal: {
        type: sequelize_oracle_1.default.STRING
    },
    stimatedId: {
        type: sequelize_oracle_1.default.UUID
    }
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
