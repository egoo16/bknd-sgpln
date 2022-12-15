import Sequelize from "sequelize-oracle";
import db from "../../db/connection";

const threatTypes = db.define(
    "threatTypes",
    {
        id: { type: Sequelize.UUID, primaryKey: true, allowNull: false, defaultValue: Sequelize.UUIDV4, },
        visitCardId: {type: Sequelize.UUID},
        name: { type: Sequelize.STRING },
        type: { type: Sequelize.STRING },
        value: { type: Sequelize.INTEGER },
    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

export default threatTypes;
