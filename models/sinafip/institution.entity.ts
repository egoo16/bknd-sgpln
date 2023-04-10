import db from "../../db/connection";
import Sequelize from "sequelize-oracle";
import documentFinance from "./documentFinance";

const institutionEntity = db.define('institution', {

    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    entityName: {
        type: Sequelize.STRING,
    },
    executionUnit: {
        type: Sequelize.STRING,
    },
    functionProjName: {
        type: Sequelize.STRING
    },
    generalStudy: {
        type: Sequelize.STRING
    },
    dcmntPreinvest: {
        type: Sequelize.STRING //delete
    },
    documentProject: {
        type: Sequelize.STRING
    },
    responsibleName: {
        type: Sequelize.STRING
    },
    contactEmail: {
        type: Sequelize.STRING
    },
    phoneNumber: {
        type: Sequelize.STRING
    },
    requestId: {
        type: Sequelize.UUID
    }
},
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    });
institutionEntity.hasMany(documentFinance, { foreingKey: 'institutionId' })

export default institutionEntity;

