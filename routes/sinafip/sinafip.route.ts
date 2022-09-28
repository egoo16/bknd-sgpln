import { Router } from 'express'
import { getAllEntities } from '../../controllers/sinafip/list.controller';
import { createRequest,deleteOneRequest,getAllRequest, getOneRequest } from '../../controllers/sinafip/request.controller';


const sinafipRouter = Router();

// Listados
sinafipRouter.get('/entities',getAllEntities)


sinafipRouter.post('/request/create',createRequest)
sinafipRouter.get('/request/get-all',getAllRequest)
sinafipRouter.get('/request/:id',getOneRequest)
sinafipRouter.delete('/request/delete/:id',deleteOneRequest)

export default sinafipRouter