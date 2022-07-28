"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../db/connection"));
const Usuario = connection_1.default.define("Usuario", {
    id: {
        type: sequelize_oracle_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
}, {
    underscoded: true,
    paranoid: true,
});
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map