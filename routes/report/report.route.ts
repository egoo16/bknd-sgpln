import { Router } from 'express'
import { getIdeasFitered } from '../../controllers/report/report.controller';


const reportRouter = Router();


reportRouter.get('/ideas-general', getIdeasFitered)

export default reportRouter