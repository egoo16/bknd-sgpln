"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.investmentProjectEntity = void 0;
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
exports.investmentProjectEntity = connection_1.default.define('investmentProjects', {
    id: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4
    },
    coreProblem: {
        type: sequelize_oracle_1.default.STRING,
    },
    productId: { type: sequelize_oracle_1.default.STRING },
    productName: { type: sequelize_oracle_1.default.STRING(600) },
    nameProject: {
        type: sequelize_oracle_1.default.STRING,
    },
    objetiveProject: {
        type: sequelize_oracle_1.default.STRING
    },
    descAdnJust: {
        type: sequelize_oracle_1.default.STRING
    },
    infoStudies: {
        type: sequelize_oracle_1.default.STRING
    },
    estimatedProject: {
        type: sequelize_oracle_1.default.STRING
    },
    requestId: {
        type: sequelize_oracle_1.default.UUID
    }
});
