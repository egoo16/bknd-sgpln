import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const responsibleEntity = db.define(
    "responsibleEntity",
    {
        codigo: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ideaAlternativeId: { type: Sequelize.INTEGER, allowNull: false },
        nameEPI: { type: Sequelize.STRING },
        leaderName: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        phone: { type: Sequelize.STRING },

    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

export default responsibleEntity;
