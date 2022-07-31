import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const denomination = db.define(
    "denomination",
    {
        codigo: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        name: { type: Sequelize.STRING },

    },
    {
        underscoded: true,
        paranoid: true,
    }
);

export default denomination;
