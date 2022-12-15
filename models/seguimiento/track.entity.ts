import Sequelize from "sequelize-oracle";
import db from "../../db/connection";
import advisoryDoc from "./advisoryDoc";
import advisoryEpi from "./advisoryEpi";
import visitCard from "./visitCard.entity";


const track = db.define(
    "track",
    {
        id: { type: Sequelize.UUID, primaryKey: true, allowNull: false, defaultValue: Sequelize.UUIDV4, },
        iapa: { type: Sequelize.INTEGER },
        iapb: { type: Sequelize.INTEGER },
        iapc: { type: Sequelize.INTEGER },
        activity: { type: Sequelize.STRING },
        reportDate: { type: Sequelize.STRING },
        projectId: { type: Sequelize.UUID },
    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

track.hasMany(advisoryEpi, { foreingKey: 'trackId' })
track.hasMany(advisoryDoc, { foreingKey: 'trackId' })
track.hasOne(visitCard, { foreingKey: 'trackId' })


export default track;
