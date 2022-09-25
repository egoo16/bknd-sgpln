import Sequelize from "sequelize-oracle";

import db from "../../db/connection";
import dataGeo from "./datageo.model";

const geographicArea = db.define(
    "geoArea",
    {
        codigo: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        AlterId: { type: Sequelize.UUID, allowNull: false },
        oneAvailableTerrain: { type: Sequelize.BOOLEAN },
        availableTerrain: { type: Sequelize.BOOLEAN },
        investPurchase: { type: Sequelize.BOOLEAN },
    },

    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

geographicArea.hasMany(dataGeo, {
    foreignKey: "geoAreaId",
});
export default geographicArea;
