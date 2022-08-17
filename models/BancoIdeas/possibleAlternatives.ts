import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const possibleAlternatives = db.define(
  "possibleAlternatives",
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
  }
);

export default possibleAlternatives;
