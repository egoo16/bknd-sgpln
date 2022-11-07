import Sequelize from "sequelize-oracle";

import db from "../../db/connection";
import track from "./track.entity";


const project = db.define(
    "project",
    {
        id: {
            type: Sequelize.UUID, primaryKey: true, allowNull: false, defaultValue: Sequelize.UUIDV4,
        },
        author: { type: Sequelize.STRING },
        correlative: { type: Sequelize.INTEGER },
        process: { type: Sequelize.STRING },
        sector: { type: Sequelize.STRING },
        depto: { type: Sequelize.STRING },
        munic: { type: Sequelize.STRING },
        nameProject: { type: Sequelize.STRING },
        ministry: { type: Sequelize.STRING },
        isMinistry: { type: Sequelize.BOOLEAN },
        legalLand: { type: Sequelize.BOOLEAN },
        agripManage: { type: Sequelize.BOOLEAN },
        snipCode: { type: Sequelize.STRING },
        observations: { type: Sequelize.STRING },

    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);
project.hasMany(track, { foreignKey: "projectId" });

// ideaAlternative.hasOne(preliminaryName, {
//     foreignKey: "AlterId",
// });
// ideaAlternative.hasOne(responsibleEntity, {
//     foreignKey: "AlterId",
// });
// ideaAlternative.hasOne(populationDelimitation, {
//     foreignKey: "AlterId",
// });
// ideaAlternative.hasOne(geographicArea, {
//     foreignKey: "AlterId",
// });
// ideaAlternative.hasOne(projectDescription, {
//     foreignKey: "AlterId",
// });
// ideaAlternative.hasOne(qualification, { foreignKey: "AlterId" });
// ideaAlternative.hasOne(preInvestment, { foreignKey: "AlterId" });

// ideaAlternative.belongsTo(generalInformation, {
//     foreignKey: "sectionBIId",
//     sourceKey: "codigo",
// });

export default project;
