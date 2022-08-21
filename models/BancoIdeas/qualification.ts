import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const qualification = db.define(
  "qualification",
  {
    codigo: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    AlterId: { type: Sequelize.UUID, required: true },

    descriptionProblem: { type: Sequelize.INTEGER },
    descriptionProblemDescription: { type: Sequelize.STRING },

    generalObjective: { type: Sequelize.INTEGER },
    generalObjectiveDescription: { type: Sequelize.STRING },

    analysisDelimitation: { type: Sequelize.INTEGER },
    analysisDelimitationDescription: { type: Sequelize.STRING },

    terrainIdentification: { type: Sequelize.INTEGER },
    terrainIdentificationDescription: { type: Sequelize.STRING },

    legalSituation: { type: Sequelize.INTEGER },
    legalSituationDescription: { type: Sequelize.STRING },

    descriptionAnalysis: { type: Sequelize.INTEGER },
    descriptionAnalysisDescription: { type: Sequelize.STRING },

    descriptionGeneral: { type: Sequelize.STRING },
    total: { type: Sequelize.INTEGER },
    result: { type: Sequelize.STRING },
  },
  {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
  }
);

export default qualification;
