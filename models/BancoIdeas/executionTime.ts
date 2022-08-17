import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const executionTime = db.define(
    "executionTime",
    {
        codigo: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        projectDescriptionId: { type: Sequelize.INTEGER, allowNull: false },   
        tentativeTermMonth: { type: Sequelize.STRING },
        tentativeTermYear: { type: Sequelize.STRING },
        executionDateMonth: { type: Sequelize.STRING },
        executionDateYear: { type: Sequelize.STRING },
        finishDateMonth: { type: Sequelize.STRING },
        finishDateYear: { type: Sequelize.STRING },
        annual: { type: Sequelize.BOOLEAN },

    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

export default executionTime;
