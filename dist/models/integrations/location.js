"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const location = connection_1.default.define("location", {
    codigo: { field: 'GEOGRAFICO',
        type: sequelize_oracle_1.default.NUMBER,
        primaryKey: true,
    },
    name: { field: 'NOMBRE', type: sequelize_oracle_1.default.STRING },
    sigla: { field: 'SIGLA', type: sequelize_oracle_1.default.STRING },
    region: { field: 'REGION', type: sequelize_oracle_1.default.NUMBER },
    contenido: { field: 'CONTENIDO', type: sequelize_oracle_1.default.STRING },
    restrictiva: { field: 'RESTRICTIVA', type: sequelize_oracle_1.default.STRING },
    municipio_erp: { field: 'MUNICIPIO_ERP', type: sequelize_oracle_1.default.STRING },
    departamento: { field: 'DEPTO', type: sequelize_oracle_1.default.STRING },
}, {
    underscoded: true,
    paranoid: true,
    tableName: 'SINIP.CG_GEOGRAFICO'
});
exports.default = location;
//# sourceMappingURL=location.js.map