"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stimatedBudgetEntity = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const activities_entity_1 = require("./activities.entity");
exports.stimatedBudgetEntity = connection_1.default.define('stimatedBudget', {
    id: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4
    },
    totalStimated: {
        type: sequelize_oracle_1.default.INTEGER
    },
    docId: {
        type: sequelize_oracle_1.default.UUID
    }
});
exports.stimatedBudgetEntity.hasMany(activities_entity_1.activitiesEntity, { foreingKey: 'stimatedId' });
