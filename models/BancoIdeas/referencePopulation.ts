import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const referencePopulation = db.define(
    "referencePopulation",
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
        freezeTableName: true,
    }
);

export default referencePopulation;
