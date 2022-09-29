import Sequelize from "sequelize-oracle";
import db from "../../db/connection";

export const projectFunction = db.define('projectFunction', {

    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,
    },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
})