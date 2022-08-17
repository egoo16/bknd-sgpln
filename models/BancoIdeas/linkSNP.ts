import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const linkSNP = db.define(
    "linkSNP",
    {
        codigo: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ideaAlternativeId: { type: Sequelize.INTEGER, allowNull: false },
        typePlanningId: { type: Sequelize.INTEGER, allowNull: false },
        observation: { type: Sequelize.STRING },
        approachJustification: { type: Sequelize.STRING },

    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

export default linkSNP;
