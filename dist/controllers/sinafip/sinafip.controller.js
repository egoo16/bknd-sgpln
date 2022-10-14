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
exports.createAdmissionQuanty = exports.updateState = exports.getOneRequest = exports.getAllRequest = exports.createRequestSinafip = void 0;
const sinafip_1 = require("../../models/sinafip");
const moment_1 = __importDefault(require("moment"));
const admisionQualification_1 = require("../../models/sinafip/admisionQualification");
function createRequestSinafip(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // let transaction = await models.transaction()
        try {
            let allActivities = [];
            let { status, author, institution, investment, studyDescription, delimit, requirementsDocuments } = req.body;
            status = 'CREADA';
            const created = (0, moment_1.default)().format('L');
            const { totalStimated, activities } = requirementsDocuments.stimatedBudget;
            const requestCreated = yield sinafip_1.requestEntity.create({ status, author, created });
            const institutionCreated = yield sinafip_1.institutionEntity.create(Object.assign(Object.assign({}, institution), { requestId: requestCreated.id }));
            const investmentCreated = yield sinafip_1.investmentProjectEntity.create(Object.assign(Object.assign({}, investment), { requestId: requestCreated.id }));
            const studyDescriptionCreated = yield sinafip_1.studyDescriptionEntity.create(Object.assign(Object.assign({}, studyDescription), { requestId: requestCreated.id }));
            const delimitCreated = yield sinafip_1.delimitEntity.create(Object.assign(Object.assign({}, delimit), { requestId: requestCreated.id }));
            const requiredDocumentCreated = yield sinafip_1.requiredDocumentEntity.create({ requestId: requestCreated.id });
            const stimatedBugdetCreated = yield sinafip_1.stimatedBudgetEntity.create({ totalStimated, docId: requiredDocumentCreated.id });
            if ((activities === null || activities === void 0 ? void 0 : activities.length) > 0) {
                const allData = yield Promise.all(activities.map((activity) => __awaiter(this, void 0, void 0, function* () {
                    const res = yield sinafip_1.activitiesEntity.create(Object.assign(Object.assign({}, activity), { stimatedId: stimatedBugdetCreated.id }));
                    return res;
                })));
                allActivities = [...allData];
            }
            let reqStruct = {
                id: requestCreated.id,
                result: requestCreated.result,
                status: requestCreated.status,
                author: requestCreated.author,
                advser: requestCreated.advser,
                reviewd: requestCreated.reviewd,
                created: requestCreated.created,
            };
            const response = {
                request: Object.assign(Object.assign({}, reqStruct), { institution: institutionCreated, investment: investmentCreated, studyDescription: studyDescriptionCreated, delimit: delimitCreated, requirementsDocuments: {
                        id: requiredDocumentCreated.id,
                        stimatedBudget: {
                            id: stimatedBugdetCreated.id,
                            totalStimated: stimatedBugdetCreated.totalStimated,
                            activities: allActivities
                        }
                    } }),
            };
            // transaction.commit()
            return res.status(201).send(response);
        }
        catch (error) {
            //transaction.rollback()
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.createRequestSinafip = createRequestSinafip;
function getAllRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requests = yield sinafip_1.requestEntity.findAll();
            let stimatedBudget = null;
            let requirementsDocuments = null;
            const allRequest = yield Promise.all(requests.map((request) => __awaiter(this, void 0, void 0, function* () {
                const institution = yield sinafip_1.institutionEntity.findOne({ where: { requestId: request.id } });
                const investment = yield sinafip_1.investmentProjectEntity.findOne({ where: { requestId: request.id } });
                const studyDescription = yield sinafip_1.studyDescriptionEntity.findOne({ where: { requestId: request.id } });
                const addmision = yield admisionQualification_1.admissionQuanty.findOne({ where: { requestId: request.id } });
                const delimit = yield sinafip_1.delimitEntity.findOne({ where: { requestId: request.id } });
                const requirementsDocumentsGet = yield sinafip_1.requiredDocumentEntity.findOne({ where: { requestId: request.id } });
                if (requirementsDocumentsGet) {
                    const stimatedBudgetGet = yield sinafip_1.stimatedBudgetEntity.findOne({ where: { docId: requirementsDocumentsGet.id }, });
                    const getActivities = yield sinafip_1.activitiesEntity.findAll({ where: { stimatedId: stimatedBudgetGet.id } });
                    let stimatedBudget = {
                        id: stimatedBudgetGet.id,
                        totalStimated: stimatedBudgetGet.totalStimated,
                        docId: stimatedBudgetGet.docId,
                        activities: getActivities
                    };
                    requirementsDocuments = {
                        id: requirementsDocumentsGet.id,
                        tdr: requirementsDocumentsGet.tdr,
                        scheduleActiv: requirementsDocumentsGet.scheduleActiv,
                        requestId: requirementsDocumentsGet.requestId,
                        stimatedBudget
                    };
                }
                let reqStruct = {
                    id: request.id,
                    result: request.result,
                    status: request.status,
                    author: request.author,
                    advser: request.advser,
                    reviewd: request.reviewd,
                    created: request.created,
                };
                if (addmision) {
                    return Object.assign(Object.assign({}, reqStruct), { institution,
                        investment,
                        studyDescription,
                        delimit,
                        requirementsDocuments, admissionQuanty: addmision });
                }
                else {
                    return Object.assign(Object.assign({}, reqStruct), { institution,
                        investment,
                        studyDescription,
                        delimit,
                        requirementsDocuments });
                }
            })));
            const finalAllRequest = allRequest.sort((a, b) => a.created - b.created);
            return res.status(201).send({
                msg: 'Datos Obtenidos',
                data: finalAllRequest
            });
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.getAllRequest = getAllRequest;
function getOneRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (id) {
                const response = yield getSolicitudCompleta(id);
                return res.status(201).send(response);
            }
            else {
                res.status(500).send({
                    msj: 'No se encontro la solicitud con ID: ' + id
                });
            }
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.getOneRequest = getOneRequest;
function updateState(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let statusOptions = ['reception', 'analysis', 'denied'];
            let idSolicitud = req.params.id;
            let banderaSolicitud = req.params.status;
            if (idSolicitud) {
                let getSolicitud = yield sinafip_1.requestEntity.findOne({
                    where: {
                        id: idSolicitud
                    }
                });
                if (getSolicitud) {
                    if (banderaSolicitud) {
                        let statusFount = statusOptions.find((e) => banderaSolicitud == e);
                        if (statusFount) {
                            if (banderaSolicitud == 'reception') {
                                getSolicitud.status = 'EN RECEPCIÓN';
                            }
                            if (banderaSolicitud == 'analysis') {
                                getSolicitud.status = 'EN ANÁLISIS';
                            }
                            if (banderaSolicitud == 'denied') {
                                getSolicitud.status = 'RECHAZADA';
                            }
                            yield getSolicitud.save();
                            let solicitud = yield getSolicitudCompleta(getSolicitud.id);
                            res.status(200).send({
                                solicitud
                            });
                        }
                        else {
                            res.status(404).send({
                                msj: 'El estado que se envío no pertenece a las opciones validas: ' + banderaSolicitud
                            });
                        }
                    }
                }
                else {
                    res.status(500).send({
                        msj: 'No se encontro la solicitud con ID: ' + idSolicitud
                    });
                }
            }
            else {
                res.status(400).send({
                    msj: 'Es necesario enviar un ID'
                });
            }
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.updateState = updateState;
function createAdmissionQuanty(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let idSolicitud = req.params.id;
            if (idSolicitud) {
                let getSolicitud = yield sinafip_1.requestEntity.findOne({
                    where: {
                        id: idSolicitud
                    }
                });
                if (getSolicitud) {
                    let admissionObj = req.body;
                    admissionObj.requestId = idSolicitud;
                    const admissionCreated = yield admisionQualification_1.admissionQuanty.create(admissionObj);
                    const response = yield getSolicitudCompleta(idSolicitud);
                    return res.status(201).send(response);
                }
                else {
                    res.status(500).send({
                        msj: 'No se encontro la solicitud con ID: ' + idSolicitud
                    });
                }
            }
            else {
                res.status(400).send({
                    msj: 'Es necesario enviar un ID'
                });
            }
            // transaction.commit()
            // return res.status(201).send(response)
        }
        catch (error) {
            //transaction.rollback()
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.createAdmissionQuanty = createAdmissionQuanty;
function getSolicitudCompleta(idSolicitud) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const request = yield sinafip_1.requestEntity.findOne({ where: { id: idSolicitud } });
            if (request) {
                const institution = yield sinafip_1.institutionEntity.findOne({ where: { requestId: request.id } });
                const investment = yield sinafip_1.investmentProjectEntity.findOne({ where: { requestId: request.id } });
                const studyDescription = yield sinafip_1.studyDescriptionEntity.findOne({ where: { requestId: request.id } });
                const delimit = yield sinafip_1.delimitEntity.findOne({ where: { requestId: request.id } });
                const requiredDoc = yield sinafip_1.requiredDocumentEntity.findOne({ where: { requestId: request.id } });
                const addmision = yield admisionQualification_1.admissionQuanty.findOne({ where: { requestId: request.id } });
                const stimated = yield sinafip_1.stimatedBudgetEntity.findOne({ where: { docId: requiredDoc.id } });
                const activ = yield sinafip_1.activitiesEntity.findAll({ where: { stimatedId: stimated.id } });
                let reqStruct = {
                    id: request.id,
                    result: request.result,
                    status: request.status,
                    author: request.author,
                    advser: request.advser,
                    reviewd: request.reviewd,
                    created: request.created,
                };
                const response = Object.assign(Object.assign({}, reqStruct), { institution,
                    investment,
                    studyDescription,
                    delimit, requiredDocuments: {
                        id: requiredDoc.id,
                        tdr: requiredDoc.tdr,
                        scheduleActiv: requiredDoc.scheduleActiv,
                        stimatedBudget: {
                            id: stimated.id,
                            totalStimated: stimated.totalStimated,
                            activities: activ
                        }
                    } });
                if (addmision) {
                    response.admissionQuanty = addmision;
                }
                return response;
            }
            else {
                throw `Solicitud no encontrada`;
            }
        }
        catch (error) {
            throw `Error al obtener solicitud: ${error}`;
        }
    });
}
