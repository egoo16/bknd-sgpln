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
exports.getDataPriorization = exports.createAdmissionQuanty = exports.updateState = exports.getOneRequest = exports.getAllRequest = exports.createRequestSinafip = void 0;
const sinafip_1 = require("../../models/sinafip");
const moment_1 = __importDefault(require("moment"));
const admisionQualification_1 = require("../../models/sinafip/admisionQualification");
const povertyIndex_entity_1 = require("../../models/sinafip/povertyIndex.entity");
const priorizationQualification_1 = require("../../models/sinafip/priorizationQualification");
function createRequestSinafip(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // let transaction = await models.transaction()
        try {
            let allActivities = [];
            let { status, author, institution, investment, studyDescription, delimit, requirementsDocuments, idEntity, hasFinancing } = req.body;
            author = req.user.id;
            status = 'CREADA';
            idEntity = req.user.id_inst;
            hasFinancing = (studyDescription.modalityFinancing == 'NO SE CUENTA CON FUENTE DE FINANCIAMIENTO') ? 0 : 1;
            const created = (0, moment_1.default)().format('L');
            const { totalStimated, activities } = requirementsDocuments.stimatedBudget;
            const requestCreated = yield sinafip_1.requestEntity.create({ status, author, idEntity, created, hasFinancing });
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
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let where = {};
            let filtros = req.query;
            if (filtros) {
                if (filtros.status && filtros.status != 'TODAS') {
                    where.status = filtros.status;
                }
                if (filtros.result) {
                    where.status = filtros.result;
                }
            }
            // TODO: Este es el ID de SEGEPLAN 
            if (((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id_inst) != '16220') {
                where.idEntity = req.user.id_inst;
            }
            console.log(where);
            const requests = yield sinafip_1.requestEntity.findAll({
                where,
                order: '"createdAt" DESC'
            });
            let stimatedBudget = null;
            let requirementsDocuments = null;
            const allRequest = yield Promise.all(requests.map((request) => __awaiter(this, void 0, void 0, function* () {
                const institution = yield sinafip_1.institutionEntity.findOne({ where: { requestId: request.id } });
                const investment = yield sinafip_1.investmentProjectEntity.findOne({ where: { requestId: request.id } });
                const studyDescription = yield sinafip_1.studyDescriptionEntity.findOne({ where: { requestId: request.id } });
                const addmision = yield admisionQualification_1.admissionQuanty.findOne({ where: { requestId: request.id } });
                const priorization = yield priorizationQualification_1.priorizationQuanty.findOne({ where: { requestId: request.id } });
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
                    correlative: request.correlative,
                    idEntity: request.idEntity,
                    hasFinancing: request.hasFinancing,
                    result: request.result,
                    status: request.status,
                    author: request.author,
                    advser: request.advser,
                    reviewd: request.reviewd,
                    created: request.created,
                };
                if (addmision) {
                    if (priorization) {
                        return Object.assign(Object.assign({}, reqStruct), { institution,
                            investment,
                            studyDescription,
                            delimit,
                            requirementsDocuments, admissionQuanty: addmision, priorizationQuanty: priorization });
                    }
                    else {
                        return Object.assign(Object.assign({}, reqStruct), { institution,
                            investment,
                            studyDescription,
                            delimit,
                            requirementsDocuments, admissionQuanty: addmision });
                    }
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
                                getSolicitud.advser = req.user.id;
                            }
                            if (banderaSolicitud == 'denied') {
                                getSolicitud.status = 'RECHAZADA';
                                getSolicitud.advser = req.user.id;
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
                    let admissionObj = req.body.admissionQuanty;
                    console.log("🚀 ~ file: sinafip.controller.ts ~ line 274 ~ createAdmissionQuanty ~ admissionObj.total", admissionObj.total);
                    if (admissionObj.total >= 60) {
                        getSolicitud.result = 'ADMITIDA';
                    }
                    else {
                        getSolicitud.result = 'NO ADMITIDA';
                    }
                    getSolicitud.reviewd = req.user.id;
                    getSolicitud.status = 'CALIFICADA';
                    yield getSolicitud.save();
                    admissionObj.requestId = idSolicitud;
                    const admissionCreated = yield admisionQualification_1.admissionQuanty.create(admissionObj);
                    let priorizationObj = req.body.priorizationMatrix;
                    if (priorizationObj) {
                        priorizationObj.requestId = idSolicitud;
                        const admissionCreated = yield priorizationQualification_1.priorizationQuanty.create(priorizationObj);
                    }
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
function getDataPriorization(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let idSolicitud = req.params.id;
            let projectValues = [{ name: 'AGUA Y SANEAMIENTO', value: 55 },
                { name: 'SALUD Y ASISTENCIA SOCIAL', value: 49 },
                { name: 'EDUCACION', value: 49 },
                { name: 'MEDIO AMBIENTE', value: 46 },
                { name: 'AGROPECUARIO', value: 43 },
                { name: 'VIVIENDA', value: 40 },
                { name: 'TRABAJO Y PREVISION SOCIAL', value: 37 },
                { name: 'ENERGIA', value: 34 },
                { name: 'TRANSPORTE', value: 28 },
                { name: 'SEGURIDAD INTERNA', value: 24 },
                { name: 'DESARROLLO URBANO Y RURAL', value: 21 },
                { name: 'INDUSTRIA Y COMERCIO', value: 21 },
                { name: 'CIENCIA Y TECNOLOGIA', value: 18 },
                { name: 'JUDICIAL', value: 18 },
                { name: 'ADMINISTRACION FISCAL', value: 15 },
                { name: 'TURISMO', value: 15 },
                { name: 'SERVICIOS GENERALES', value: 6 },
                { name: 'CULTURA Y DEPORTES', value: 3 },
                { name: 'FINANCIERAS Y SEGUROS', value: 0 },
            ];
            if (idSolicitud) {
                let getSolicitud = yield getSolicitudCompleta(idSolicitud);
                if (getSolicitud) {
                    let indice = yield getIndiceByMunicipio(getSolicitud.delimit.municipality);
                    let totalvalueIndice = yield verifyIndiceTotal(indice.indice);
                    let indiceProbreza = totalvalueIndice;
                    let valueFunctions;
                    let projectFunction = getSolicitud.institution.functionProjName;
                    if (projectFunction) {
                        let valueProject = projectValues.find((value) => value.name = projectFunction);
                        if (valueProject) {
                            valueFunctions = ((valueProject.value * 20) / 55).toFixed(2);
                            valueFunctions = parseInt(valueFunctions);
                        }
                        else {
                            res.status(500).send({
                                msj: 'No se encontró una funcion de Proyecto valida' + projectFunction
                            });
                        }
                    }
                    let prioritizationMatrix = {
                        indiceProbreza,
                        valueFunctions
                    };
                    res.status(200).json({
                        msg: "Matriz Generada",
                        data: prioritizationMatrix,
                    });
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
exports.getDataPriorization = getDataPriorization;
function getIndiceByMunicipio(municipio) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let mncipio;
            // let query = `DELETE FROM "povertyIndex"`;
            // let resultado;
            // await models.query(query).spread((result: any) => { resultado = result; }).catch((error: any) => {
            // });
            // console.log(resultado)
            municipio = municipio.toLowerCase();
            let municipioFormat = municipio.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());
            let municipios = yield povertyIndex_entity_1.povertyIndex.findAll();
            if ((municipios === null || municipios === void 0 ? void 0 : municipios.length) <= 0) {
                let resMuni = yield Promise.all(indicesProbreza.map((indexMuni) => __awaiter(this, void 0, void 0, function* () {
                    let res = yield povertyIndex_entity_1.povertyIndex.create(indexMuni);
                })));
                mncipio = yield povertyIndex_entity_1.povertyIndex.findOne({
                    where: {
                        name: municipioFormat
                    }
                });
                if (mncipio) {
                    return mncipio;
                }
                else {
                    throw `Error al obtener Indices de Pobreza para : ${municipio}`;
                }
            }
            else {
                mncipio = yield povertyIndex_entity_1.povertyIndex.findOne({
                    where: {
                        name: municipioFormat
                    }
                });
                if (mncipio) {
                    return mncipio;
                }
                else {
                    throw `Error al obtener Indices de Pobreza para : ${municipio}`;
                }
            }
        }
        catch (error) {
            //transaction.rollback()
            throw `Error al obtener Indices de Pobreza: ${error}`;
        }
    });
}
function verifyIndiceTotal(indice) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (indice >= 20) {
                return 20;
            }
            else if (indice >= 10 || indice <= 19.99) {
                return 10;
            }
            else if (indice <= 9.99) {
                return 7;
            }
        }
        catch (error) {
            //transaction.rollback()
            throw `Error al obtener Indices de Pobreza: ${error}`;
        }
    });
}
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
                const priorization = yield priorizationQualification_1.priorizationQuanty.findOne({ where: { requestId: request.id } });
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
                    if (priorization) {
                        response.priorizationQuanty = priorization;
                    }
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
const indicesProbreza = [
    { name: 'El Progreso', indice: 6.11, isMunicipio: false },
    { name: 'Guastatoya', indice: 2.88, isMunicipio: true },
    { name: 'Morazan', indice: 4.62, isMunicipio: true },
    { name: 'San Agustin Acasaguastlan', indice: 12.67, isMunicipio: true },
    { name: 'San Cristobal Acasaguastlan', indice: 6.23, isMunicipio: true },
    { name: 'El Jicaro', indice: 7.60, isMunicipio: true },
    { name: 'Sansare', indice: 15.71, isMunicipio: true },
    { name: 'Sanarate', indice: 6.71, isMunicipio: true },
    { name: 'San Antonio La Paz', indice: 11.22, isMunicipio: true },
    { name: 'Sacatepequez', indice: 11.40, isMunicipio: false },
    { name: 'Antigua Guatemala', indice: 9.27, isMunicipio: true },
    { name: 'Jocotenango', indice: 7.05, isMunicipio: true },
    { name: 'Pastores', indice: 4.64, isMunicipio: true },
    { name: 'Sumpango', indice: 20.91, isMunicipio: true },
    { name: 'Santo Domingo Xenacoj', indice: 21.25, isMunicipio: true },
    { name: 'San Bartolome Milpas Altas', indice: 0.91, isMunicipio: true },
    { name: 'Magdalena Milpas Altas', indice: 13.49, isMunicipio: true },
    { name: 'Santa Maria De Jesus', indice: 21.10, isMunicipio: true },
    { name: 'Ciudad Vieja', indice: 4.65, isMunicipio: true },
    { name: 'Alotenango', indice: 4.05, isMunicipio: true },
    { name: 'Santa Catarina Barahona', indice: 9.78, isMunicipio: true },
    { name: 'Chimaltenango', indice: 16.37, isMunicipio: false },
    { name: 'Chimaltenango', indice: 19.76, isMunicipio: true },
    { name: 'San Jose Poaquil', indice: 13.46, isMunicipio: true },
    { name: 'San Martin Jilotepeque', indice: 17.30, isMunicipio: true },
    { name: 'Comalapa', indice: 7.00, isMunicipio: true },
    { name: 'Santa Apolonia', indice: 27.76, isMunicipio: true },
    { name: 'Tecpan Guatemala', indice: 20.96, isMunicipio: true },
    { name: 'Patzun', indice: 9.61, isMunicipio: true },
    { name: 'Pochuta', indice: 31.06, isMunicipio: true },
    { name: 'Patzicia', indice: 11.58, isMunicipio: true },
    { name: 'Santa Cruz Balanya', indice: 5.71, isMunicipio: true },
    { name: 'Acatenango', indice: 16.59, isMunicipio: true },
    { name: 'Yepocapa', indice: 24.45, isMunicipio: true },
    { name: 'San Andres Itzapa', indice: 20.05, isMunicipio: true },
    { name: 'Parramos', indice: 17.14, isMunicipio: true },
    { name: 'Zaragoza', indice: 11.59, isMunicipio: true },
    { name: 'El Tejar', indice: 21.73, isMunicipio: true },
    { name: 'Escuintla', indice: 3.04, isMunicipio: false },
    { name: 'Escuintla', indice: 5.49, isMunicipio: true },
    { name: 'Santa Lucia Cotzumalguapa', indice: 4.91, isMunicipio: true },
    { name: 'La Democracia', indice: 1.40, isMunicipio: true },
    { name: 'Siquinala', indice: 9.22, isMunicipio: true },
    { name: 'Masagua', indice: 6.48, isMunicipio: true },
    { name: 'Tiquisate', indice: 2.87, isMunicipio: true },
    { name: 'La Gomera', indice: 3.53, isMunicipio: true },
    { name: 'Guanagazapa', indice: 16.17, isMunicipio: true },
    { name: 'San Jose', indice: 1.39, isMunicipio: true },
    { name: 'Iztapa', indice: 2.21, isMunicipio: true },
    { name: 'Palin', indice: 3.06, isMunicipio: true },
    { name: 'San Vicente Pacaya', indice: 2.77, isMunicipio: true },
    { name: 'Nueva Concepcion', indice: 4.95, isMunicipio: true },
    { name: 'Santa Rosa', indice: 14.27, isMunicipio: false },
    { name: 'Cuilapa', indice: 11.05, isMunicipio: true },
    { name: 'Barberena', indice: 6.03, isMunicipio: true },
    { name: 'Santa Rosa De Lima', indice: 8.72, isMunicipio: true },
    { name: 'Casillas', indice: 10.47, isMunicipio: true },
    { name: 'San Rafael Las Flores', indice: 11.08, isMunicipio: true },
    { name: 'Oratorio', indice: 15.97, isMunicipio: true },
    { name: 'San Juan Tecuaco', indice: 19.64, isMunicipio: true },
    { name: 'Chiquimulilla', indice: 15.94, isMunicipio: true },
    { name: 'Taxisco', indice: 13.84, isMunicipio: true },
    { name: 'Santa Maria Ixhuatan', indice: 19.36, isMunicipio: true },
    { name: 'Guazacapan', indice: 10.25, isMunicipio: true },
    { name: 'Santa Cruz Naranjo', indice: 8.12, isMunicipio: true },
    { name: 'Pueblo Nuevo Viñas', indice: 15.41, isMunicipio: true },
    { name: 'Nueva Santa Rosa', indice: 13.17, isMunicipio: true },
    { name: 'Solola', indice: 14.57, isMunicipio: false },
    { name: 'Solola', indice: 17.40, isMunicipio: true },
    { name: 'San Jose Chacaya', indice: 6.30, isMunicipio: true },
    { name: 'Santa Maria Visitacion', indice: 13.45, isMunicipio: true },
    { name: 'Santa Lucia Utatlan', indice: 17.29, isMunicipio: true },
    { name: 'Nahuala', indice: 13.13, isMunicipio: true },
    { name: 'Santa Catarina Ixtahuacan', indice: 12.84, isMunicipio: true },
    { name: 'Santa Clara La Laguna', indice: 7.25, isMunicipio: true },
    { name: 'Concepcion', indice: 8.65, isMunicipio: true },
    { name: 'San Andres Semetabaj', indice: 19.17, isMunicipio: true },
    { name: 'Panajachel', indice: 11.15, isMunicipio: true },
    { name: 'Santa Catarina Palopo', indice: 28.17, isMunicipio: true },
    { name: 'San Antonio Palopo', indice: 14.72, isMunicipio: true },
    { name: 'San Lucas Toliman', indice: 29.42, isMunicipio: true },
    { name: 'Santa Cruz La Laguna', indice: 30.78, isMunicipio: true },
    { name: 'San Juan La Laguna', indice: 9.72, isMunicipio: true },
    { name: 'San Pedro La Laguna', indice: 8.22, isMunicipio: true },
    { name: 'Santiago Atitlan', indice: 43.74, isMunicipio: true },
    { name: 'Totonicapan', indice: 24.50, isMunicipio: false },
    { name: 'Totonicapan', indice: 22.58, isMunicipio: true },
    { name: 'San Cristobal Totonicapan', indice: 18.89, isMunicipio: true },
    { name: 'San Francisco El Alto', indice: 20.21, isMunicipio: true },
    { name: 'San Andres Xecul', indice: 22.16, isMunicipio: true },
    { name: 'Momostenango', indice: 46.97, isMunicipio: true },
    { name: 'Santa Maria Chiquimula', indice: 30.91, isMunicipio: true },
    { name: 'Santa Lucia La Reforma', indice: 70.13, isMunicipio: true },
    { name: 'San Bartolo Aguas Calientes', indice: 35.79, isMunicipio: true },
    { name: 'Quetzaltenango', indice: 17.31, isMunicipio: false },
    { name: 'Quetzaltenango', indice: 15.73, isMunicipio: true },
    { name: 'San Carlos Sija', indice: 13.10, isMunicipio: true },
    { name: 'Cabrican', indice: 15.57, isMunicipio: true },
    { name: 'Cajola', indice: 54.75, isMunicipio: true },
    { name: 'San Miguel Siguila', indice: 39.26, isMunicipio: true },
    { name: 'Ostuncalco', indice: 39.47, isMunicipio: true },
    { name: 'Concepcion Chiquirichapa', indice: 11.43, isMunicipio: true },
    { name: 'San Martin Sacatepequez', indice: 21.05, isMunicipio: true },
    { name: 'Cantel', indice: 22.70, isMunicipio: true },
    { name: 'Huitan', indice: 16.52, isMunicipio: true },
    { name: 'Colomba', indice: 13.32, isMunicipio: true },
    { name: 'San Francisco La Union', indice: 26.62, isMunicipio: true },
    { name: 'El Palmar', indice: 8.95, isMunicipio: true },
    { name: 'Coatepeque', indice: 15.71, isMunicipio: true },
    { name: 'Genova', indice: 25.72, isMunicipio: true },
    { name: 'Flores Costa Cuca', indice: 9.33, isMunicipio: true },
    { name: 'Palestina De Los Altos', indice: 22.72, isMunicipio: true },
    { name: 'Suchitepequez', indice: 29.53, isMunicipio: false },
    { name: 'Mazatenango', indice: 35.20, isMunicipio: true },
    { name: 'Cuyotenango', indice: 23.76, isMunicipio: true },
    { name: 'San Francisco Zapotitlan', indice: 18.66, isMunicipio: true },
    { name: 'San Bernardino', indice: 5.46, isMunicipio: true },
    { name: 'San Jose El Idolo', indice: 23.16, isMunicipio: true },
    { name: 'Santo Domingo Suchitepequez', indice: 16.08, isMunicipio: true },
    { name: 'San Lorenzo', indice: 50.52, isMunicipio: true },
    { name: 'Samayac', indice: 17.12, isMunicipio: true },
    { name: 'San Pablo Jocopilas', indice: 10.08, isMunicipio: true },
    { name: 'San Antonio Suchitepequez', indice: 11.32, isMunicipio: true },
    { name: 'San Miguel Panan', indice: 11.58, isMunicipio: true },
    { name: 'San Gabriel', indice: 36.50, isMunicipio: true },
    { name: 'Chicacao', indice: 76.60, isMunicipio: true },
    { name: 'Patulul', indice: 33.18, isMunicipio: true },
    { name: 'Santa Barbara', indice: 37.54, isMunicipio: true },
    { name: 'San Juan Bautista', indice: 20.11, isMunicipio: true },
    { name: 'Santo Tomas La Union', indice: 26.89, isMunicipio: true },
    { name: 'Zunilito', indice: 12.97, isMunicipio: true },
    { name: 'Pueblo Nuevo', indice: 52.53, isMunicipio: true },
    { name: 'Rio Bravo', indice: 37.57, isMunicipio: true },
    { name: 'Retalhuleu', indice: 15.04, isMunicipio: false },
    { name: 'Retalhuleu', indice: 13.90, isMunicipio: true },
    { name: 'Santa Cruz Mulua', indice: 10.72, isMunicipio: true },
    { name: 'San Andres Villa Seca', indice: 6.58, isMunicipio: true },
    { name: 'Champerico', indice: 13.61, isMunicipio: true },
    { name: 'Nuevo San Carlos', indice: 17.44, isMunicipio: true },
    { name: 'El Asintal', indice: 24.61, isMunicipio: true },
    { name: 'San Marcos', indice: 18.73, isMunicipio: false },
    { name: 'San Marcos', indice: 2.36, isMunicipio: true },
    { name: 'San Pedro Sacatepequez', indice: 3.85, isMunicipio: true },
    { name: 'San Antonio Sacatepequez', indice: 4.23, isMunicipio: true },
    { name: 'Comitancillo', indice: 26.62, isMunicipio: true },
    { name: 'San Miguel Ixtahuacan', indice: 27.87, isMunicipio: true },
    { name: 'Concepcion Tutuapa', indice: 37.42, isMunicipio: true },
    { name: 'Tacana', indice: 37.85, isMunicipio: true },
    { name: 'Sibinal', indice: 46.91, isMunicipio: true },
    { name: 'Tajumulco', indice: 21.43, isMunicipio: true },
    { name: 'Tejutla', indice: 40.98, isMunicipio: true },
    { name: 'San Rafael Pie De La Cuesta', indice: 9.37, isMunicipio: true },
    { name: 'Nuevo Progreso', indice: 24.05, isMunicipio: true },
    { name: 'El Tumbador', indice: 14.34, isMunicipio: true },
    { name: 'El Rodeo', indice: 30.26, isMunicipio: true },
    { name: 'Malacatan', indice: 18.42, isMunicipio: true },
    { name: 'Catarina', indice: 15.54, isMunicipio: true },
    { name: 'Ayutla', indice: 1.40, isMunicipio: true },
    { name: 'Ocos', indice: 10.44, isMunicipio: true },
    { name: 'San Pablo', indice: 14.37, isMunicipio: true },
    { name: 'El Quetzal', indice: 27.11, isMunicipio: true },
    { name: 'La Reforma', indice: 30.85, isMunicipio: true },
    { name: 'Pajapita', indice: 22.67, isMunicipio: true },
    { name: 'Ixchiguan', indice: 27.57, isMunicipio: true },
    { name: 'San Jose Ojetenam', indice: 53.85, isMunicipio: true },
    { name: 'San Cristobal Cucho', indice: 16.89, isMunicipio: true },
    { name: 'Sipacapa', indice: 36.74, isMunicipio: true },
    { name: 'Esquipulas Palo Gordo', indice: 11.56, isMunicipio: true },
    { name: 'Rio Blanco', indice: 7.08, isMunicipio: true },
    { name: 'San Lorenzo', indice: 33.81, isMunicipio: true },
    { name: 'Huehuetenango', indice: 11.27, isMunicipio: false },
    { name: 'Huehuetenango', indice: 1.69, isMunicipio: true },
    { name: 'Chiantla', indice: 8.99, isMunicipio: true },
    { name: 'Malacatancito', indice: 9.15, isMunicipio: true },
    { name: 'Cuilco', indice: 16.79, isMunicipio: true },
    { name: 'Nenton', indice: 17.86, isMunicipio: true },
    { name: 'San Pedro Necta', indice: 10.17, isMunicipio: true },
    { name: 'Jacaltenango', indice: 8.52, isMunicipio: true },
    { name: 'Soloma', indice: 9.91, isMunicipio: true },
    { name: 'San Ildefonso Ixtahuacan', indice: 23.04, isMunicipio: true },
    { name: 'Santa Barbara', indice: 15.89, isMunicipio: true },
    { name: 'La Libertad', indice: 14.28, isMunicipio: true },
    { name: 'La Democracia', indice: 15.00, isMunicipio: true },
    { name: 'San Miguel Acatan', indice: 22.47, isMunicipio: true },
    { name: 'San Rafael La Independencia', indice: 31.16, isMunicipio: true },
    { name: 'Todos Santos Cuchumatan', indice: 6.54, isMunicipio: true },
    { name: 'San Juan Atitan', indice: 8.34, isMunicipio: true },
    { name: 'Santa Eulalia', indice: 7.77, isMunicipio: true },
    { name: 'San Mateo Ixtatan', indice: 9.72, isMunicipio: true },
    { name: 'Colotenango', indice: 16.78, isMunicipio: true },
    { name: 'San Sebastian Huehuetenango', indice: 8.99, isMunicipio: true },
    { name: 'Tectitan', indice: 12.40, isMunicipio: true },
    { name: 'Concepcion Huista', indice: 16.66, isMunicipio: true },
    { name: 'San Juan Ixcoy', indice: 18.92, isMunicipio: true },
    { name: 'San Antonio Huista', indice: 13.86, isMunicipio: true },
    { name: 'San Sebastian Coatan', indice: 6.41, isMunicipio: true },
    { name: 'Barillas', indice: 5.76, isMunicipio: true },
    { name: 'Aguacatan', indice: 2.43, isMunicipio: true },
    { name: 'San Rafael Petzal', indice: 2.88, isMunicipio: true },
    { name: 'San Gaspar Ixchil', indice: 33.06, isMunicipio: true },
    { name: 'Santiago Chimaltenango', indice: 18.94, isMunicipio: true },
    { name: 'Santa Ana Huista', indice: 9.93, isMunicipio: true },
    { name: 'Union Cantinil', indice: 15.92, isMunicipio: true },
    { name: 'Quiche', indice: 20.15, isMunicipio: false },
    { name: 'Santa Cruz Del Quiche', indice: 15.49, isMunicipio: true },
    { name: 'Chiche', indice: 10.73, isMunicipio: true },
    { name: 'Chinique', indice: 31.93, isMunicipio: true },
    { name: 'Zacualpa', indice: 23.44, isMunicipio: true },
    { name: 'Chajul', indice: 26.78, isMunicipio: true },
    { name: 'Chichicastenango', indice: 28.44, isMunicipio: true },
    { name: 'Patzite', indice: 26.52, isMunicipio: true },
    { name: 'San Antonio Ilotenango', indice: 9.94, isMunicipio: true },
    { name: 'San Pedro Jocopilas', indice: 9.60, isMunicipio: true },
    { name: 'Cunen', indice: 9.18, isMunicipio: true },
    { name: 'San Juan Cotzal', indice: 67.34, isMunicipio: true },
    { name: 'Joyabaj', indice: 32.16, isMunicipio: true },
    { name: 'Nebaj', indice: 12.11, isMunicipio: true },
    { name: 'San Andres Sajcabaja', indice: 21.41, isMunicipio: true },
    { name: 'Uspantan', indice: 19.29, isMunicipio: true },
    { name: 'Sacapulas', indice: 22.71, isMunicipio: true },
    { name: 'San Bartolome Jocotenango', indice: 55.86, isMunicipio: true },
    { name: 'Canilla', indice: 17.76, isMunicipio: true },
    { name: 'Chicaman', indice: 21.49, isMunicipio: true },
    { name: 'Ixcan', indice: 16.85, isMunicipio: true },
    { name: 'Pachalum', indice: 55.40, isMunicipio: true },
    { name: 'Baja Verapaz', indice: 27.30, isMunicipio: false },
    { name: 'Salama', indice: 16.82, isMunicipio: true },
    { name: 'San Miguel Chicaj', indice: 25.36, isMunicipio: true },
    { name: 'Rabinal', indice: 17.27, isMunicipio: true },
    { name: 'Cubulco', indice: 16.78, isMunicipio: true },
    { name: 'Granados', indice: 16.78, isMunicipio: true },
    { name: 'El Chol', indice: 6.54, isMunicipio: true },
    { name: 'San Jeronimo', indice: 16.10, isMunicipio: true },
    { name: 'Purulha', indice: 71.34, isMunicipio: true },
    { name: 'Alta Verapaz', indice: 46.65, isMunicipio: false },
    { name: 'Coban', indice: 25.52, isMunicipio: true },
    { name: 'Santa Cruz Verapaz', indice: 37.13, isMunicipio: true },
    { name: 'San Cristobal Verapaz', indice: 53.59, isMunicipio: true },
    { name: 'Tactic', indice: 10.07, isMunicipio: true },
    { name: 'Tamahu', indice: 50.31, isMunicipio: true },
    { name: 'Tucuru', indice: 65.09, isMunicipio: true },
    { name: 'Panzos', indice: 75.75, isMunicipio: true },
    { name: 'Senahu', indice: 27.95, isMunicipio: true },
    { name: 'San Pedro Carcha', indice: 45.59, isMunicipio: true },
    { name: 'San Juan Chamelco', indice: 3.08, isMunicipio: true },
    { name: 'Lanquin', indice: 28.75, isMunicipio: true },
    { name: 'Cahabon', indice: 26.28, isMunicipio: true },
    { name: 'Chisec', indice: 65.45, isMunicipio: true },
    { name: 'Chahal', indice: 11.99, isMunicipio: true },
    { name: 'Fray Bartolome De Las Casas', indice: 39.81, isMunicipio: true },
    { name: 'Santa Catalina La Tinta', indice: 61.24, isMunicipio: true },
    { name: 'Raxruha', indice: 36.68, isMunicipio: true },
    { name: 'Peten', indice: 19.79, isMunicipio: false },
    { name: 'Flores', indice: 11.16, isMunicipio: true },
    { name: 'San Jose', indice: 31.95, isMunicipio: true },
    { name: 'San Benito', indice: 16.21, isMunicipio: true },
    { name: 'San Andres', indice: 19.82, isMunicipio: true },
    { name: 'La Libertad', indice: 13.72, isMunicipio: true },
    { name: 'San Francisco', indice: 17.44, isMunicipio: true },
    { name: 'Santa Ana', indice: 12.46, isMunicipio: true },
    { name: 'Dolores', indice: 13.07, isMunicipio: true },
    { name: 'San Luis', indice: 45.04, isMunicipio: true },
    { name: 'Sayaxche', indice: 29.36, isMunicipio: true },
    { name: 'Melchor De Mencos', indice: 11.51, isMunicipio: true },
    { name: 'Poptun', indice: 12.49, isMunicipio: true },
    { name: 'Izabal', indice: 28.90, isMunicipio: false },
    { name: 'Puerto Barrios', indice: 9.22, isMunicipio: true },
    { name: 'Livingston', indice: 53.87, isMunicipio: true },
    { name: 'El Estor', indice: 19.68, isMunicipio: true },
    { name: 'Morales', indice: 22.14, isMunicipio: true },
    { name: 'Los Amates', indice: 30.02, isMunicipio: true },
    { name: 'Zacapa', indice: 36.72, isMunicipio: false },
    { name: 'Zacapa', indice: 37.06, isMunicipio: true },
    { name: 'Estanzuela', indice: 17.57, isMunicipio: true },
    { name: 'Rio Hondo', indice: 12.37, isMunicipio: true },
    { name: 'Gualan', indice: 43.13, isMunicipio: true },
    { name: 'Teculutan', indice: 10.89, isMunicipio: true },
    { name: 'Usumatlan', indice: 10.78, isMunicipio: true },
    { name: 'Cabañas', indice: 16.33, isMunicipio: true },
    { name: 'San Diego', indice: 20.41, isMunicipio: true },
    { name: 'La Union', indice: 66.23, isMunicipio: true },
    { name: 'Huite', indice: 15.98, isMunicipio: true },
    { name: 'Chiquimula', indice: 37.00, isMunicipio: false },
    { name: 'Chiquimula', indice: 34.88, isMunicipio: true },
    { name: 'San Jose La Arada', indice: 18.88, isMunicipio: true },
    { name: 'San Juan Ermita', indice: 39.64, isMunicipio: true },
    { name: 'Jocotan', indice: 59.84, isMunicipio: true },
    { name: 'Camotan', indice: 41.38, isMunicipio: true },
    { name: 'Olopa', indice: 39.58, isMunicipio: true },
    { name: 'Esquipulas', indice: 39.44, isMunicipio: true },
    { name: 'Concepcion Las Minas', indice: 8.63, isMunicipio: true },
    { name: 'Quezaltepeque', indice: 27.82, isMunicipio: true },
    { name: 'San Jacinto', indice: 31.62, isMunicipio: true },
    { name: 'Ipala', indice: 8.37, isMunicipio: true },
    { name: 'Jalapa', indice: 22.75, isMunicipio: false },
    { name: 'Jalapa', indice: 36.28, isMunicipio: true },
    { name: 'San Pedro Pinula', indice: 31.54, isMunicipio: true },
    { name: 'San Luis Jilotepeque', indice: 24.40, isMunicipio: true },
    { name: 'San Manuel Chaparron', indice: 8.50, isMunicipio: true },
    { name: 'San Carlos Alzatate', indice: 33.66, isMunicipio: true },
    { name: 'Monjas', indice: 18.93, isMunicipio: true },
    { name: 'Mataquescuintla', indice: 10.99, isMunicipio: true },
    { name: 'Jutiapa', indice: 16.27, isMunicipio: false },
    { name: 'Jutiapa', indice: 5.74, isMunicipio: true },
    { name: 'El Progreso', indice: 8.92, isMunicipio: true },
    { name: 'Santa Catarina Mita', indice: 6.29, isMunicipio: true },
    { name: 'Agua Blanca', indice: 10.35, isMunicipio: true },
    { name: 'Asuncion Mita', indice: 13.03, isMunicipio: true },
    { name: 'Yupiltepeque', indice: 10.44, isMunicipio: true },
    { name: 'Atescatempa', indice: 10.10, isMunicipio: true },
    { name: 'Jerez', indice: 7.45, isMunicipio: true },
    { name: 'El Adelanto', indice: 9.58, isMunicipio: true },
    { name: 'Zapotitlan', indice: 27.46, isMunicipio: true },
    { name: 'Comapa', indice: 28.18, isMunicipio: true },
    { name: 'Jalpatagua', indice: 27.01, isMunicipio: true },
    { name: 'Conguaco', indice: 57.04, isMunicipio: true },
    { name: 'Moyuta', indice: 53.92, isMunicipio: true },
    { name: 'Pasaco', indice: 73.11, isMunicipio: true },
    { name: 'San Jose Acatempa', indice: 1.47, isMunicipio: true },
    { name: 'Quezada', indice: 5.37, isMunicipio: true }
];
