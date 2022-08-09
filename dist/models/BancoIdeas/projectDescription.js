"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const projectDescription = connection_1.default.define("projectDescription", {
    codigo: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    ideaAlternativeId: { type: sequelize_oracle_1.default.UUID, allowNull: false },
    formulationProcess: { type: sequelize_oracle_1.default.STRING },
    projectType: { type: sequelize_oracle_1.default.STRING },
    complexity: { type: sequelize_oracle_1.default.STRING },
    descriptionInterventions: { type: sequelize_oracle_1.default.STRING },
    estimatedCost: { type: sequelize_oracle_1.default.INTEGER },
    investmentCost: { type: sequelize_oracle_1.default.INTEGER },
    fundingSources: { type: sequelize_oracle_1.default.INTEGER },
    foundingSourcesName: { type: sequelize_oracle_1.default.STRING },
}, {
    underscoded: true,
    paranoid: true,
});
exports.default = projectDescription;
//# sourceMappingURL=projectDescription.js.map