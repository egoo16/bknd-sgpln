"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const problemDefinition = connection_1.default.define("problemDefinition", {
    codigo: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    generalInformationId: { type: sequelize_oracle_1.default.UUID, required: true },
}, {
    underscoded: true,
    paranoid: true,
});
exports.default = problemDefinition;
//# sourceMappingURL=problemDefinition.js.map