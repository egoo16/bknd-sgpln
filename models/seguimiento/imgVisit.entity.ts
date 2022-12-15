import Sequelize from "sequelize-oracle";
import db from "../../db/connection";

const imgVisit = db.define(
    "imgVisit",
    {
        id: { type: Sequelize.UUID, primaryKey: true, allowNull: false, defaultValue: Sequelize.UUIDV4, },
        visitCardId: { type: Sequelize.UUID },
        type: { type: Sequelize.STRING },
        url: { type: Sequelize.STRING },
    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

export default imgVisit;
