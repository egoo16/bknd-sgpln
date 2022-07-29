"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const qualification = connection_1.default.define("qualification", {
    codigo: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    sectionBI: { type: sequelize_oracle_1.default.UUID, required: true },
    descriptionProblem: { type: sequelize_oracle_1.default.INTEGER },
    generalObjective: { type: sequelize_oracle_1.default.INTEGER },
    analysisDelimitation: { type: sequelize_oracle_1.default.INTEGER },
    terrainIdentification: { type: sequelize_oracle_1.default.INTEGER },
    descriptionAnalysis: { type: sequelize_oracle_1.default.INTEGER },
}, {
    underscoded: true,
    paranoid: true,
});
exports.default = qualification;
//# sourceMappingURL=qualification.js.map