import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const possibleEffects = db.define(
  "effects",
  {
        codigo: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    description: { type: Sequelize.STRING, required: true, allowNull: false },
    InformationId: { type: Sequelize.INTEGER, required: true },
  },
  {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
  }
);

export default possibleEffects;
