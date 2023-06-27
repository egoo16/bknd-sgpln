import Sequelize from "sequelize-oracle";
import db from "../../db/connection";
import comment from "./comment";


const advisoryDoc = db.define(
    "advisoryDoc",
    {
        id: { type: Sequelize.UUID, primaryKey: true, allowNull: false, defaultValue: Sequelize.UUIDV4, },
        trackId: { type: Sequelize.UUID },
        goal: { type: Sequelize.STRING },
        action: { type: Sequelize.STRING },
        unitSpecific: { type: Sequelize.STRING },
        sectorization: { type: Sequelize.STRING },
        subSectorization: { type: Sequelize.STRING },
        menAttended: { type: Sequelize.INTEGER },
        womenAttended: { type: Sequelize.INTEGER },
        totalAttended: { type: Sequelize.INTEGER },
        counselingModality: { type: Sequelize.STRING },
        advTheme: { type: Sequelize.STRING },
        snipCode: { type: Sequelize.STRING },
        projectName: { type: Sequelize.STRING },
        participant: { type: Sequelize.STRING },
        analysisDate: { type: Sequelize.STRING },
        advDate: { type: Sequelize.STRING },
        assistant: { type: Sequelize.STRING },
        conclusions: { type: Sequelize.STRING(500) },
        recomend: { type: Sequelize.STRING(500) },
    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

advisoryDoc.hasMany(comment, { foreignKey: "advisoryDocId", });

export default advisoryDoc;
