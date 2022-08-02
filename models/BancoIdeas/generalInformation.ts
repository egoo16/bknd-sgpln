import Sequelize from "sequelize-oracle";

import db from "../../db/connection";
import preliminaryDefinition from "./preliminaryDefinition";
import problemDefinition from "./problemDefinition";
import qualification from "./qualification";
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
    idStage: { type: Sequelize.UUID, required: true },
    productId: { type: Sequelize.STRING },
    productName: { type: Sequelize.STRING },
    date: { type: Sequelize.DATE },
    correlation: { type: Sequelize.INTEGER},
    registerCode: { type: Sequelize.STRING },
    planningInstrument: { type: Sequelize.BOOLEAN, allowNull: false },
    description: { type: Sequelize.STRING },
    dateOut: {type: Sequelize.DATE},
    punctuation: { type: Sequelize.INTEGER},
    state: { type: Sequelize.BOOLEAN, defaultValue: true},
    idEntity: { type: Sequelize.STRING, required: true, allowNull: false },
    nameEntity: { type: Sequelize.STRING, required: true, allowNull: false },
    responsibleName: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    email: { type: Sequelize.STRING, required: true, allowNull: false },
    phone: { type: Sequelize.STRING, required: true, allowNull: false },
  },
  {
    underscoded: true,
    paranoid: true,
  }
);

generalInformation.hasOne(problemDefinition, { foreignKey: "generalInformationId" });
generalInformation.hasOne(preliminaryDefinition, { foreignKey: "generalInformationId" });
generalInformation.hasOne(qualification, { foreignKey: "generalInformationId" });


generalInformation.belongsTo(stage, {
  foreignKey: "idStage",
  sourceKey: "codigo",
});

export default generalInformation;
