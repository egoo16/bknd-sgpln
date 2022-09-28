"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const READ_FILE_ROUTER = (0, express_1.Router)();
READ_FILE_ROUTER.get('/:type/:file', (req, res) => {
    const type = req.params.type;
    const file = req.params.file;
    const path = `./uploads/${type}/${file}`;
    fs_1.default.stat(path, (err, stats) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error when searching for file',
                errors: err
            });
        }
        if (!stats) {
            return res.status(400).json({
                ok: false,
                mensaje: 'File does not exist',
                errors: {
                    message: 'File does not exist, has been deleted or has changed location'
                }
            });
        }
        res.sendfile(path);
    });
});
exports.default = READ_FILE_ROUTER;
//# sourceMappingURL=readFile.js.map