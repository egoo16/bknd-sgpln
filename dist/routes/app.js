"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appRouter = (0, express_1.Router)();
appRouter.get("/", (req, res) => {
    res.status(200).json({
        ok: true,
        mensaje: "Bienvenido bro!",
    });
});
exports.default = appRouter;
