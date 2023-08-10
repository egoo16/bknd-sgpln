import Sequelize from "sequelize-oracle";
import db from "../../db/connection";


const advisoryEpi = db.define(
    "advisoryEpi",
    {
        id: { type: Sequelize.UUID, primaryKey: true, allowNull: false, defaultValue: Sequelize.UUIDV4, },
        trackId: { type: Sequelize.UUID },
        goal: { type: Sequelize.STRING },
        action: { type: Sequelize.STRING },
        unitSpecific: { type: Sequelize.STRING },
        sectorization: { type: Sequelize.STRING },
        subSectorization: { type: Sequelize.STRING },
        advTheme: { type: Sequelize.STRING },
        participantName: { type: Sequelize.STRING },
        participantPosition: { type: Sequelize.STRING },
        menAttended: { type: Sequelize.INTEGER },
        womenAttended: { type: Sequelize.INTEGER },
        totalAttended: { type: Sequelize.INTEGER },
        advDate: { type: Sequelize.STRING },
        reportDate: { type: Sequelize.STRING },
        counselingModality: { type: Sequelize.STRING },
        place: { type: Sequelize.STRING },
        objective: { type: Sequelize.STRING(1000) },
        devAdv: { type: Sequelize.STRING(1500) },
        conclusions: { type: Sequelize.STRING(1000) },
        commitments: { type: Sequelize.STRING(1000) },
        specialist: { type: Sequelize.STRING },
        doc: { type: Sequelize.STRING },
    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

export default advisoryEpi;
