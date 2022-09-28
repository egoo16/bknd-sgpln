import Sequelize from "sequelize-oracle";
import db from "../../db/connection";

export const  requiredDocument = db.define('requiredDocument',{

    id :{
        type:Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    tdr: {
        type:Sequelize.STRING,
    },
    scheduleActiv: {
        type:Sequelize.STRING
    },
    advser: {
        type:Sequelize.STRING
    },
    stimatedBudget: {
        type:Sequelize.STRING
    },

    requestId:{
        type:Sequelize.UUID
    }
    

})