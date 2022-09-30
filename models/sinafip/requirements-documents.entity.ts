import Sequelize from "sequelize-oracle";
import db from "../../db/connection";
import { stimatedBudgetEntity } from "./stimated-budget.entity";

export const  requiredDocumentEntity = db.define('requiredDocument',{

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

    requestId:{
        type:Sequelize.UUID
    }
    

});

requiredDocumentEntity.hasOne(stimatedBudgetEntity ,{foreingKey:'docId'});