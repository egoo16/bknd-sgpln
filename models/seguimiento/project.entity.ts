import Sequelize from "sequelize-oracle";

import db from "../../db/connection";
import track from "./track.entity";


const project = db.define(
    "project",
    {
        id: {
            type: Sequelize.UUID, primaryKey: true, allowNull: false, defaultValue: Sequelize.UUIDV4,
        },
        author: { type: Sequelize.STRING },
        correlative: { type: Sequelize.INTEGER, autoIncrement: true },
        process: { type: Sequelize.STRING },
        sector: { type: Sequelize.STRING },
        depto: { type: Sequelize.STRING },
        munic: { type: Sequelize.STRING },
        nameProject: { type: Sequelize.STRING },
        ministry: { type: Sequelize.STRING },
        isMinistry: { type: Sequelize.BOOLEAN },
        legalLand: { type: Sequelize.BOOLEAN },
        agripManage: { type: Sequelize.BOOLEAN },
        snipCode: { type: Sequelize.STRING },
        observations: { type: Sequelize.STRING(1100) },
        advance: { type: Sequelize.INTEGER },
        status: { type: Sequelize.STRING },

    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);
project.hasMany(track, { foreignKey: "projectId" });

export default project;
