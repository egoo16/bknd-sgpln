import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const typePlanning = db.define(
    "typePlanning",
    {
    codigo: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
        name: { type: Sequelize.STRING }
    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

export default typePlanning;
