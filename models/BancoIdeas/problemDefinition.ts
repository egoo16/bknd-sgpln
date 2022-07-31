import Sequelize from "sequelize-oracle";

import db from "../../db/connection";
import possibleCauses from "./possibleCauses";
import possibleEffects from "./possibleEffects";

const problemDefinition = db.define(
  "problemDefinition",
  {
    codigo: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    generalInformationId: { type: Sequelize.UUID, required: true },
    definitionPotentiality: { type: Sequelize.STRING },
    baseLine: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
  },
  {
    underscoded: true,
    paranoid: true,
  }
);



problemDefinition.hasMany(possibleEffects, {
  foreignKey: "problemDefinitionId",
});
problemDefinition.hasMany(possibleCauses, {
  foreignKey: "problemDefinitionId",
});

export default problemDefinition;
