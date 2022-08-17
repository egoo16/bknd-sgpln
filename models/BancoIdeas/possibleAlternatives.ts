import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const possibleAlternatives = db.define(
  "Alternatives",
  {
    codigo: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    description: { type: Sequelize.STRING, required: true, allowNull: false },
    InformationId: { type: Sequelize.UUID, required: true },
  },
  {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
  }
);

export default possibleAlternatives;
