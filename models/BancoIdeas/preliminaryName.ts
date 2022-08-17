import Sequelize from "sequelize-oracle";

import db from "../../db/connection";
import ideaAlternative from "./ideaAlternative";

const preliminaryName = db.define(
    "preliminaryName",
    {
        codigo: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ideaAlternativeId: { type: Sequelize.INTEGER, allowNull: false },
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

// preliminaryName.belongsTo(ideaAlternative, {
//     foreignKey: "ideaAlternativeId",
//     sourceKey: "codigo",
// });

export default preliminaryName;
