import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const qualification = db.define(
  "score",
  {
    codigo: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    AlterId: { type: Sequelize.UUID, required: true },
    descriptionProblem: { type: Sequelize.INTEGER },
    generalObjective: { type: Sequelize.INTEGER },
    analysisDelimitation: { type: Sequelize.INTEGER },
    terrainIdentification: { type: Sequelize.INTEGER },
    descriptionAnalysis: { type: Sequelize.INTEGER },
  },
  {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
  }
);

export default qualification;
