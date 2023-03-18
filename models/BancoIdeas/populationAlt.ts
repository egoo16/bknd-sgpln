import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const populationAlt = db.define(
    "populationAlt",
    {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        type: { type: Sequelize.STRING },
        total: { type: Sequelize.INTEGER },
        popId: { type: Sequelize.UUID, allowNull: false },
    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

export default populationAlt;


export interface IPopulationAlt {
    id?: string;
    type: string;
    total: number;
    popId?: string;
}