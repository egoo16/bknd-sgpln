"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const generalInformation_1 = __importDefault(require("./generalInformation"));
const preliminaryDefinition_1 = __importDefault(require("./preliminaryDefinition"));
const problemDefinition_1 = __importDefault(require("./problemDefinition"));
const qualification_1 = __importDefault(require("./qualification"));
const sectionBI = connection_1.default.define("sectionBI", {
    codigo: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    IdeaId: { type: sequelize_oracle_1.default.UUID, required: true },
    name: { type: sequelize_oracle_1.default.STRING, required: true, allowNull: false },
    dateFinished: { type: sequelize_oracle_1.default.DATE },
    punctuation: { type: sequelize_oracle_1.default.INTEGER },
    state: { type: sequelize_oracle_1.default.BOOLEAN, allowNull: false, defaultValue: true },
}, {
    underscoded: true,
    paranoid: true,
});
sectionBI.hasOne(generalInformation_1.default, { foreignKey: "sectionBI" });
sectionBI.hasOne(problemDefinition_1.default, { foreignKey: "sectionBI" });
sectionBI.hasOne(preliminaryDefinition_1.default, { foreignKey: "sectionBI" });
sectionBI.hasOne(qualification_1.default, { foreignKey: "sectionBI" });
exports.default = sectionBI;
//# sourceMappingURL=sectionBi.js.map