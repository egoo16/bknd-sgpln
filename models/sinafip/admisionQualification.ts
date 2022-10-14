import Sequelize from "sequelize-oracle";
import db from "../../db/connection";

export const admissionQuanty = db.define('admissionQuanty', {

    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    statementNeed: { type: Sequelize.STRING },
    statementNeedDescription: { type: Sequelize.STRING },
    statementNeedValue: { type: Sequelize.INTEGER },
    numberBeneficiaries: { type: Sequelize.STRING },
    numberBeneficiariesDescription: { type: Sequelize.STRING },
    numberBeneficiariesValue: { type: Sequelize.INTEGER },
    objetivesGoals: { type: Sequelize.STRING },
    objetivesGoalsDescription: { type: Sequelize.STRING },
    objetivesGoalsValue: { type: Sequelize.INTEGER },
    tdr: { type: Sequelize.STRING },
    tdrDescription: { type: Sequelize.STRING },
    tdrValue: { type: Sequelize.INTEGER },
    estimatedCost: { type: Sequelize.STRING },
    estimatedCostDescription: { type: Sequelize.STRING },
    estimatedCostValue: { type: Sequelize.INTEGER },
    generalSchedule: { type: Sequelize.STRING },
    generalScheduleDescription: { type: Sequelize.STRING },
    generalScheduleValue: { type: Sequelize.INTEGER },
    total: { type: Sequelize.INTEGER, },
    requestId:{
        type:Sequelize.UUID
    }
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
})