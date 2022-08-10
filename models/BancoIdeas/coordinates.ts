import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const coordinates = db.define(
    "coordinates",
    {
        codigo: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        geographicAreaId: { type: Sequelize.UUID, required: true },
        latitude: { type: Sequelize.STRING },
        length: { type: Sequelize.STRING },

    },
    {
        underscoded: true,
        paranoid: true,
    }
);

export default coordinates;
