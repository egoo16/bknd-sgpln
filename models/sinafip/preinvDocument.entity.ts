import Sequelize from "sequelize-oracle";
import db from "../../db/connection";

export const preinvDocument = db.define('preinvDoc', {

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