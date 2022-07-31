import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const populationDelimitation = db.define(
    "populationDelimitation",
    {
        codigo: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        ideaAlternativeId: { type: Sequelize.UUID, allowNull: false },
        referencePopulationId: { type: Sequelize.UUID, allowNull: false },
        denominationId: { type: Sequelize.UUID, allowNull: false },
        totalPopulation: { type: Sequelize.INTEGER },
        estimateBeneficiaries: { type: Sequelize.INTEGER },
        preliminaryCharacterization: { type: Sequelize.STRING },
        coverage: { type: Sequelize.INTEGER },

    },
    {
        underscoded: true,
        paranoid: true,
    }
);

export default populationDelimitation;
