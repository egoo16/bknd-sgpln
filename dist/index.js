"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const router_1 = __importDefault(require("./routes/router"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
// Inicializando Morgan
const server = new server_1.default();
// BodyParser Configuración
server.app.use(express_1.default.urlencoded({ extended: true }));
server.app.use(express_1.default.json());
server.app.use((0, morgan_1.default)("tiny"));
server.app.use((0, cors_1.default)({ origin: true, credentials: true }));
server.app.use(express_1.default.static("public"));
server.app.use("/", router_1.default);
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
