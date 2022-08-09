"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const preliminaryName = connection_1.default.define("preliminaryName", {
    codigo: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4,
    },
    ideaAlternativeId: { type: sequelize_oracle_1.default.UUID, allowNull: false },
    typeProject: { type: sequelize_oracle_1.default.STRING },
    proccess: { type: sequelize_oracle_1.default.STRING },
    object: { type: sequelize_oracle_1.default.STRING },
    departament: { type: sequelize_oracle_1.default.STRING },
    municipality: { type: sequelize_oracle_1.default.STRING },
    village: { type: sequelize_oracle_1.default.STRING },
    preliminaryName: { type: sequelize_oracle_1.default.STRING },
}, {
    underscoded: true,
    paranoid: true,
});
// preliminaryName.belongsTo(ideaAlternative, {
//     foreignKey: "ideaAlternativeId",
//     sourceKey: "codigo",
// });
exports.default = preliminaryName;
//# sourceMappingURL=preliminaryName.js.map