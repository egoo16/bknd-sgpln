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
    "Alternative",
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
        freezeTableName: true,
    }
);

ideaAlternative.hasOne(preliminaryName, {
    foreignKey: "AlternativeId",
});
ideaAlternative.hasOne(responsibleEntity, {
    foreignKey: "AlternativeId",
});
ideaAlternative.hasOne(populationDelimitation, {
    foreignKey: "AlternativeId",
});
ideaAlternative.hasOne(geographicArea, {
    foreignKey: "AlternativeId",
});
ideaAlternative.hasOne(projectDescription, {
    foreignKey: "AlternativeId",
});
ideaAlternative.hasOne(qualification, { foreignKey: "AlternativeId" });

// ideaAlternative.belongsTo(generalInformation, {
//     foreignKey: "sectionBIId",
//     sourceKey: "codigo",
// });

export default ideaAlternative;
