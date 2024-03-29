import Sequelize from "sequelize-oracle";

import db from "../../db/connection";
import denomination from "./denomination";
import populationAlt from "./populationAlt";
import referencePopulation from "./referencePopulation";

const populationDelimitation = db.define(
    "popDelimit",
    {
        codigo: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        AlterId: { type: Sequelize.UUID, allowNull: false },
        refPopId: { type: Sequelize.UUID, allowNull: false },
        denId: { type: Sequelize.UUID, allowNull: false },
        totalPopulation: { type: Sequelize.INTEGER },
        gender: { type: Sequelize.STRING },
        estimateBeneficiaries: { type: Sequelize.INTEGER },
        preliminaryCharacterization: { type: Sequelize.STRING },
        coverage: { type: Sequelize.INTEGER },

    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);
populationDelimitation.hasMany(populationAlt, { foreignKey: "popId" });
populationDelimitation.belongsTo(referencePopulation, {
    foreignKey: "refPopId",
    sourceKey: "codigo",
});
populationDelimitation.belongsTo(denomination, {
    foreignKey: "denId",
    sourceKey: "codigo",
});
export default populationDelimitation;
