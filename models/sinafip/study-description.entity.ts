import db from "../../db/connection";
import Sequelize from "sequelize-oracle";

export const  studyDescription = db.define('studyDescription',{

    id :{
        type:Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    nameStudy: {
        type:Sequelize.STRING,
    },
    objetiveGeneral: {
        type:Sequelize.STRING
    },
    costEstimted: {
        type:Sequelize.STRING
    },
    
    modalityFinancing: {
        type:Sequelize.STRING
    },
    requestId:{
        type:Sequelize.UUID
    }
    

})