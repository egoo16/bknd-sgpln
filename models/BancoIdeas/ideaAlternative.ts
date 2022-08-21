import Sequelize from "sequelize-oracle";

import db from "../../db/connection";
import generalInformation from "./generalInformation";
import geographicArea from "./geographicArea";
import populationDelimitation from "./populationDelimitation";
import preInvestment from "./preInvestment";
import preliminaryName from "./preliminaryName";
import projectDescription from "./projectDescription";
import qualification from "./qualification";
import responsibleEntity from "./responsibleEntity";

const ideaAlternative = db.define(
    "alter",
    {
    codigo: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
        sectionBIId: { type: Sequelize.UUID, allowNull: false },
        state: { type: Sequelize.STRING },

    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

ideaAlternative.hasOne(preliminaryName, {
    foreignKey: "AlterId",
});
ideaAlternative.hasOne(responsibleEntity, {
    foreignKey: "AlterId",
});
ideaAlternative.hasOne(populationDelimitation, {
    foreignKey: "AlterId",
});
ideaAlternative.hasOne(geographicArea, {
    foreignKey: "AlterId",
});
ideaAlternative.hasOne(projectDescription, {
    foreignKey: "AlterId",
});
ideaAlternative.hasOne(qualification, { foreignKey: "AlterId" });
ideaAlternative.hasOne(preInvestment, { foreignKey: "AlterId" });

// ideaAlternative.belongsTo(generalInformation, {
//     foreignKey: "sectionBIId",
//     sourceKey: "codigo",
// });

export default ideaAlternative;
