import Sequelize from "sequelize-oracle";
import db from "../../db/connection";

const meansTransport = db.define(
    "meansTransport",
    {
        id: { type: Sequelize.UUID, primaryKey: true, allowNull: false, defaultValue: Sequelize.UUIDV4, },
        visitCardId: { type: Sequelize.UUID },
        name: { type: Sequelize.STRING },
        climate: { type: Sequelize.STRING },
        type: { type: Sequelize.STRING },
    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

export default meansTransport;
