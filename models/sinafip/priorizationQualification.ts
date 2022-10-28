import Sequelize from "sequelize-oracle";
import db from "../../db/connection";

export const priorizationQuanty = db.define('priorizationQuanty', {

    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    value1: { type: Sequelize.INTEGER },
    value2: { type: Sequelize.INTEGER },
    value3: { type: Sequelize.INTEGER },
    value4: { type: Sequelize.INTEGER },
    value5: { type: Sequelize.INTEGER },
    total: { type: Sequelize.INTEGER },

    requestId:{
        type:Sequelize.UUID
    }
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
})