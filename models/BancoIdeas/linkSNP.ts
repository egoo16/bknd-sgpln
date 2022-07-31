import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const linkSNP = db.define(
    "linkSNP",
    {
        codigo: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        ideaAlternativeId: { type: Sequelize.UUID, allowNull: false },
        typePlanningId: { type: Sequelize.UUID, allowNull: false },
        observation: { type: Sequelize.STRING },
        approachJustification: { type: Sequelize.STRING },

    },
    {
        underscoded: true,
        paranoid: true,
    }
);

export default linkSNP;
