import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const geografico = db.define(
    "geografico",
    {
        codigo: { field: 'GEOGRAFICO',
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
        name: { field: 'NOMBRE', type: Sequelize.STRING },
        sigla: { field: 'SIGLA', type: Sequelize.STRING },
        region: { field: 'REGION', type: Sequelize.INTEGER },
        contenido: { field: 'CONTENIDO', type: Sequelize.STRING },
        restrictiva: { field: 'RESTRICTIVA', type: Sequelize.STRING },
        municipio_erp: { field: 'MUNICIPIO_ERP', type: Sequelize.STRING },
        departamento: { field: 'DEPTO', type: Sequelize.STRING },
    },
    {
        underscoded: true,
        paranoid: true,
        tableName: 'SINIP.CG_GEOGRAFICO'
    }
);

export default geografico;
