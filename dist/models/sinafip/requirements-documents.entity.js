"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredDocumentEntity = void 0;
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const stimated_budget_entity_1 = require("./stimated-budget.entity");
exports.requiredDocumentEntity = connection_1.default.define('requiredDocument', {
    id: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4
    },
    tdr: {
        type: sequelize_oracle_1.default.STRING,
    },
    scheduleActiv: {
        type: sequelize_oracle_1.default.STRING
    },
    requestId: {
        type: sequelize_oracle_1.default.UUID
    }
});
exports.requiredDocumentEntity.hasOne(stimated_budget_entity_1.stimatedBudgetEntity, { foreingKey: 'docId' });
