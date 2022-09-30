"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studyDescription = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
exports.studyDescription = connection_1.default.define('studyDescription', {
    id: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4
    },
    nameStudy: {
        type: sequelize_oracle_1.default.STRING,
    },
    objetiveGeneral: {
        type: sequelize_oracle_1.default.STRING
    },
    costEstimted: {
        type: sequelize_oracle_1.default.STRING
    },
    modalityFinancing: {
        type: sequelize_oracle_1.default.STRING
    },
    requestId: {
        type: sequelize_oracle_1.default.UUID
    }
});
