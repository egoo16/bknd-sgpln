import Sequelize from "sequelize-oracle";

import db from "../../db/connection";
import generalInformation from "./generalInformation";
import geographicArea from "./geographicArea";
import populationDelimitation from "./populationDelimitation";
import preliminaryName from "./preliminaryName";
import projectDescription from "./projectDescription";
import qualification from "./qualification";
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
        sectionBIId: { type: Sequelize.INTEGER, allowNull: false },
        state: { type: Sequelize.BOOLEAN },

    },
    {
        underscoded: true,
        paranoid: true,
    }
);

ideaAlternative.hasOne(preliminaryName, {
    foreignKey: "ideaAlternativeId",
});
ideaAlternative.hasOne(responsibleEntity, {
    foreignKey: "ideaAlternativeId",
});
ideaAlternative.hasOne(populationDelimitation, {
    foreignKey: "ideaAlternativeId",
});
ideaAlternative.hasOne(geographicArea, {
    foreignKey: "ideaAlternativeId",
});
ideaAlternative.hasOne(projectDescription, {
    foreignKey: "ideaAlternativeId",
});
ideaAlternative.hasOne(qualification, { foreignKey: "ideaAlternativeId" });

// ideaAlternative.belongsTo(generalInformation, {
//     foreignKey: "sectionBIId",
//     sourceKey: "codigo",
// });

export default ideaAlternative;
