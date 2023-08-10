import { Router } from 'express'
import { queryToSend } from '../../controllers/report/report.controller';


const privateRouter = Router();


privateRouter.post('/query', queryToSend)

export default privateRouter