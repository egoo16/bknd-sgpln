import Sequelize from "sequelize-oracle";

import db from "../../db/connection";
import executionTime from "./executionTime";

const projectDescription = db.define(
    "projectDescription",
    {
        codigo: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ideaAlternativeId: { type: Sequelize.INTEGER, allowNull: false },
        projectType: { type: Sequelize.STRING, allowNull: false },
        formulationProcess: { type: Sequelize.STRING, allowNull: false },
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
    foreignKey: "projectDescriptionId",
});
export default projectDescription;
