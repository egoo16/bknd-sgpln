import Sequelize from "sequelize-oracle";
import db from "../../db/connection";
import accessRoads from "./accessRoads.entity";
import meansTransport from './meansTransport.entity';
import serviceInf from './serviceInf.entity';
import disasters from './disasters.entity';
import threatTypes from './threatTypes.entity';
import imgVisit from './imgVisit.entity';


const visitCard = db.define(
    "visitCard",
    {
        id: { type: Sequelize.UUID, primaryKey: true, allowNull: false, defaultValue: Sequelize.UUIDV4, },
        trackId: { type: Sequelize.UUID },
        codePreinv: { type: Sequelize.STRING },
        visitDate: { type: Sequelize.STRING },
        deptoDel: { type: Sequelize.STRING },
        specialistName: { type: Sequelize.STRING },
        proposalName: { type: Sequelize.STRING },
        mountAprox: { type: Sequelize.INTEGER },
        region: { type: Sequelize.INTEGER },
        depto: { type: Sequelize.STRING },
        municip: { type: Sequelize.STRING },
        address: { type: Sequelize.STRING },
        typeAddress: { type: Sequelize.BOOLEAN },
        catLocation: { type: Sequelize.STRING },
        typeClimate: { type: Sequelize.STRING },
        avgTemperature: { type: Sequelize.STRING },
        distanceKm: { type: Sequelize.STRING },
        nameHeadboard: { type: Sequelize.STRING },
        isDrinkingWater: { type: Sequelize.BOOLEAN },
        isDrainageNetwork: { type: Sequelize.BOOLEAN },
        isElectricity: { type: Sequelize.BOOLEAN },
        isPhoneService: { type: Sequelize.BOOLEAN },
        isDrinkableWhater: { type: Sequelize.BOOLEAN },
        garbageDisposal: { type: Sequelize.STRING },
        latitud: { type: Sequelize.STRING },
        longitud: { type: Sequelize.STRING },
        gtmx: { type: Sequelize.STRING },
        gtmy: { type: Sequelize.STRING },
        elevation: { type: Sequelize.STRING },
        msnm: { type: Sequelize.STRING },
        infRealEstate: { type: Sequelize.STRING },
        groundConditions: { type: Sequelize.STRING },
        approximateSlope: { type: Sequelize.INTEGER },
        soilType: { type: Sequelize.STRING },
        realEstateArea: { type: Sequelize.INTEGER },
        northMeasure: { type: Sequelize.DECIMAL },
        southMeasure: { type: Sequelize.DECIMAL },
        eastMeasure: { type: Sequelize.DECIMAL },
        westMeasure: { type: Sequelize.DECIMAL },
        northBorder: { type: Sequelize.STRING },
        southBorder: { type: Sequelize.STRING },
        eastBorder: { type: Sequelize.STRING },
        westBorder: { type: Sequelize.STRING },
        legalSituation: { type: Sequelize.STRING },
        basicServRS: { type: Sequelize.STRING },
        isElectricityRS: { type: Sequelize.BOOLEAN },
        isPhoneRS: { type: Sequelize.BOOLEAN },
        isDrainageRS: { type: Sequelize.BOOLEAN },
        isDrinkingWRS: { type: Sequelize.BOOLEAN },
        garbageRS: { type: Sequelize.BOOLEAN },
        isReqFinance: { type: Sequelize.BOOLEAN },
        desReqFinance: { type: Sequelize.STRING },
        appStatus: { type: Sequelize.STRING },
        techNameEpi: { type: Sequelize.STRING },
        techPosEpi: { type: Sequelize.STRING },
        techProfEpi: { type: Sequelize.STRING },
    },
    {
        underscoded: true,
        paranoid: true,
        freezeTableName: true,
    }
);

visitCard.hasMany(accessRoads, { foreingKey: 'visitCardId' })
visitCard.hasMany(meansTransport, { foreingKey: 'visitCardId' })
visitCard.hasMany(serviceInf, { foreingKey: 'visitCardId' })
visitCard.hasMany(disasters, { foreingKey: 'visitCardId' })
visitCard.hasMany(threatTypes, { foreingKey: 'visitCardId' })
visitCard.hasMany(imgVisit, { foreingKey: 'visitCardId' })

export default visitCard;
