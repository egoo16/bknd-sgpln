import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const dataGeo = db.define(
    "dataGeo",
    {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        geoAreaId: { type: Sequelize.STRING, allowNull: false },

        // Situacion Legal del posible bien
        governmentTerrain: { type: Sequelize.BOOLEAN },
        registerGovernmentTerrain: { type: Sequelize.BOOLEAN },
        statusDescribe: { type: Sequelize.STRING },
        finca: { type: Sequelize.STRING },
        folio: { type: Sequelize.STRING },
        libro: { type: Sequelize.STRING },
        
        // caracteristicas del posible terreno
        plano: { type: Sequelize.BOOLEAN },
        slightIncline: { type: Sequelize.BOOLEAN },
        broken: { type: Sequelize.BOOLEAN },
        image: { type: Sequelize.BOOLEAN },
        imageUrl: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING },

        // Servicios basicos
        basicServices: { type: Sequelize.BOOLEAN },
        descriptionBasicServices: { type: Sequelize.STRING },

        // Coordenadas
        degreesx: { type: Sequelize.STRING },
        minutesx: { type: Sequelize.STRING },
        secondsx: { type: Sequelize.STRING },
        degreesy: { type: Sequelize.STRING },
        minutesy: { type: Sequelize.STRING },
        secondsy: { type: Sequelize.STRING },
        descriptionLocation: { type: Sequelize.STRING },
    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

export default dataGeo;