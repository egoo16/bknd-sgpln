import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const delimitPopulation = db.define(
    "delimitPopulation",
    {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        type: { type: Sequelize.STRING },
        total: { type: Sequelize.INTEGER },
        delimitId: { type: Sequelize.UUID, allowNull: false },
    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

export default delimitPopulation;


export interface IDelimitPopulation {
    id?: string;
    type: string;
    total: number;
    delimitId?: string;
}