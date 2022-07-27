import Server from "./classes/server";
import router from "./routes/router";
import express from "express";
import cors from "cors";
import morgan from "morgan";

// Inicializando Morgan

const server = new Server();

// BodyParser Configuración
server.app.use(express.urlencoded({ extended: true }));
server.app.use(express.json());

server.app.use(morgan("tiny"));

server.app.use(cors({ origin: true, credentials: true }));

server.app.use("/", router);

server.start(() => {
  console.log(`Servidor corriendo en el puerto ${server.port}`);
});
