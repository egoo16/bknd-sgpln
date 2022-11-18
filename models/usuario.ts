import Sequelize from "sequelize-oracle";

import db from "../db/connection";

const Usuario = db.define(
  "Usuario",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      required: true,
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
    role: {
      type: Sequelize.STRING,
      defaultValue: 'USER_ROLE'
    },
    id_inst: {
      type: Sequelize.STRING,
    },
    name_inst: {
      type: Sequelize.STRING,
    },
    position: {
      type: Sequelize.STRING,
    },
  },
  {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
  }
);

export default Usuario;