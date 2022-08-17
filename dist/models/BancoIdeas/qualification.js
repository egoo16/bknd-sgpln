"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const qualification = connection_1.default.define("qualification", {
    codigo: {
        type: sequelize_oracle_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    generalInformationId: { type: sequelize_oracle_1.default.INTEGER, required: true },
    descriptionProblem: { type: sequelize_oracle_1.default.INTEGER },
    generalObjective: { type: sequelize_oracle_1.default.INTEGER },
    analysisDelimitation: { type: sequelize_oracle_1.default.INTEGER },
    terrainIdentification: { type: sequelize_oracle_1.default.INTEGER },
    descriptionAnalysis: { type: sequelize_oracle_1.default.INTEGER },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
exports.default = qualification;
//# sourceMappingURL=qualification.js.map