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
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("../db/connection"));
const environment_1 = require("../global/environment");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = environment_1.SERVER_PORT;
        this.dbConnection();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate().then(() => {
                    // await db.sync({ force: true }).then(() => {
                    // await db.sync().then(() => {
                    console.log("Database online");
                });
                // await admisionConfig.sync({ force: true });
                // await relevanceInvestment.sync({ force: true });
                // await relevanceBeneficiaries.sync({ force: true });
                // await relevanceComplexy.sync({ force: true });
                // await relevanceStage.sync({ force: true });
                // await advisedEntity.sync({ force: true });
                // await subSectorization.sync({ force: true });
                // await institutionEntity.sync({ force: true });
                // await documentFinance.sync({ force: true });
                // await visitCard.sync({force: true})
                // await requestEntity.sync({force: true});
            }
            catch (error) {
                throw new Error("Error de conexion: " + error);
            }
        });
    }
    start(callback) {
        this.app.listen(this.port, callback);
    }
}
exports.default = Server;
