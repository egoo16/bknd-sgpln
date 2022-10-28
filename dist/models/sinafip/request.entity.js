"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestEntity = void 0;
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const admisionQualification_1 = require("./admisionQualification");
const delimit_entity_1 = require("./delimit.entity");
const institution_entity_1 = require("./institution.entity");
const investment_project_entity_1 = require("./investment-project.entity");
const priorizationQualification_1 = require("./priorizationQualification");
const requirements_documents_entity_1 = require("./requirements-documents.entity");
const snp_entity_1 = require("./snp.entity");
const study_description_entity_1 = require("./study-description.entity");
exports.requestEntity = connection_1.default.define('request', {
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
    created: { type: sequelize_oracle_1.default.STRING },
    hasFinancing: { type: sequelize_oracle_1.default.BOOLEAN },
    financing: { type: sequelize_oracle_1.default.STRING }
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
exports.requestEntity.hasOne(requirements_documents_entity_1.requiredDocumentEntity, { foreingKey: 'requestId' });
exports.requestEntity.hasOne(delimit_entity_1.delimitEntity, { foreingKey: 'requestId' });
exports.requestEntity.hasOne(investment_project_entity_1.investmentProjectEntity, { foreingKey: 'requestId' });
exports.requestEntity.hasOne(study_description_entity_1.studyDescriptionEntity, { foreingKey: 'requestId' });
exports.requestEntity.hasOne(institution_entity_1.institutionEntity, { foreingKey: 'requestId' });
exports.requestEntity.hasOne(admisionQualification_1.admissionQuanty, { foreingKey: 'requestId' });
exports.requestEntity.hasOne(priorizationQualification_1.priorizationQuanty, { foreingKey: 'requestId' });
exports.requestEntity.hasOne(snp_entity_1.snp, { foreingKey: 'requestId' });
