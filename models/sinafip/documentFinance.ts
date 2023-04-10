import Sequelize from "sequelize-oracle";
import db from "../../db/connection";

const documentFinance = db.define(
    "documentFinance",
    {
        id: { type: Sequelize.UUID, primaryKey: true, allowNull: false, defaultValue: Sequelize.UUIDV4, },
        institutionId: { type: Sequelize.UUID },
        name: { type: Sequelize.STRING },
    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

export default documentFinance;

export interface IDocumentFinance{
    id?: string;
    institutionId?: string;
    name: string;
}