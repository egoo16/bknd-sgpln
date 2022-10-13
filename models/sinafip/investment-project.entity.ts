import Sequelize from "sequelize-oracle";
import db from "../../db/connection";

export const  investmentProjectEntity = db.define('investmentProjects',{

    id :{
        type:Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    coreProblem: {
        type:Sequelize.STRING,
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