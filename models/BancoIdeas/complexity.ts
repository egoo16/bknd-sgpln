import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const complexity = db.define(
    "complexity",
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

export default complexity;
