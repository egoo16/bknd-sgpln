"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const delimit_entity_1 = require("./delimit.entity");
const institution_entity_1 = require("./institution.entity");
const investment_project_entity_1 = require("./investment-project.entity");
const requirements_documents_entity_1 = require("./requirements-documents.entity");
const snp_entity_1 = require("./snp.entity");
const study_description_entity_1 = require("./study-description.entity");
exports.request = connection_1.default.define('request', {
    id: {
        type: sequelize_oracle_1.default.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_oracle_1.default.UUIDV4
    },
    result: { type: sequelize_oracle_1.default.STRING },
    status: { type: sequelize_oracle_1.default.STRING },
    author: { type: sequelize_oracle_1.default.STRING },
    advser: { type: sequelize_oracle_1.default.STRING },
    reviewd: { type: sequelize_oracle_1.default.STRING },
    created: { type: sequelize_oracle_1.default.STRING }
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
exports.request.hasOne(requirements_documents_entity_1.requiredDocument, { foreingKey: 'requestId' });
exports.request.hasOne(delimit_entity_1.delimit, { foreingKey: 'requestId' });
exports.request.hasOne(investment_project_entity_1.investmentProject, { foreingKey: 'requestId' });
exports.request.hasOne(study_description_entity_1.studyDescription, { foreingKey: 'requestId' });
exports.request.hasOne(institution_entity_1.institution, { foreingKey: 'requestId' });
exports.request.hasOne(snp_entity_1.snp, { foreingKey: 'requestId' });
