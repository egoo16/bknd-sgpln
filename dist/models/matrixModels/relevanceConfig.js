"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relevanceStage = exports.relevanceComplexy = exports.relevanceBeneficiaries = exports.relevanceInvestment = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
exports.relevanceInvestment = connection_1.default.define('relevanceInvestment', {
    id: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4
    },
    rangeMin: { type: sequelize_oracle_1.default.INTEGER },
    rangeMax: { type: sequelize_oracle_1.default.INTEGER },
    rangeValue: { type: sequelize_oracle_1.default.INTEGER },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
exports.relevanceBeneficiaries = connection_1.default.define('relevanceBeneficiaries', {
    id: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4
    },
    rangeMin: { type: sequelize_oracle_1.default.INTEGER },
    rangeMax: { type: sequelize_oracle_1.default.INTEGER },
    rangeValue: { type: sequelize_oracle_1.default.INTEGER },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
exports.relevanceComplexy = connection_1.default.define('relevanceComplexy', {
    id: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4
    },
    name: { type: sequelize_oracle_1.default.STRING },
    rangeValue: { type: sequelize_oracle_1.default.INTEGER },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
exports.relevanceStage = connection_1.default.define('relevanceStage', {
    id: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4
    },
    rangeMin: { type: sequelize_oracle_1.default.INTEGER },
    rangeMax: { type: sequelize_oracle_1.default.INTEGER },
    suggestedStage: { type: sequelize_oracle_1.default.STRING },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
