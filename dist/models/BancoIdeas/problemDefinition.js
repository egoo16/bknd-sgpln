"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const possibleCauses_1 = __importDefault(require("./possibleCauses"));
const possibleEffects_1 = __importDefault(require("./possibleEffects"));
const problemDefinition = connection_1.default.define("problemDefinition", {
    codigo: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    generalInformationId: { type: sequelize_oracle_1.default.UUID, required: true },
    definitionPotentiality: { type: sequelize_oracle_1.default.STRING },
    baseLine: { type: sequelize_oracle_1.default.STRING },
    description: { type: sequelize_oracle_1.default.STRING },
}, {
    underscoded: true,
    paranoid: true,
});
problemDefinition.hasMany(possibleEffects_1.default, {
    foreignKey: "problemDefinitionId",
});
problemDefinition.hasMany(possibleCauses_1.default, {
    foreignKey: "problemDefinitionId",
});
exports.default = problemDefinition;
//# sourceMappingURL=problemDefinition.js.map