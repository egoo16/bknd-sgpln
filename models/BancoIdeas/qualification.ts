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

    descProblem: { type: Sequelize.INTEGER },
    descProblemComment: { type: Sequelize.STRING },

    generalObjct: { type: Sequelize.INTEGER },
    generalObjctComment: { type: Sequelize.STRING },

    anlysDelimitation: { type: Sequelize.INTEGER },
    anlysDelimitationComment: { type: Sequelize.STRING },

    terrainIdent: { type: Sequelize.INTEGER },
    terrainIdentComment: { type: Sequelize.STRING },

    legalSituation: { type: Sequelize.INTEGER },
    legalSituationComment: { type: Sequelize.STRING },

    descAnlys: { type: Sequelize.INTEGER },
    descAnlysComment: { type: Sequelize.STRING },

    descriptionGeneral: { type: Sequelize.STRING },
    total: { type: Sequelize.INTEGER },
    result: { type: Sequelize.STRING }, // Pertinente o No Pertinente
  },
  {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
  }
);

export default qualification;
