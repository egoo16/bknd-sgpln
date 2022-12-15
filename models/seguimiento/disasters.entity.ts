import Sequelize from "sequelize-oracle";
import db from "../../db/connection";

const disasters = db.define(
    "disasters",
    {
        id: { type: Sequelize.UUID, primaryKey: true, allowNull: false, defaultValue: Sequelize.UUIDV4, },
        visitCardId: {type: Sequelize.UUID},
        no: { type: Sequelize.STRING },
        date: { type: Sequelize.STRING },
        hour: { type: Sequelize.STRING },
        eventType: { type: Sequelize.STRING },
        causes: { type: Sequelize.STRING },
        impact: { type: Sequelize.STRING },
        recurrence: { type: Sequelize.STRING },
    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

export default disasters;
