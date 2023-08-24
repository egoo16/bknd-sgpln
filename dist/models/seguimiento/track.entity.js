"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const advisoryDoc_1 = __importDefault(require("./advisoryDoc"));
const advisoryEpi_1 = __importDefault(require("./advisoryEpi"));
const visitCard_entity_1 = __importDefault(require("./visitCard.entity"));
const track = connection_1.default.define("track", {
    id: { type: sequelize_oracle_1.default.UUID, primaryKey: true, allowNull: false, defaultValue: sequelize_oracle_1.default.UUIDV4, },
    iapa: { type: sequelize_oracle_1.default.INTEGER },
    iapb: { type: sequelize_oracle_1.default.INTEGER },
    iapc: { type: sequelize_oracle_1.default.INTEGER },
    activity: { type: sequelize_oracle_1.default.STRING },
    reportDate: { type: sequelize_oracle_1.default.STRING },
    projectId: { type: sequelize_oracle_1.default.UUID },
    createdAt: { type: sequelize_oracle_1.default.DATE, field: 'createdAt' }
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
track.hasMany(advisoryEpi_1.default, { foreingKey: 'trackId' });
track.hasMany(advisoryDoc_1.default, { foreingKey: 'trackId' });
track.hasOne(visitCard_entity_1.default, { foreingKey: 'trackId' });
exports.default = track;
