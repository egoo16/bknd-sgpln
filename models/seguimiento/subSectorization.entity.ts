import Sequelize from "sequelize-oracle";
import db from "../../db/connection";

const subSectorization = db.define(
    "subSectorization",
    {
        id: { type: Sequelize.UUID, primaryKey: true, allowNull: false, defaultValue: Sequelize.UUIDV4, },
        name: { type: Sequelize.STRING },
        advisedEntityId: { type: Sequelize.UUID },
    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

export default subSectorization;
