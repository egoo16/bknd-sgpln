import Sequelize from "sequelize-oracle";
import db from "../../db/connection";

import sectionBI from "./sectionBi";

const Idea = db.define(
  "Idea",
  {
    idIdea: { type: Sequelize.UUID, primaryKey: true },
    name: { type: Sequelize.STRING, required: true, allowNull: false },
    state: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
  },
  {
    underscoded: true,
    paranoid: true,
  }
);

Idea.hasOne(sectionBI, { foreignKey: "IdeaId" });

export default Idea;
