import Sequelize from "sequelize-oracle";
import db from "../../db/connection";
import subSectorization from "./subSectorization.entity";

const advisedEntity = db.define(
    "advisedEntity",
    {
        id: { type: Sequelize.UUID, primaryKey: true, allowNull: false, defaultValue: Sequelize.UUIDV4, },
        name: { type: Sequelize.STRING },
    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);
advisedEntity.hasMany(subSectorization, { foreingKey: 'advisedEntityId' })

export default advisedEntity;
