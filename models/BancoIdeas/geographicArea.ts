import Sequelize from "sequelize-oracle";

import db from "../../db/connection";
import coordinates from "./coordinates";

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
        availableTerrain: { type: Sequelize.BOOLEAN },
        oneAvailableTerrain: { type: Sequelize.BOOLEAN },
        investPurchase: { type: Sequelize.BOOLEAN },
        governmentTerrain: { type: Sequelize.BOOLEAN },
        registerGovernmentTerrain: { type: Sequelize.BOOLEAN },
        statusDescribe: { type: Sequelize.STRING },
        finca: { type: Sequelize.STRING },
        folio: { type: Sequelize.STRING },
        libro: { type: Sequelize.STRING },
        plano: { type: Sequelize.BOOLEAN },
        slightIncline: { type: Sequelize.BOOLEAN },
        broken: { type: Sequelize.BOOLEAN },
        image: { type: Sequelize.BOOLEAN },
        imageUrl: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING },
        basicServices: { type: Sequelize.BOOLEAN },
        descriptionBasicServices: { type: Sequelize.STRING },
        descriptionLocation: { type: Sequelize.STRING },

    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);
geographicArea.hasMany(coordinates, {
    foreignKey: "geoAreaId",
});
export default geographicArea;
