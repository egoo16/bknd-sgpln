import Sequelize from "sequelize-oracle";

import db from "../../db/connection";
import dataGeo from "./datageo.model";

const geographicArea = db.define(
    "geoArea",
    {
        codigo: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
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
        timestamps: false 
    }
);

geographicArea.hasMany(dataGeo, {
    foreignKey: "geoAreaId",
});
export default geographicArea;
