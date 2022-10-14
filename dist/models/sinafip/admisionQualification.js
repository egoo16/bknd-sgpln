"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admissionQuanty = void 0;
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
exports.admissionQuanty = connection_1.default.define('admissionQuanty', {
    id: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4
    },
    statementNeed: { type: sequelize_oracle_1.default.STRING },
    statementNeedDescription: { type: sequelize_oracle_1.default.STRING },
    statementNeedValue: { type: sequelize_oracle_1.default.INTEGER },
    numberBeneficiaries: { type: sequelize_oracle_1.default.STRING },
    numberBeneficiariesDescription: { type: sequelize_oracle_1.default.STRING },
    numberBeneficiariesValue: { type: sequelize_oracle_1.default.INTEGER },
    objetivesGoals: { type: sequelize_oracle_1.default.STRING },
    objetivesGoalsDescription: { type: sequelize_oracle_1.default.STRING },
    objetivesGoalsValue: { type: sequelize_oracle_1.default.INTEGER },
    tdr: { type: sequelize_oracle_1.default.STRING },
    tdrDescription: { type: sequelize_oracle_1.default.STRING },
    tdrValue: { type: sequelize_oracle_1.default.INTEGER },
    estimatedCost: { type: sequelize_oracle_1.default.STRING },
    estimatedCostDescription: { type: sequelize_oracle_1.default.STRING },
    estimatedCostValue: { type: sequelize_oracle_1.default.INTEGER },
    generalSchedule: { type: sequelize_oracle_1.default.STRING },
    generalScheduleDescription: { type: sequelize_oracle_1.default.STRING },
    generalScheduleValue: { type: sequelize_oracle_1.default.INTEGER },
    total: { type: sequelize_oracle_1.default.INTEGER, },
    requestId: {
        type: sequelize_oracle_1.default.UUID
    }
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
