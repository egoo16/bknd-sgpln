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
function createProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const projectModel = req.body;
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
            };
            const tracking = req.body.tracking;
            if ((tracking === null || tracking === void 0 ? void 0 : tracking.length) > 0) {
                const resTracking = yield Promise.all(tracking.map((prog) => __awaiter(this, void 0, void 0, function* () {
                    const res = yield track_entity_1.default.create(Object.assign(Object.assign({}, prog), { projectId: projectCreated.id }));
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
            const trackCreated = yield track_entity_1.default.create(Object.assign(Object.assign({}, trackModel), { projectId: idProject }));
            const response = yield getProjectCompleto(idProject);
            return res.status(201).send(response);
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.addTrack = addTrack;
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
            let projectsResponse = [];
            const projects = yield project_entity_1.default.findAll({ order: '"createdAt" DESC' });
            if (projects.length > 0) {
                const resProm = yield Promise.all(projects.map((project) => __awaiter(this, void 0, void 0, function* () {
                    const response = yield getProjectCompleto(project.id);
                    projectsResponse.push(response);
                })));
                return res.status(201).send({ projects: projectsResponse });
            }
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.getAllProjects = getAllProjects;
function getProjectCompleto(idProject) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const projectFind = yield project_entity_1.default.findOne({
                where: { id: idProject },
                include: [
                    {
                        required: false,
                        model: track_entity_1.default
                    },
                ]
            });
            if (projectFind) {
                const allTracks = yield track_entity_1.default.findAll({
                    where: { id: projectFind.id },
                    order: '"createdAt" DESC'
                });
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
                    observations: projectFind.observations,
                    tracking: projectFind.tracks
                };
                const response = {
                    project: Object.assign({}, proj)
                };
                return response;
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
