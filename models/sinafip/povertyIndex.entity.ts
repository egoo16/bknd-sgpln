
import Sequelize from "sequelize-oracle";
import db from "../../db/connection";

export const povertyIndex = db.define('povertyIndex', {

    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,
    },
    indice: {
        type: Sequelize.DECIMAL,
    },
    isMunicipio: {
        type: Sequelize.BOOLEAN,
    },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
})