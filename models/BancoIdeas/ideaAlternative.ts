import Sequelize from "sequelize-oracle";

import db from "../../db/connection";

const ideaAlternative = db.define(
    "ideaAlternative",
    {
        codigo: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        sectionBIId: { type: Sequelize.UUID, allowNull: false },
        state: { type: Sequelize.BOOLEAN },

    },
    {
        underscoded: true,
        paranoid: true,
    }
);

export default ideaAlternative;
