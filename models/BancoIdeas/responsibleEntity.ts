import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const responsibleEntity = db.define(
    "resEntity",
    {
        codigo: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        AlternativeId: { type: Sequelize.UUID, allowNull: false },
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
