"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.institutionEntity = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
exports.institutionEntity = connection_1.default.define('institution', {
    id: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4
    },
    entityName: {
        type: sequelize_oracle_1.default.STRING,
    },
    executionUnit: {
        type: sequelize_oracle_1.default.STRING,
    },
    functionProjName: {
        type: sequelize_oracle_1.default.STRING
    },
    generalStudy: {
        type: sequelize_oracle_1.default.STRING
    },
    dcmntPreinvest: {
        type: sequelize_oracle_1.default.STRING
    },
    documentProject: {
        type: sequelize_oracle_1.default.STRING
    },
    responsibleName: {
        type: sequelize_oracle_1.default.STRING
    },
    contactEmail: {
        type: sequelize_oracle_1.default.STRING
    },
    phoneNumber: {
        type: sequelize_oracle_1.default.STRING
    },
    requestId: {
        type: sequelize_oracle_1.default.UUID
    }
});
