"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_oracle_1 = __importDefault(require("sequelize-oracle"));
const connection_1 = __importDefault(require("../../db/connection"));
const accessRoads_entity_1 = __importDefault(require("./accessRoads.entity"));
const meansTransport_entity_1 = __importDefault(require("./meansTransport.entity"));
const serviceInf_entity_1 = __importDefault(require("./serviceInf.entity"));
const disasters_entity_1 = __importDefault(require("./disasters.entity"));
const threatTypes_entity_1 = __importDefault(require("./threatTypes.entity"));
const imgVisit_entity_1 = __importDefault(require("./imgVisit.entity"));
const visitCard = connection_1.default.define("visitCard", {
    id: { type: sequelize_oracle_1.default.UUID, primaryKey: true, allowNull: false, defaultValue: sequelize_oracle_1.default.UUIDV4, },
    trackId: { type: sequelize_oracle_1.default.UUID },
    codePreinv: { type: sequelize_oracle_1.default.STRING },
    visitDate: { type: sequelize_oracle_1.default.STRING },
    deptoDel: { type: sequelize_oracle_1.default.STRING },
    specialistName: { type: sequelize_oracle_1.default.STRING },
    proposalName: { type: sequelize_oracle_1.default.STRING },
    mountAprox: { type: sequelize_oracle_1.default.INTEGER },
    region: { type: sequelize_oracle_1.default.INTEGER },
    depto: { type: sequelize_oracle_1.default.STRING },
    municip: { type: sequelize_oracle_1.default.STRING },
    address: { type: sequelize_oracle_1.default.STRING },
    typeAddress: { type: sequelize_oracle_1.default.BOOLEAN },
    catLocation: { type: sequelize_oracle_1.default.STRING },
    typeClimate: { type: sequelize_oracle_1.default.STRING },
    avgTemperature: { type: sequelize_oracle_1.default.STRING },
    distanceKm: { type: sequelize_oracle_1.default.STRING },
    nameHeadboard: { type: sequelize_oracle_1.default.STRING },
    isDrinkingWater: { type: sequelize_oracle_1.default.BOOLEAN },
    isDrainageNetwork: { type: sequelize_oracle_1.default.BOOLEAN },
    isElectricity: { type: sequelize_oracle_1.default.BOOLEAN },
    isPhoneService: { type: sequelize_oracle_1.default.BOOLEAN },
    isDrinkableWhater: { type: sequelize_oracle_1.default.BOOLEAN },
    garbageDisposal: { type: sequelize_oracle_1.default.STRING },
    latitud: { type: sequelize_oracle_1.default.STRING },
    longitud: { type: sequelize_oracle_1.default.STRING },
    gtmx: { type: sequelize_oracle_1.default.STRING },
    gtmy: { type: sequelize_oracle_1.default.STRING },
    elevation: { type: sequelize_oracle_1.default.STRING },
    msnm: { type: sequelize_oracle_1.default.STRING },
    infRealEstate: { type: sequelize_oracle_1.default.STRING },
    groundConditions: { type: sequelize_oracle_1.default.STRING },
    approximateSlope: { type: sequelize_oracle_1.default.INTEGER },
    soilType: { type: sequelize_oracle_1.default.STRING },
    realEstateArea: { type: sequelize_oracle_1.default.INTEGER },
    northMeasure: { type: sequelize_oracle_1.default.DECIMAL },
    southMeasure: { type: sequelize_oracle_1.default.DECIMAL },
    eastMeasure: { type: sequelize_oracle_1.default.DECIMAL },
    westMeasure: { type: sequelize_oracle_1.default.DECIMAL },
    northBorder: { type: sequelize_oracle_1.default.STRING },
    southBorder: { type: sequelize_oracle_1.default.STRING },
    eastBorder: { type: sequelize_oracle_1.default.STRING },
    westBorder: { type: sequelize_oracle_1.default.STRING },
    legalSituation: { type: sequelize_oracle_1.default.STRING },
    basicServRS: { type: sequelize_oracle_1.default.STRING },
    isElectricityRS: { type: sequelize_oracle_1.default.BOOLEAN },
    isPhoneRS: { type: sequelize_oracle_1.default.BOOLEAN },
    isDrainageRS: { type: sequelize_oracle_1.default.BOOLEAN },
    isDrinkingWRS: { type: sequelize_oracle_1.default.BOOLEAN },
    garbageRS: { type: sequelize_oracle_1.default.BOOLEAN },
    isReqFinance: { type: sequelize_oracle_1.default.BOOLEAN },
    desReqFinance: { type: sequelize_oracle_1.default.STRING },
    appStatus: { type: sequelize_oracle_1.default.STRING },
    techNameEpi: { type: sequelize_oracle_1.default.STRING },
    techPosEpi: { type: sequelize_oracle_1.default.STRING },
    techProfEpi: { type: sequelize_oracle_1.default.STRING },
}, {
    underscoded: true,
    paranoid: true,
    freezeTableName: true,
});
visitCard.hasMany(accessRoads_entity_1.default, { foreingKey: 'visitCardId' });
visitCard.hasMany(meansTransport_entity_1.default, { foreingKey: 'visitCardId' });
visitCard.hasMany(serviceInf_entity_1.default, { foreingKey: 'visitCardId' });
visitCard.hasMany(disasters_entity_1.default, { foreingKey: 'visitCardId' });
visitCard.hasMany(threatTypes_entity_1.default, { foreingKey: 'visitCardId' });
visitCard.hasMany(imgVisit_entity_1.default, { foreingKey: 'visitCardId' });
exports.default = visitCard;