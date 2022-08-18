"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const geographicArea_1 = __importDefault(require("./geographicArea"));
const populationDelimitation_1 = __importDefault(require("./populationDelimitation"));
const preliminaryName_1 = __importDefault(require("./preliminaryName"));
const projectDescription_1 = __importDefault(require("./projectDescription"));
const qualification_1 = __importDefault(require("./qualification"));
const responsibleEntity_1 = __importDefault(require("./responsibleEntity"));
const ideaAlternative = connection_1.default.define("Alternative", {
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
    freezeTableName: true,
});
ideaAlternative.hasOne(preliminaryName_1.default, {
    foreignKey: "AlterId",
});
ideaAlternative.hasOne(responsibleEntity_1.default, {
    foreignKey: "AlterId",
});
ideaAlternative.hasOne(populationDelimitation_1.default, {
    foreignKey: "AlterId",
});
ideaAlternative.hasOne(geographicArea_1.default, {
    foreignKey: "AlterId",
});
ideaAlternative.hasOne(projectDescription_1.default, {
    foreignKey: "AlterId",
});
ideaAlternative.hasOne(qualification_1.default, { foreignKey: "AlterId" });
// ideaAlternative.belongsTo(generalInformation, {
//     foreignKey: "sectionBIId",
//     sourceKey: "codigo",
// });
exports.default = ideaAlternative;
//# sourceMappingURL=ideaAlternative.js.map