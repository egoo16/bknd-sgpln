import Sequelize from "sequelize-oracle";
import db from "../../db/connection";
import { delimitEntity } from "./delimit.entity";
import { institutionEntity } from "./institution.entity";
import { investmentProjectEntity } from "./investment-project.entity";
import { requiredDocumentEntity } from "./requirements-documents.entity";
import { snp } from "./snp.entity";
import { studyDescriptionEntity } from "./study-description.entity";
 
export const  requestEntity = db.define('request',{

        id :{
            type:Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        result: {type:Sequelize.STRING},
        status: {type:Sequelize.STRING},
        author: {type:Sequelize.STRING},
        advser: {type:Sequelize.STRING},
        reviewd: {type:Sequelize.STRING},
        created: {type:Sequelize.STRING},
        hasFinancing: {type:Sequelize.BOOLEAN},
        financing: {type:Sequelize.STRING}
    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

requestEntity.hasOne(requiredDocumentEntity,{ foreingKey:'requestId'})

requestEntity.hasOne(delimitEntity,{ foreingKey:'requestId'})

requestEntity.hasOne(investmentProjectEntity ,{ foreingKey:'requestId'})

requestEntity.hasOne(studyDescriptionEntity,{ foreingKey:'requestId'})

requestEntity.hasOne(institutionEntity,{ foreingKey:'requestId'})

requestEntity.hasOne(snp,{ foreingKey:'requestId'})