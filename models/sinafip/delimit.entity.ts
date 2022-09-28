import Sequelize from "sequelize-oracle";
import db from "../../db/connection";

export const  delimit = db.define('delimit',{

    id :{
        type:Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    nameRefPop: {
        type:Sequelize.STRING,
    },
    denomination: {
        type:Sequelize.STRING
    },
    estimatedBenef: {
        type:Sequelize.STRING
    },
    requestId:{
        type:Sequelize.UUID
    }
    

})