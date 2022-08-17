import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const denomination = db.define(
    "denomination",
    {
        codigo: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: { type: Sequelize.STRING },

    },
    {
        underscoded: true,
        paranoid: true,
    }
);


export default denomination;
