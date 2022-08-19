import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const preInvestmentHistory = db.define(
  "preInvestmentHistory",
  {
    
    codigo: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ideaAlternativeId: { type: Sequelize.INTEGER, allowNull: false },
    rangoValor: { type: Sequelize.INTEGER },
    rangoResultado: { type: Sequelize.STRING},
    estimacionValor: { type: Sequelize.INTEGER },
    estimacionResultado: { type: Sequelize.STRING, },
    complejidadValor: { type: Sequelize.INTEGER },
    complejidadResultado: { type: Sequelize.STRING },
    etapaValor: { type: Sequelize.INTEGER },
    etapaResultado: { type: Sequelize.STRING },
  },
  {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
  }
);

export default preInvestmentHistory;
