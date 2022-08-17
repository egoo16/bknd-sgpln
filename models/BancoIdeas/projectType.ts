import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const projectType = db.define(
    "projectType",
    {
        codigo: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: { type: Sequelize.STRING },
        relation: { type: Sequelize.STRING },

    },
    {
        underscoded: true,
        paranoid: true,
    }
);

export default projectType;
