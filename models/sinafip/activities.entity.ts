import db from "../../db/connection";
import Sequelize from "sequelize-oracle";

export const activitiesEntity = db.define('activities', {

    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    dateStart: { type: Sequelize.DATE },
    dateEnd: { type: Sequelize.DATE },
    activity: {
        type: Sequelize.STRING
    },
    unitMeasure: {
        type: Sequelize.STRING
    },
    cant: {
        type: Sequelize.STRING
    },
    priceU: {
        type: Sequelize.STRING
    },
    subTotal: {
        type: Sequelize.STRING
    },
    stimatedId: {
        type: Sequelize.UUID
    }



})