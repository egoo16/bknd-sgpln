"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../db/connection"));
const Usuario = connection_1.default.define("Usuario", {
    id: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    name: {
        type: sequelize_oracle_1.default.STRING,
        required: true,
    },
    username: {
        type: sequelize_oracle_1.default.STRING,
        required: true,
        allowNull: false,
    },
    password: {
        type: sequelize_oracle_1.default.STRING,
        required: true,
        allowNull: false,
    },
    role: {
        type: sequelize_oracle_1.default.STRING,
        defaultValue: 'USER_ROLE'
    },
    id_inst: {
        type: sequelize_oracle_1.default.STRING,
    },
    name_inst: {
        type: sequelize_oracle_1.default.STRING,
    },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
exports.default = Usuario;
