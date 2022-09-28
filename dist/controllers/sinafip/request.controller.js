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
exports.deleteOneRequest = exports.getOneRequest = exports.getAllRequest = exports.createRequest = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const sinafip_1 = require("../../models/sinafip");
function createRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let transaction = yield connection_1.default.transaction();
        try {
            const newRequest = yield sinafip_1.request.create(req.body, { transaction });
            transaction.commit();
            return res.status(201).send(newRequest);
        }
        catch (error) {
            transaction.rollback();
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.createRequest = createRequest;
function getAllRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requests = yield sinafip_1.request.findAll();
            if (requests.length > 0) {
                return res.status(200).send(sinafip_1.request);
            }
            else {
                return res.send({ status: 200, data: [] });
            }
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
            const getRequest = yield sinafip_1.request.findOne({ where: {
                    id: req.params.id
                } });
            return res.status(200).send(getRequest);
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.getOneRequest = getOneRequest;
function deleteOneRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getRequest = yield sinafip_1.request.destroy({
                where: {
                    id: req.params.id
                }
            });
            return res.status(200).send({
                message: `request with code ${req.params.id} was deteled successfully`
            });
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.deleteOneRequest = deleteOneRequest;
