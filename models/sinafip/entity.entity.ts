import Sequelize from "sequelize-oracle";
import db from "../../db/connection";

export const entity = db.define('entity', {

    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    nameEntity: {
        type: Sequelize.STRING,
    },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
})