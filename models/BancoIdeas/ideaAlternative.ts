import Sequelize from "sequelize-oracle";

import db from "../../db/connection";
import generalInformation from "./generalInformation";
import geographicArea from "./geographicArea";
import populationDelimitation from "./populationDelimitation";
import preliminaryName from "./preliminaryName";
import projectDescription from "./projectDescription";
import responsibleEntity from "./responsibleEntity";

const ideaAlternative = db.define(
    "ideaAlternative",
    {
        codigo: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        sectionBIId: { type: Sequelize.UUID, allowNull: false },
        state: { type: Sequelize.BOOLEAN },

    },
    {
        underscoded: true,
        paranoid: true,
    }
);

ideaAlternative.hasMany(preliminaryName, {
    foreignKey: "ideaAlternativeId",
});
ideaAlternative.hasMany(responsibleEntity, {
    foreignKey: "ideaAlternativeId",
});
ideaAlternative.hasMany(populationDelimitation, {
    foreignKey: "ideaAlternativeId",
});
ideaAlternative.hasMany(geographicArea, {
    foreignKey: "ideaAlternativeId",
});
ideaAlternative.hasMany(projectDescription, {
    foreignKey: "ideaAlternativeId",
});

// ideaAlternative.belongsTo(generalInformation, {
//     foreignKey: "sectionBIId",
//     sourceKey: "codigo",
// });

export default ideaAlternative;
