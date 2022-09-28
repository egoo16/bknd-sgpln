import Sequelize from "sequelize-oracle";
import db from "../../db/connection";

export const  investmentProject = db.define('investmentProjects',{

    id :{
        type:Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    nameProject: {
        type:Sequelize.STRING,
    },
    objetiveProject: {
        type:Sequelize.STRING
    },
    descAdnJust: {
        type:Sequelize.STRING
    },
    infoStudies: {
        type:Sequelize.STRING
    },
    estimatedProject: {
        type:Sequelize.STRING
    },
    requestId:{
        type:Sequelize.UUID
    }
    

})