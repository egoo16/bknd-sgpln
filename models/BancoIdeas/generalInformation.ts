import Sequelize from "sequelize-oracle";

import db from "../../db/connection";
import ideaAlternative from "./ideaAlternative";
import possibleCauses from "./possibleCauses";
import possibleEffects from "./possibleEffects";
import qualification from "./qualification";
import stage from "./stage";
import possibleAlternatives from "./possibleAlternatives";

const generalInformation = db.define(
    "Information",
    {
        codigo: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idStage: { type: Sequelize.INTEGER, required: true },
        productId: { type: Sequelize.STRING },
        productName: { type: Sequelize.STRING },
        date: { type: Sequelize.DATE },
        correlation: { type: Sequelize.INTEGER },
        registerCode: { type: Sequelize.STRING },
        planningInstrument: { type: Sequelize.BOOLEAN, allowNull: false },
        description: { type: Sequelize.STRING },
        dateOut: { type: Sequelize.DATE },
        punctuation: { type: Sequelize.INTEGER },
        state: { type: Sequelize.STRING },
        idEntity: { type: Sequelize.STRING, required: true, allowNull: false },
        nameEntity: { type: Sequelize.STRING, required: true, allowNull: false },
        responsibleName: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        },
        email: { type: Sequelize.STRING, required: true, allowNull: false },
        phone: { type: Sequelize.STRING, required: true, allowNull: false },

        definitionPotentiality: { type: Sequelize.STRING },
        baseLine: { type: Sequelize.STRING },
        descriptionCurrentSituation: { type: Sequelize.STRING },

        generalObjective: { type: Sequelize.STRING },
        expectedChange: { type: Sequelize.STRING },

    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

generalInformation.hasMany(possibleEffects, {
    foreignKey: "InformationId",
});
generalInformation.hasMany(possibleCauses, {
    foreignKey: "InformationId",
});
generalInformation.hasMany(possibleAlternatives, {
    foreignKey: "InformationId",
});
generalInformation.hasMany(ideaAlternative, { foreignKey: "sectionBIId" });

generalInformation.belongsTo(stage, {
    foreignKey: "idStage",
    sourceKey: "codigo",
});

export default generalInformation;
