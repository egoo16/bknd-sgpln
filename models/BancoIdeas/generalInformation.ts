import Sequelize from "sequelize-oracle";

import db from "../../db/connection";
import dataProponent from "./dataProponent";
import stage from "./stage";

const generalInformation = db.define(
  "generalInformation",
  {
    codigo: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    sectionBI: { type: Sequelize.UUID, required: true },
    idStage: { type: Sequelize.UUID, required: true },
    productId: { type: Sequelize.STRING },
    productName: { type: Sequelize.STRING },
    date: { type: Sequelize.DATE },
    registerCode: { type: Sequelize.STRING },
    planningInstrument: { type: Sequelize.BOOLEAN, allowNull: false },
    description: { type: Sequelize.STRING },
  },
  {
    underscoded: true,
    paranoid: true,
  }
);

generalInformation.belongsTo(stage, {
  foreignKey: "idStage",
  sourceKey: "codigo",
});

generalInformation.hasOne(dataProponent, {
  foreignKey: "generalInformationId",
});

export default generalInformation;
