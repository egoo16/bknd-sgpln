"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const subSectorization_entity_1 = __importDefault(require("./subSectorization.entity"));
const advisedEntity = connection_1.default.define("advisedEntity", {
    id: { type: sequelize_oracle_1.default.UUID, primaryKey: true, allowNull: false, defaultValue: sequelize_oracle_1.default.UUIDV4, },
    name: { type: sequelize_oracle_1.default.STRING },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
advisedEntity.hasMany(subSectorization_entity_1.default, { foreingKey: 'advisedEntityId' });
exports.default = advisedEntity;
