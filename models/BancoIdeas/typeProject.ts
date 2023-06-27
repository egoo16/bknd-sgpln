import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const typeProject = db.define(
    "typeProject",
    {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
        name: { type: Sequelize.STRING }
    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

export default typeProject;

export interface typeProyect {
    id?: string;
    name: string;
}