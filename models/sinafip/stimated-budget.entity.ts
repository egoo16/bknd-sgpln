import db from "../../db/connection";
import Sequelize from "sequelize-oracle";
import { activitiesEntity } from "./activities.entity";

export const  stimatedBudgetEntity = db.define('stimatedBudget',{

    id :{
        type:Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    
    totalStimated:{
        type:Sequelize.INTEGER
    },
    
    docId:{
        type:Sequelize.UUID
    }

});

stimatedBudgetEntity.hasMany(activitiesEntity,{foreingKey:'stimatedId'})

