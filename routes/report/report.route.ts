import { Router } from 'express'
import { getIdeasFitered, getRegisterSinafip } from '../../controllers/report/report.controller';


const reportRouter = Router();


reportRouter.get('/ideas-general', getIdeasFitered)
reportRouter.get('/register-studies', getRegisterSinafip)

export default reportRouter