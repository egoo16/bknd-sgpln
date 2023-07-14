"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProjects = exports.getProjectById = exports.addTrack = exports.createProject = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const seguimiento_1 = require("../../models/seguimiento");
function createProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let transaction = yield connection_1.default.transaction();
        try {
            let projectModel = req.body;
            projectModel.advance = 0;
            projectModel.status = 'REGISTER';
            console.log("🚀 ~ file: seguimiento.controller.ts:20 ~ createProject ~ projectModel", projectModel);
            let allTracks = [];
            const projectCreated = yield seguimiento_1.project.create(Object.assign({}, projectModel), { transaction });
            let proj = {
                id: projectCreated.id,
                author: projectCreated.author,
                correlative: projectCreated.correlative,
                process: projectCreated.process,
                sector: projectCreated.sector,
                depto: projectCreated.depto,
                munic: projectCreated.munic,
                nameProject: projectCreated.nameProject,
                ministry: projectCreated.ministry,
                isMinistry: projectCreated.isMinistry,
                legalLand: projectCreated.legalLand,
                agripManage: projectCreated.agripManage,
                snipCode: projectCreated.snipCode,
                observations: projectCreated.observations,
                advance: projectCreated.advance,
                status: projectCreated.status,
            };
            const tracking = req.body.tracking;
            if ((tracking === null || tracking === void 0 ? void 0 : tracking.length) > 0) {
                const resTracking = yield Promise.all(tracking.map((prog) => __awaiter(this, void 0, void 0, function* () {
                    const res = yield createTrack(prog, projectCreated.id, transaction);
                    return res;
                })));
                allTracks = [...resTracking];
                const response = {
                    project: Object.assign(Object.assign({}, proj), { tracking: allTracks })
                };
                transaction.commit();
                return res.status(201).send(response);
            }
            else {
                const response = {
                    project: Object.assign(Object.assign({}, proj), { tracking: allTracks })
                };
                transaction.commit();
                return res.status(201).send(response);
            }
        }
        catch (error) {
            transaction.rollback();
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.createProject = createProject;
function addTrack(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let transaction = yield connection_1.default.transaction();
        try {
            const idProject = req.params.id;
            const trackModel = req.body;
            let trackCreated = yield createTrack(trackModel, idProject, transaction);
            const response = yield getProjectCompleto(idProject);
            transaction.commit();
            return res.status(201).send(response);
        }
        catch (error) {
            transaction.rollback();
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.addTrack = addTrack;
function createTrack(trackModel, projectId, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let projectUd = yield seguimiento_1.project.findOne({
                where: {
                    id: projectId
                }
            });
            if (projectUd) {
                const a = parseInt(trackModel.iapa);
                const b = parseInt(trackModel.iapb);
                const c = parseInt(trackModel.iapc);
                const totalProgress = a + b + c;
                if (totalProgress == 100) {
                    projectUd.status = 'FINISHED';
                }
                projectUd.advance = totalProgress;
                yield projectUd.save({ transaction });
            }
            else {
                throw new Error("No se Encontro el proyecto ");
            }
            const trackCreated = yield seguimiento_1.track.create(Object.assign(Object.assign({}, trackModel), { projectId }));
            if (trackModel.advisoryEpi) {
                let advEpi = trackModel.advisoryEpi;
                advEpi.doc = '';
                let advEpiCreated = yield seguimiento_1.advisoryEpi.create(Object.assign(Object.assign({}, advEpi), { trackId: trackCreated.id }), { transaction });
            }
            if (trackModel.advisoryDoc) {
                let advDoc = trackModel.advisoryDoc;
                let cments = [];
                cments = trackModel.advisoryDoc.comments;
                let advEpiCreated = yield seguimiento_1.advisoryDoc.create(Object.assign(Object.assign({}, advDoc), { trackId: trackCreated.id }), { transaction });
                if (cments.length > 0) {
                    const cmProm = yield Promise.all(cments.map((cmt) => __awaiter(this, void 0, void 0, function* () {
                        cmt.advisoryDocId = advEpiCreated.id;
                        const response = yield seguimiento_1.comment.create(Object.assign({}, cmt), { transaction });
                    })));
                }
            }
            if (trackModel.visitCard) {
                let vsCard = trackModel.visitCard;
                let vsCardCreated = yield seguimiento_1.visitCard.create(Object.assign(Object.assign({}, vsCard), { trackId: trackCreated.id }), { transaction });
                // Variables de otras tablas
                let accessRds = [];
                let mtransport = [];
                let srvInf = [];
                let dsters = [];
                let thrTypes = [];
                let imgVst = [];
                let avlOrg = [];
                // asignacion de variables 
                accessRds = trackModel.visitCard.accessRoads;
                mtransport = trackModel.visitCard.meanstransport;
                srvInf = trackModel.visitCard.serviceInf;
                dsters = trackModel.visitCard.disasters;
                thrTypes = trackModel.visitCard.threatTypes;
                imgVst = trackModel.visitCard.imgVisit;
                avlOrg = trackModel.visitCard.availableOrg;
                // Creacion de Registros
                console.log("🚀 ~ file: seguimiento.controller.ts:157 ~ createTrack ~ accessRds.length", accessRds.length);
                if (accessRds.length > 0) {
                    const resProm = yield Promise.all(accessRds.map((obj) => __awaiter(this, void 0, void 0, function* () {
                        obj.visitCardId = vsCardCreated.id;
                        const response = yield seguimiento_1.accessRoads.create(Object.assign({}, obj), { transaction });
                    })));
                }
                console.log("🚀 ~ file: seguimiento.controller.ts:165 ~ createTrack ~ mtransport.length", mtransport);
                if (mtransport.length > 0) {
                    const resProm = yield Promise.all(mtransport.map((obj) => __awaiter(this, void 0, void 0, function* () {
                        obj.visitCardId = vsCardCreated.id;
                        const response = yield seguimiento_1.meansTransport.create(Object.assign({}, obj), { transaction });
                    })));
                }
                if (srvInf.length > 0) {
                    const resProm = yield Promise.all(srvInf.map((obj) => __awaiter(this, void 0, void 0, function* () {
                        obj.visitCardId = vsCardCreated.id;
                        const response = yield seguimiento_1.serviceInf.create(Object.assign({}, obj), { transaction });
                    })));
                }
                if (dsters.length > 0) {
                    const resProm = yield Promise.all(dsters.map((obj) => __awaiter(this, void 0, void 0, function* () {
                        obj.visitCardId = vsCardCreated.id;
                        const response = yield seguimiento_1.disasters.create(Object.assign({}, obj), { transaction });
                    })));
                }
                if (thrTypes.length > 0) {
                    const resProm = yield Promise.all(thrTypes.map((obj) => __awaiter(this, void 0, void 0, function* () {
                        obj.visitCardId = vsCardCreated.id;
                        const response = yield seguimiento_1.threatTypes.create(Object.assign({}, obj), { transaction });
                    })));
                }
                if (imgVst.length > 0) {
                    const resProm = yield Promise.all(imgVst.map((obj) => __awaiter(this, void 0, void 0, function* () {
                        obj.visitCardId = vsCardCreated.id;
                        const response = yield seguimiento_1.imgVisit.create(Object.assign({}, obj), { transaction });
                    })));
                }
                if (avlOrg.length > 0) {
                    const resProm = yield Promise.all(avlOrg.map((obj) => __awaiter(this, void 0, void 0, function* () {
                        obj.visitCardId = vsCardCreated.id;
                        const response = yield seguimiento_1.availableOrg.create(Object.assign({}, obj), { transaction });
                    })));
                }
            }
            return trackCreated;
        }
        catch (error) {
            throw `Error al ingresar Track: ${error}`;
        }
    });
}
function getProjectById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (id) {
                const response = yield getProjectCompleto(id);
                return res.status(201).send(response);
            }
            else {
                res.status(500).send({
                    msj: 'No se encontro el Projecto con ID: ' + id
                });
            }
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.getProjectById = getProjectById;
function getAllProjects(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let where = {};
            let filtros = req.query;
            console.log("🚀 ~ file: seguimiento.controller.ts:155 ~ getAllProjects ~ filtros", filtros);
            let projectsResponse = [];
            if (filtros) {
                if (filtros.isMinistry) {
                    let ministry = (filtros.isMinistry === 'true');
                    where.isMinistry = ministry;
                }
                if (filtros.status) {
                    where.status = filtros.status;
                }
                if (filtros.departamento) {
                    where.depto = filtros.departamento;
                }
                if (filtros.municipio) {
                    where.munic = filtros.municipio;
                }
                if (filtros.mes) {
                    let year = 2022;
                    let nextYear = 2022;
                    if (filtros.year) {
                        year = parseInt(filtros.year);
                        nextYear = parseInt(filtros.year);
                    }
                    else {
                        year = 2022;
                    }
                    let month = parseInt(filtros.mes);
                    let nextMonth = month + 1;
                    if (nextMonth > 12) {
                        nextMonth = 1;
                        nextYear = year + 1;
                    }
                    where.createdAt = { $between: [new Date(`${filtros.mes}-1-${year}`), new Date(`${nextMonth}-1-${nextYear}`)] };
                }
                if (filtros.entidad) {
                    where.ministry = filtros.entidad;
                }
                const projects = yield seguimiento_1.project.findAll({ where, order: '"createdAt" DESC' });
                if (projects.length > 0) {
                    const resProm = yield Promise.all(projects.map((project) => __awaiter(this, void 0, void 0, function* () {
                        const response = yield getProjectCompleto(project.id);
                        projectsResponse.push(response);
                    })));
                    projectsResponse.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    return res.status(201).send({ projects: projectsResponse });
                }
                else {
                    return res.status(201).send({ projects: [] });
                }
            }
            else {
                const projects = yield seguimiento_1.project.findAll({ order: '"createdAt" DESC' });
                if (projects.length > 0) {
                    const resProm = yield Promise.all(projects.map((project) => __awaiter(this, void 0, void 0, function* () {
                        const response = yield getProjectCompleto(project.id);
                        projectsResponse.push(response);
                    })));
                    return res.status(201).send({ projects: projectsResponse });
                }
                else {
                    return res.status(201).send({ projects: [] });
                }
            }
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.getAllProjects = getAllProjects;
function getProjectCompleto(idProject) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const projectFind = yield seguimiento_1.project.findOne({
                where: { id: idProject },
                include: [
                    {
                        required: false,
                        model: seguimiento_1.track
                    },
                ],
                order: '"createdAt" DESC'
            });
            console.log((_a = projectFind === null || projectFind === void 0 ? void 0 : projectFind.tracks) === null || _a === void 0 ? void 0 : _a.length);
            if (projectFind) {
                let allData = [];
                if (((_b = projectFind === null || projectFind === void 0 ? void 0 : projectFind.tracks) === null || _b === void 0 ? void 0 : _b.length) > 0 || ((_c = projectFind === null || projectFind === void 0 ? void 0 : projectFind.tracks) === null || _c === void 0 ? void 0 : _c.length)) {
                    allData = yield Promise.all(projectFind === null || projectFind === void 0 ? void 0 : projectFind.tracks.map((trackI) => __awaiter(this, void 0, void 0, function* () {
                        let advEpiFind = yield seguimiento_1.advisoryEpi.findOne({ where: { trackId: trackI.id } });
                        if (advEpiFind) {
                            let trackResult = {
                                id: trackI.id,
                                iapa: trackI.iapa,
                                iapb: trackI.iapb,
                                iapc: trackI.iapc,
                                activity: trackI.activity,
                                reportDate: trackI.reportDate,
                                projectId: trackI.projectId,
                                createdAt: trackI.createdAt,
                                updatedAt: trackI.updatedAt,
                                deletedAt: trackI.deletedAt,
                                advisoryEpi: advEpiFind
                            };
                            return trackResult;
                        }
                        let advDocFind = yield seguimiento_1.advisoryDoc.findOne({ where: { trackId: trackI.id } });
                        if (advDocFind) {
                            let cmnts = [];
                            cmnts = yield seguimiento_1.comment.findAll({
                                where: {
                                    advisoryDocId: advDocFind.id,
                                }
                            });
                            const advDocModel = {
                                id: advDocFind.id,
                                trackId: advDocFind.trackId,
                                goal: advDocFind.goal,
                                action: advDocFind.action,
                                unitSpecific: advDocFind.unitSpecific,
                                sectorization: advDocFind.sectorization,
                                subSectorization: advDocFind.subSectorization,
                                menAttended: advDocFind.menAttended,
                                womenAttended: advDocFind.womenAttended,
                                totalAttended: advDocFind.totalAttended,
                                counselingModality: advDocFind.counselingModality,
                                advTheme: advDocFind.advTheme,
                                snipCode: advDocFind.snipCode,
                                projectName: advDocFind.projectName,
                                participant: advDocFind.participant,
                                analysisDate: advDocFind.analysisDate,
                                advDate: advDocFind.advDate,
                                assistant: advDocFind.assistant,
                                conclusions: advDocFind.conclusions,
                                recomend: advDocFind.recomend,
                                comments: cmnts
                            };
                            let trackResult = {
                                id: trackI.id,
                                iapa: trackI.iapa,
                                iapb: trackI.iapb,
                                iapc: trackI.iapc,
                                activity: trackI.activity,
                                reportDate: trackI.reportDate,
                                projectId: trackI.projectId,
                                createdAt: trackI.createdAt,
                                updatedAt: trackI.updatedAt,
                                deletedAt: trackI.deletedAt,
                                advisoryDoc: advDocModel
                            };
                            return trackResult;
                        }
                        let findVsCard = yield seguimiento_1.visitCard.findOne({ where: { trackId: trackI.id } });
                        if (findVsCard) {
                            let cardVisit = yield getVisitCardComplete(findVsCard.id);
                            if (cardVisit) {
                                let trackResult = {
                                    id: trackI.id,
                                    iapa: trackI.iapa,
                                    iapb: trackI.iapb,
                                    iapc: trackI.iapc,
                                    activity: trackI.activity,
                                    reportDate: trackI.reportDate,
                                    projectId: trackI.projectId,
                                    createdAt: trackI.createdAt,
                                    updatedAt: trackI.updatedAt,
                                    deletedAt: trackI.deletedAt,
                                    visitCard: cardVisit
                                };
                                return trackResult;
                            }
                        }
                        if (!advEpiFind && !advDocFind) {
                            return trackI;
                        }
                    })));
                    // const allTracks = await track.findAll({
                    //     where: { id: projectFind.id },
                    //     order: '"createdAt" DESC'
                    // })
                    let proj = {
                        id: projectFind.id,
                        author: projectFind.author,
                        correlative: projectFind.correlative,
                        process: projectFind.process,
                        sector: projectFind.sector,
                        depto: projectFind.depto,
                        munic: projectFind.munic,
                        nameProject: projectFind.nameProject,
                        ministry: projectFind.ministry,
                        isMinistry: projectFind.isMinistry,
                        legalLand: projectFind.legalLand,
                        agripManage: projectFind.agripManage,
                        snipCode: projectFind.snipCode,
                        advance: projectFind.advance,
                        status: projectFind.status,
                        observations: projectFind.observations,
                        createdAt: projectFind.createdAt,
                        updatedAt: projectFind.updatedAt,
                        deletedAt: projectFind.deletedAt,
                        tracking: allData
                    };
                    const response = Object.assign({}, proj);
                    return response;
                }
                else {
                    let proj = {
                        id: projectFind.id,
                        author: projectFind.author,
                        correlative: projectFind.correlative,
                        process: projectFind.process,
                        sector: projectFind.sector,
                        depto: projectFind.depto,
                        munic: projectFind.munic,
                        nameProject: projectFind.nameProject,
                        ministry: projectFind.ministry,
                        isMinistry: projectFind.isMinistry,
                        legalLand: projectFind.legalLand,
                        agripManage: projectFind.agripManage,
                        snipCode: projectFind.snipCode,
                        advance: projectFind.advance,
                        status: projectFind.status,
                        observations: projectFind.observations,
                        createdAt: projectFind.createdAt,
                        updatedAt: projectFind.updatedAt,
                        deletedAt: projectFind.deletedAt,
                        tracking: []
                    };
                    const response = Object.assign({}, proj);
                    return response;
                }
            }
            else {
                throw `Proyecto no encontrado`;
            }
        }
        catch (error) {
            throw `Error al obtener Proyecto completo: ${error}`;
        }
    });
}
function getVisitCardComplete(idVisitCard) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let findVisitCard = yield seguimiento_1.visitCard.findOne({ where: { id: idVisitCard } });
            let accessRoadsResult = [];
            let meansTransportResult = [];
            let serviceInfResult = [];
            let disastersResult = [];
            let threatTypesResult = [];
            let imgVisitResult = [];
            let availableOrgResult = [];
            accessRoadsResult = yield seguimiento_1.accessRoads.findAll({ where: { visitCardId: findVisitCard.id } });
            meansTransportResult = yield seguimiento_1.meansTransport.findAll({ where: { visitCardId: findVisitCard.id } });
            serviceInfResult = yield seguimiento_1.serviceInf.findAll({ where: { visitCardId: findVisitCard.id } });
            disastersResult = yield seguimiento_1.disasters.findAll({ where: { visitCardId: findVisitCard.id } });
            threatTypesResult = yield seguimiento_1.threatTypes.findAll({ where: { visitCardId: findVisitCard.id } });
            imgVisitResult = yield seguimiento_1.imgVisit.findAll({ where: { visitCardId: findVisitCard.id } });
            availableOrgResult = yield seguimiento_1.availableOrg.findAll({ where: { visitCardId: findVisitCard.id } });
            if (findVisitCard) {
                let card = {
                    id: findVisitCard.id,
                    trackId: findVisitCard.trackId,
                    codePreinv: findVisitCard.codePreinv,
                    visitDate: findVisitCard.visitDate,
                    deptoDel: findVisitCard.deptoDel,
                    specialistName: findVisitCard.specialistName,
                    proposalName: findVisitCard.proposalName,
                    mountAprox: findVisitCard.mountAprox,
                    region: findVisitCard.region,
                    depto: findVisitCard.depto,
                    municip: findVisitCard.municip,
                    address: findVisitCard.address,
                    typeAddress: findVisitCard.typeAddress,
                    catLocation: findVisitCard.catLocation,
                    typeClimate: findVisitCard.typeClimate,
                    avgTemperature: findVisitCard.avgTemperature,
                    distanceKm: findVisitCard.distanceKm,
                    nameHeadboard: findVisitCard.nameHeadboard,
                    isDrinkingWater: findVisitCard.isDrinkingWater,
                    isDrainageNetwork: findVisitCard.isDrainageNetwork,
                    isElectricity: findVisitCard.isElectricity,
                    isPhoneService: findVisitCard.isPhoneService,
                    isDrinkableWhater: findVisitCard.isDrinkableWhater,
                    garbageDisposal: findVisitCard.garbageDisposal,
                    latitud: findVisitCard.latitud,
                    longitud: findVisitCard.longitud,
                    gtmx: findVisitCard.gtmx,
                    gtmy: findVisitCard.gtmy,
                    elevation: findVisitCard.elevation,
                    msnm: findVisitCard.msnm,
                    infRealEstate: findVisitCard.infRealEstate,
                    groundConditions: findVisitCard.groundConditions,
                    approximateSlope: findVisitCard.approximateSlope,
                    soilType: findVisitCard.soilType,
                    realEstateArea: findVisitCard.realEstateArea,
                    northMeasure: findVisitCard.northMeasure,
                    southMeasure: findVisitCard.southMeasure,
                    eastMeasure: findVisitCard.eastMeasure,
                    westMeasure: findVisitCard.westMeasure,
                    northBorder: findVisitCard.northBorder,
                    southBorder: findVisitCard.southBorder,
                    eastBorder: findVisitCard.eastBorder,
                    westBorder: findVisitCard.westBorder,
                    legalSituation: findVisitCard.legalSituation,
                    basicServRS: findVisitCard.basicServRS,
                    isElectricityRS: findVisitCard.isElectricityRS,
                    isPhoneRS: findVisitCard.isPhoneRS,
                    isDrainageRS: findVisitCard.isDrainageRS,
                    isDrinkingWRS: findVisitCard.isDrinkingWRS,
                    garbageRS: findVisitCard.garbageRS,
                    isReqFinance: findVisitCard.isReqFinance,
                    desReqFinance: findVisitCard.desReqFinance,
                    appStatus: findVisitCard.appStatus,
                    techNameEpi: findVisitCard.techNameEpi,
                    techPosEpi: findVisitCard.techPosEpi,
                    techProfEpi: findVisitCard.techProfEpi,
                    theirAgree: findVisitCard.theirAgree,
                    specifyAnswer: findVisitCard.specifyAnswer,
                    observationsGeneral: findVisitCard.observationsGeneral,
                    createdAt: findVisitCard.createdAt,
                    updatedAt: findVisitCard.updatedAt,
                    deletedAt: findVisitCard.deletedAt,
                    accessRoads: accessRoadsResult,
                    meanstransport: meansTransportResult,
                    serviceInf: serviceInfResult,
                    disasters: disastersResult,
                    threatTypes: threatTypesResult,
                    imgVisit: imgVisitResult,
                    availableOrg: availableOrgResult,
                };
                return card;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw `Error al obtener Hoja de Visita completa: ${error}`;
        }
    });
}
