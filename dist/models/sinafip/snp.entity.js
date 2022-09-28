"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.snp = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
exports.snp = connection_1.default.define('snp', {
    id: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4
    },
    devObjectives: {
        type: sequelize_oracle_1.default.STRING,
    },
    priorityAxes: {
        type: sequelize_oracle_1.default.STRING
    },
    nationalPriorities: {
        type: sequelize_oracle_1.default.STRING
    },
    strategyGoals: {
        type: sequelize_oracle_1.default.STRING
    },
    strategyResults: {
        type: sequelize_oracle_1.default.STRING
    },
    pillarPgg: {
        type: sequelize_oracle_1.default.STRING
    },
    objetivePgg: {
        type: sequelize_oracle_1.default.STRING
    },
    product: {
        type: sequelize_oracle_1.default.STRING
    },
    newProduct: {
        type: sequelize_oracle_1.default.STRING
    },
    planningProcess: {
        type: sequelize_oracle_1.default.STRING
    },
    requestId: {
        type: sequelize_oracle_1.default.UUID
    }
});
