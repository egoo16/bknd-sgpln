import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const dataProponent = db.define(
  "dataProponent",
  {
    codigo: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    generalInformationId: { type: Sequelize.UUID, required: true },
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

export default dataProponent;
