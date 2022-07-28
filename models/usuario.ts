import Sequelize from "sequelize-oracle";

import db from "../db/connection";

const Usuario = db.define(
  "Usuario",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
  },
  {
    underscoded: true,
    paranoid: true,
  }
);

export default Usuario;