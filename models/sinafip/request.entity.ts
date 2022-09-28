import Sequelize from "sequelize-oracle";
import db from "../../db/connection";
import { delimit } from "./delimit.entity";
import { institution } from "./institution.entity";
import { investmentProject } from "./investment-project.entity";
import { requiredDocument } from "./requirements-documents.entity";
import { snp } from "./snp.entity";
import { studyDescription } from "./study-description.entity";
 
export const  request = db.define('request',{

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
        created: {type:Sequelize.STRING}
    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

request.hasOne(requiredDocument,{ foreingKey:'requestId'})

request.hasOne(delimit,{ foreingKey:'requestId'})

request.hasOne(investmentProject,{ foreingKey:'requestId'})

request.hasOne(studyDescription,{ foreingKey:'requestId'})

request.hasOne(institution,{ foreingKey:'requestId'})

request.hasOne(snp,{ foreingKey:'requestId'})