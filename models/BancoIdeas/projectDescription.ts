import Sequelize from "sequelize-oracle";

import db from "../../db/connection";
import executionTime from "./executionTime";

const projectDescription = db.define(
    "projDesc",
    {
        codigo: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        AlterId: { type: Sequelize.UUID, allowNull: false },
        projectType: { type: Sequelize.STRING, allowNull: false },
        formulationProcess: { type: Sequelize.STRING },
        formulationProcessDescription: { type: Sequelize.STRING },
        descriptionInterventions: { type: Sequelize.STRING },
        complexity: { type: Sequelize.STRING, allowNull: false },
        estimatedCost: { type: Sequelize.INTEGER },
        investmentCost: { type: Sequelize.INTEGER },
        fundingSources: { type: Sequelize.INTEGER },
        foundingSourcesName: { type: Sequelize.STRING },
    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

projectDescription.hasOne(executionTime, {
    foreignKey: "projDescId",
});
export default projectDescription;
