import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const possibleEffects = db.define(
  "possibleEffects",
  {
        codigo: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    description: { type: Sequelize.STRING, required: true, allowNull: false },
    generalInformationId: { type: Sequelize.INTEGER, required: true },
  },
  {
    underscoded: true,
    paranoid: true,
  }
);

export default possibleEffects;
