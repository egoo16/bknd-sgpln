import Sequelize from "sequelize-oracle";

import db from "../../db/connection";
import possibleAlternatives from "./possibleAlternatives";

const preliminaryDefinition = db.define(
  "preliminaryDefinition",
  {
    codigo: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    sectionBI: { type: Sequelize.UUID, required: true },
    generalObjective: { type: Sequelize.STRING },
    expectedChange: { type: Sequelize.STRING },
  },
  {
    underscoded: true,
    paranoid: true,
  }
);

preliminaryDefinition.hasMany(possibleAlternatives, {
  foreignKey: "preliminaryDefinitionId",
});

export default preliminaryDefinition;
