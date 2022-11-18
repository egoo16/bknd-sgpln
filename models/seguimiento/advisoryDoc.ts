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
        entity: { type: Sequelize.STRING },
        advTheme: { type: Sequelize.STRING },
        snipCode: { type: Sequelize.STRING },
        projectName: { type: Sequelize.STRING },
        participant: { type: Sequelize.STRING },
        analysisDate: { type: Sequelize.STRING },
        advDate: { type: Sequelize.STRING },
        assistant: { type: Sequelize.STRING },
        conclusions: { type: Sequelize.STRING },
        recomend: { type: Sequelize.STRING },
    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

advisoryDoc.hasMany(comment, { foreignKey: "advisoryDocId", });

export default advisoryDoc;
