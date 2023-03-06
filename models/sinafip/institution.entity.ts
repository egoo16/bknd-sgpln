import db from "../../db/connection";
import Sequelize from "sequelize-oracle";

export const  institutionEntity = db.define('institution',{

    id :{
        type:Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    entityName: {
        type:Sequelize.STRING,
    },
    executionUnit: {
        type:Sequelize.STRING,
    },
    functionProjName: {
        type:Sequelize.STRING
    },
    generalStudy: {
        type:Sequelize.STRING
    },
    dcmntPreinvest: {
        type:Sequelize.STRING
    },
    documentProject: {
        type:Sequelize.STRING
    },
    responsibleName : {
        type:Sequelize.STRING
    },
    contactEmail : {
        type:Sequelize.STRING
    },
    phoneNumber : {
        type:Sequelize.STRING
    },
    requestId:{
        type:Sequelize.UUID
    }
    

})