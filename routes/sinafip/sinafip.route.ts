import { Router } from 'express'
import { createRequestSinafip ,getAllRequest,getOneRequest} from '../../controllers/sinafip/sinafip.controller';


const sinafipRouter = Router();

sinafipRouter.post('/request/new',createRequestSinafip)
sinafipRouter.get('/request/get-all',getAllRequest)
sinafipRouter.get('/request/:id',getOneRequest)


export default sinafipRouter