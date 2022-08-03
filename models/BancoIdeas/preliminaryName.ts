import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const preliminaryName = db.define(
    "preliminaryName",
    {
        codigo: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        ideaAlternativeId: { type: Sequelize.UUID, allowNull: false },
        typeProject: { type: Sequelize.STRING },
        proccess: { type: Sequelize.STRING },
        object: { type: Sequelize.STRING },
        departament: { type: Sequelize.STRING },
        municipality: { type: Sequelize.STRING },
        village: { type: Sequelize.STRING },
        preliminaryName: { type: Sequelize.STRING },
    },
    {
        underscoded: true,
        paranoid: true,
    }
);

export default preliminaryName;