import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const projectDescription = db.define(
    "projectDescription",
    {
        codigo: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        ideaAlternativeId: { type: Sequelize.UUID, allowNull: false },
        formulationProcess: { type: Sequelize.STRING },
        projectType: { type: Sequelize.STRING },
        complexity: { type: Sequelize.STRING },
        descriptionInterventions: { type: Sequelize.STRING },
        estimatedCost: { type: Sequelize.INTEGER },
        investmentCost: { type: Sequelize.INTEGER },
        fundingSources: { type: Sequelize.INTEGER },
        foundingSourcesName: { type: Sequelize.STRING },

    },
    {
        underscoded: true,
        paranoid: true,
    }
);

export default projectDescription;
