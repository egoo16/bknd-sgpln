"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const ideaAlternative = connection_1.default.define("ideaAlternative", {
    codigo: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    sectionBIId: { type: sequelize_oracle_1.default.UUID, allowNull: false },
    state: { type: sequelize_oracle_1.default.BOOLEAN },
}, {
    underscoded: true,
    paranoid: true,
});
exports.default = ideaAlternative;
//# sourceMappingURL=ideaAlternative.js.map