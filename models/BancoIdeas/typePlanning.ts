import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const typePlanning = db.define(
    "typePlanning",
    {
        codigo: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: { type: Sequelize.STRING }
    },
    {
        underscoded: true,
        paranoid: true,
    }
);

export default typePlanning;
