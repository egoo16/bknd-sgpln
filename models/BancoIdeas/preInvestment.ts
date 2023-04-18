import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const preInvestment = db.define(
  "preInvestment",
  {
    
    codigo: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    AlterId: { type: Sequelize.UUID, allowNull: false },
    rangoValor: { type: Sequelize.INTEGER },
    rangoResultado: { type: Sequelize.STRING},
    estimacionValor: { type: Sequelize.INTEGER },
    estimacionResultado: { type: Sequelize.STRING, },
    complejidadValor: { type: Sequelize.INTEGER },
    complejidadResultado: { type: Sequelize.STRING },
    etapaValor: { type: Sequelize.STRING },
    etapaResultado: { type: Sequelize.STRING },
  },
  {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
  }
);

export default preInvestment;
