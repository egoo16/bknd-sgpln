import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const stage = db.define(
    "stage",
    {
        codigo: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: { type: Sequelize.STRING, required: true, allowNull: false },
    },
    {
        underscoded: true,
        paranoid: true,
    }
);

export default stage;
