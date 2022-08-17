import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const qualification = db.define(
  "qualification",
  {
        codigo: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    generalInformationId: { type: Sequelize.INTEGER, required: true },
    descriptionProblem: { type: Sequelize.INTEGER },
    generalObjective: { type: Sequelize.INTEGER },
    analysisDelimitation: { type: Sequelize.INTEGER },
    terrainIdentification: { type: Sequelize.INTEGER },
    descriptionAnalysis: { type: Sequelize.INTEGER },
  },
  {
    underscoded: true,
    paranoid: true,
  }
);

export default qualification;
