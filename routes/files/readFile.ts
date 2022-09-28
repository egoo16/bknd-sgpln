import { Router, Request, Response } from 'express';
import fs from 'fs';

const READ_FILE_ROUTER = Router();

READ_FILE_ROUTER.get('/:type/:file', (req: Request, res: Response) => {
    const type = req.params.type;
    const file = req.params.file;

    const path = `./uploads/${type}/${file}`;

    fs.stat(path, (err, stats) => {

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

export default READ_FILE_ROUTER;
