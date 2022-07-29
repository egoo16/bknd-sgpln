import Sequelize from "sequelize-oracle";

import db from "../../db/connection";
import generalInformation from "./generalInformation";
import preliminaryDefinition from "./preliminaryDefinition";
import problemDefinition from "./problemDefinition";
import qualification from "./qualification";

const sectionBI = db.define(
  "sectionBI",
  {
    codigo: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    IdeaId: { type: Sequelize.UUID, required: true },
    name: { type: Sequelize.STRING, required: true, allowNull: false },
    dateFinished: { type: Sequelize.DATE },
    punctuation: { type: Sequelize.INTEGER },
    state: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
  },
  {
    underscoded: true,
    paranoid: true,
  }
);

sectionBI.hasOne(generalInformation, { foreignKey: "sectionBI" });
sectionBI.hasOne(problemDefinition, { foreignKey: "sectionBI" });
sectionBI.hasOne(preliminaryDefinition, { foreignKey: "sectionBI" });
sectionBI.hasOne(qualification, { foreignKey: "sectionBI" });

export default sectionBI;
