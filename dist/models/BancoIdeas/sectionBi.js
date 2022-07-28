"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const sectionBI = connection_1.default.define("sectionBI", {
    idSection: { type: sequelize_oracle_1.default.UUID, primaryKey: true },
    IdeaId: { type: sequelize_oracle_1.default.UUID, required: true },
    name: { type: sequelize_oracle_1.default.STRING, required: true, allowNull: false },
    dateFinished: { type: sequelize_oracle_1.default.DATE },
    punctuation: { type: sequelize_oracle_1.default.INTEGER },
    state: { type: sequelize_oracle_1.default.BOOLEAN, allowNull: false, defaultValue: true },
}, {
    underscoded: true,
    paranoid: true,
});
exports.default = sectionBI;
//# sourceMappingURL=sectionBi.js.map