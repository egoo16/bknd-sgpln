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
const project_entity_1 = __importDefault(require("../../models/seguimiento/project.entity"));
const track_entity_1 = __importDefault(require("../../models/seguimiento/track.entity"));
const advisoryEpi_1 = __importDefault(require("../../models/seguimiento/advisoryEpi"));
const advisoryDoc_1 = __importDefault(require("../../models/seguimiento/advisoryDoc"));
const comment_1 = __importDefault(require("../../models/seguimiento/comment"));
function createProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let projectModel = req.body;
            projectModel.advance = 0;
            projectModel.status = 'REGISTER';
            let allTracks = [];
            const projectCreated = yield project_entity_1.default.create(Object.assign({}, projectModel));
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
                    const res = yield createTrack(prog, projectCreated.id);
                    return res;
                })));
                allTracks = [...resTracking];
                const response = {
                    project: Object.assign(Object.assign({}, proj), { tracking: allTracks })
                };
                return res.status(201).send(response);
            }
            else {
                const response = {
                    project: Object.assign(Object.assign({}, proj), { tracking: allTracks })
                };
                return res.status(201).send(response);
            }
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.createProject = createProject;
function addTrack(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const idProject = req.params.id;
            const trackModel = req.body;
            let trackCreated = yield createTrack(trackModel, idProject);
            const response = yield getProjectCompleto(idProject);
            return res.status(201).send(response);
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.addTrack = addTrack;
function createTrack(trackModel, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        let projectUd = yield project_entity_1.default.findOne({
            where: {
                id: projectId
            }
        });
        if (projectUd) {
            const a = parseInt(trackModel.iapa);
            const b = parseInt(trackModel.iapb);
            const c = parseInt(trackModel.iapc);
            const totalProgress = a + b + c;
            projectUd.advance = totalProgress;
            yield projectUd.save();
        }
        else {
            throw new Error("No se Encontro el proyecto ");
        }
        const trackCreated = yield track_entity_1.default.create(Object.assign(Object.assign({}, trackModel), { projectId }));
        if (trackModel.advisoryEpi) {
            let advEpi = trackModel.advisoryEpi;
            advEpi.doc = '';
            let advEpiCreated = yield advisoryEpi_1.default.create(Object.assign(Object.assign({}, advEpi), { trackId: trackCreated.id }));
        }
        if (trackModel.advisoryDoc) {
            let advDoc = trackModel.advisoryDoc;
            let cments = [];
            cments = trackModel.advisoryDoc.comments;
            let advEpiCreated = yield advisoryDoc_1.default.create(Object.assign(Object.assign({}, advDoc), { trackId: trackCreated.id }));
            if (cments.length > 0) {
                const cmProm = yield Promise.all(cments.map((cmt) => __awaiter(this, void 0, void 0, function* () {
                    cmt.advisoryDocId = advEpiCreated.id;
                    const response = yield comment_1.default.create(Object.assign({}, cmt));
                })));
            }
        }
        return trackCreated;
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
            let projectsResponse = [];
            if (filtros) {
                if (filtros.isMinistry) {
                    let ministry = (filtros.isMinistry === 'true');
                    where.isMinistry = ministry;
                }
                if (filtros.status) {
                    where.status = filtros.status;
                }
                const projects = yield project_entity_1.default.findAll({ where, order: '"createdAt" DESC' });
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
                const projects = yield project_entity_1.default.findAll({ order: '"createdAt" DESC' });
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
            const projectFind = yield project_entity_1.default.findOne({
                where: { id: idProject },
                include: [
                    {
                        required: false,
                        model: track_entity_1.default
                    },
                ],
                order: '"createdAt" DESC'
            });
            console.log((_a = projectFind === null || projectFind === void 0 ? void 0 : projectFind.tracks) === null || _a === void 0 ? void 0 : _a.length);
            if (projectFind) {
                let allData = [];
                if (((_b = projectFind === null || projectFind === void 0 ? void 0 : projectFind.tracks) === null || _b === void 0 ? void 0 : _b.length) > 0 || ((_c = projectFind === null || projectFind === void 0 ? void 0 : projectFind.tracks) === null || _c === void 0 ? void 0 : _c.length)) {
                    allData = yield Promise.all(projectFind === null || projectFind === void 0 ? void 0 : projectFind.tracks.map((trackI) => __awaiter(this, void 0, void 0, function* () {
                        let advEpiFind = yield advisoryEpi_1.default.findOne({ where: { trackId: trackI.id } });
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
                        let advDocFind = yield advisoryDoc_1.default.findOne({ where: { trackId: trackI.id } });
                        if (advDocFind) {
                            let cmnts = [];
                            cmnts = yield comment_1.default.findAll({
                                where: {
                                    advisoryDocId: advDocFind.id,
                                }
                            });
                            const advDocModel = {
                                id: advDocFind.id,
                                trackId: advDocFind.trackId,
                                goal: advDocFind.goal,
                                action: advDocFind.action,
                                entity: advDocFind.entity,
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
