import db from "../../db/connection";
import Sequelize from "sequelize-oracle";

export const relevanceInvestment = db.define('relevanceInvestment', {

    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    rangeMin: { type: Sequelize.INTEGER },
    rangeMax: { type: Sequelize.INTEGER },
    rangeValue: { type: Sequelize.INTEGER },

}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
})

export interface IRelevanceInvestment {
    id?: string;
    rangeMin: number;
    rangeMax: number;
    rangeValue: number;
}


export const relevanceBeneficiaries = db.define('relevanceBeneficiaries', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    rangeMin: { type: Sequelize.INTEGER },
    rangeMax: { type: Sequelize.INTEGER },
    rangeValue: { type: Sequelize.INTEGER },

}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
})

export interface IRelevanceBeneficiaries {
    id?: string;
    rangeMin: number;
    rangeMax: number;
    rangeValue: number;
}

export const relevanceComplexy = db.define('relevanceComplexy', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    name: { type: Sequelize.STRING },
    rangeValue: { type: Sequelize.INTEGER },

}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
})

export interface IRelevanceComplexy {
    id?: string;
    name: string;
    rangeValue: number;
}

export const relevanceStage = db.define('relevanceStage', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    rangeMin: { type: Sequelize.INTEGER },
    rangeMax: { type: Sequelize.INTEGER },
    suggestedStage: { type: Sequelize.STRING },

}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
})

export interface IRelevanceStage {
    id?: string;
    rangeMin: number;
    rangeMax: number;
    suggestedStage: string;
}