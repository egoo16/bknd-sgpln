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
exports.createProject = void 0;
const project_entity_1 = __importDefault(require("../../models/seguimiento/project.entity"));
function createProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const projectModel = req.body;
            let allTracks = [];
            const projectCreated = yield project_entity_1.default.create(Object.assign({}, projectModel));
            // const tracking = req.body.tracking;
            // if (tracking?.length > 0) {
            //     // const resTracking = await Promise.all(tracking.map(async (prog: any) => {
            //     //     const res = await track.create({...prog, projectId: projectCreated.id});
            //     //     return res;
            //     // }));
            //     // allTracks = [...resTracking]
            //     // const response = {
            //     //     project: {
            //     //         ...projectCreated,
            //     //         tracking: allTracks
            //     //     }
            //     // }
            //     // return res.status(201).send(response)
            // } else {
            console.log('Passed');
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
            const response = {
                project: Object.assign(Object.assign({}, proj), { tracking: allTracks })
            };
            return res.status(201).send(response);
            // }
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.createProject = createProject;
