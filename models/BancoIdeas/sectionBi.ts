import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const sectionBI = db.define(
  "sectionBI",
  {
    idSection: { type: Sequelize.UUID, primaryKey: true },
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

export default sectionBI;
