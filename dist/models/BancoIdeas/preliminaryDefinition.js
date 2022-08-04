"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const preliminaryDefinition = connection_1.default.define("preliminaryDefinition", {
    codigo: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    generalInformationId: { type: sequelize_oracle_1.default.UUID, required: true },
    generalObjective: { type: sequelize_oracle_1.default.STRING },
    expectedChange: { type: sequelize_oracle_1.default.STRING },
}, {
    underscoded: true,
    paranoid: true,
});
exports.default = preliminaryDefinition;
//# sourceMappingURL=preliminaryDefinition.js.map