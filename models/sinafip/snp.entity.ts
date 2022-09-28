import db from "../../db/connection";
import Sequelize from "sequelize-oracle";

export const  snp = db.define('snp',{

    id :{
        type:Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    devObjectives: {
        type:Sequelize.STRING,
    },
    priorityAxes: {
        type:Sequelize.STRING
    },
    nationalPriorities: {
        type:Sequelize.STRING
    },
    strategyGoals: {
        type:Sequelize.STRING
    },
    
    strategyResults: {
        type:Sequelize.STRING
    },
    pillarPgg: {
        type:Sequelize.STRING
    },
    objetivePgg: {
        type:Sequelize.STRING
    },
    product: {
        type:Sequelize.STRING
    },
    newProduct: {
        type:Sequelize.STRING
    },
    planningProcess: {
        type:Sequelize.STRING
    },
    requestId:{
        type:Sequelize.UUID
    }
    

})