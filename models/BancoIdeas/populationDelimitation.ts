import Sequelize from "sequelize-oracle";

import db from "../../db/connection";
import denomination from "./denomination";
import referencePopulation from "./referencePopulation";

const populationDelimitation = db.define(
    "populationDelimitation",
    {
        codigo: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ideaAlternativeId: { type: Sequelize.INTEGER, allowNull: false },
        referencePopulationId: { type: Sequelize.INTEGER, allowNull: false },
        denominationId: { type: Sequelize.INTEGER, allowNull: false },
        totalPopulation: { type: Sequelize.INTEGER },
        gender: { type: Sequelize.STRING },
        estimateBeneficiaries: { type: Sequelize.INTEGER },
        preliminaryCharacterization: { type: Sequelize.STRING },
        coverage: { type: Sequelize.INTEGER },

    },
    {
        underscoded: true,
        paranoid: true,
    }
);
populationDelimitation.belongsTo(referencePopulation, {
    foreignKey: "referencePopulationId",
    sourceKey: "codigo",
});
populationDelimitation.belongsTo(denomination, {
    foreignKey: "denominationId",
    sourceKey: "codigo",
});
export default populationDelimitation;
