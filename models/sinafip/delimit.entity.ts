import Sequelize from "sequelize-oracle";
import db from "../../db/connection";
import delimitPopulation from "./delimitPopulation.entity";

export const delimitEntity = db.define('delimit', {

    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    nameRefPop: {
        type: Sequelize.STRING,
    },
    denomination: {
        type: Sequelize.STRING
    },
    estimatedBenef: {
        type: Sequelize.STRING
    },
    requestId: {
        type: Sequelize.UUID
    },
    departament: {
        type: Sequelize.STRING
    },
    municipality: {
        type: Sequelize.STRING
    },

})
delimitEntity.hasMany(delimitPopulation, { foreignKey: "delimitId" });