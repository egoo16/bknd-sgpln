import Sequelize from "sequelize-oracle";
import db from "../../db/connection";


const advisoryEpi = db.define(
    "advisoryEpi",
    {
        id: { type: Sequelize.UUID, primaryKey: true, allowNull: false, defaultValue: Sequelize.UUIDV4, },
        trackId: { type: Sequelize.UUID },
        goal: { type: Sequelize.STRING },
        action: { type: Sequelize.STRING },
        entity: { type: Sequelize.STRING },
        advTheme: { type: Sequelize.STRING },
        participantName: { type: Sequelize.STRING },
        participantPosition: { type: Sequelize.STRING },
        advDate: { type: Sequelize.STRING },
        reportDate: { type: Sequelize.STRING },
        place: { type: Sequelize.STRING },
        objective: { type: Sequelize.STRING },
        devAdv: { type: Sequelize.STRING },
        conclusions: { type: Sequelize.STRING },
        commitments: { type: Sequelize.STRING },
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
