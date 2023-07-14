import Sequelize from "sequelize-oracle";
import db from "../../db/connection";

const comment = db.define(
    "comment",
    {
        id: { type: Sequelize.UUID, primaryKey: true, allowNull: false, defaultValue: Sequelize.UUIDV4, },
        advisoryDocId: { type: Sequelize.UUID },
        theme: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING(1000) },
    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

export default comment;
