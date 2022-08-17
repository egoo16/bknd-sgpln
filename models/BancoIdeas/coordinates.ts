import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const coordinates = db.define(
    "coordinates",
    {
        codigo: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        geographicAreaId: { type: Sequelize.INTEGER, required: true },
        latitude: { type: Sequelize.STRING },
        length: { type: Sequelize.STRING },

    },
    {
        underscoded: true,
        paranoid: true,
    }
);

export default coordinates;
