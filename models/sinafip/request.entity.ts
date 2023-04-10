import Sequelize from "sequelize-oracle";
import db from "../../db/connection";
import { admissionQuanty } from "./admisionQualification";
import { delimitEntity } from "./delimit.entity";
import { investmentProjectEntity } from "./investment-project.entity";
import { priorizationQuanty } from "./priorizationQualification";
import { requiredDocumentEntity } from "./requirements-documents.entity";
import { snp } from "./snp.entity";
import { studyDescriptionEntity } from "./study-description.entity";
import institutionEntity from "./institution.entity";

export const requestEntity = db.define('request', {

    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    correlative: { type: Sequelize.INTEGER, autoIncrement: true },
    result: { type: Sequelize.STRING },
    status: { type: Sequelize.STRING },
    idEntity: { type: Sequelize.STRING },
    author: { type: Sequelize.STRING },
    advser: { type: Sequelize.STRING }, // Quien revisa
    reviewd: { type: Sequelize.STRING }, // Quien admite
    created: { type: Sequelize.STRING },
    hasFinancing: { type: Sequelize.BOOLEAN },
    financing: { type: Sequelize.STRING }
},
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

requestEntity.hasOne(requiredDocumentEntity, { foreingKey: 'requestId' })

requestEntity.hasOne(delimitEntity, { foreingKey: 'requestId' })

requestEntity.hasOne(investmentProjectEntity, { foreingKey: 'requestId' })

requestEntity.hasOne(studyDescriptionEntity, { foreingKey: 'requestId' })

requestEntity.hasOne(institutionEntity, { foreingKey: 'requestId' })
requestEntity.hasOne(admissionQuanty, { foreingKey: 'requestId' })
requestEntity.hasOne(priorizationQuanty, { foreingKey: 'requestId' })

requestEntity.hasOne(snp, { foreingKey: 'requestId' })