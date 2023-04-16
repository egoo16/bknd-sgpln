import db from "../../db/connection";
import Sequelize from "sequelize-oracle";

export const admisionConfig = db.define('admisionConfig', {

    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    statementMaxValue: { type: Sequelize.INTEGER },

    beneficiariestMaxValue: { type: Sequelize.INTEGER },

    goalsMaxValue: { type: Sequelize.INTEGER },

    tdrMaxValue: { type: Sequelize.INTEGER },

    costMaxValue: { type: Sequelize.INTEGER },

    scheduleMaxValue: { type: Sequelize.INTEGER },

}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
})

export interface IAdmisionConfig {
    id?: string;
    statementMaxValue: number;
    beneficiariestMaxValue: number;
    goalsMaxValue: number;
    tdrMaxValue: number;
    costMaxValue: number;
    scheduleMaxValue: number;
}