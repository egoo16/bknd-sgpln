import { Router } from 'express'
import { getAllEntities, getAllgeneralStudies, getAllmodalityFinancing, getAllpreinvDocument, getAllProjectFunction } from '../../controllers/sinafip/list.controller';
import {  getAllRequest, getOneRequest, createRequestSinafip } from '../../controllers/sinafip/sinafip.controller';


const sinafipRouter = Router();

// Listados
sinafipRouter.get('/entities', getAllEntities)
sinafipRouter.get('/project-function', getAllProjectFunction)
sinafipRouter.get('/general-studies', getAllgeneralStudies)
sinafipRouter.get('/preinv-document', getAllpreinvDocument)
sinafipRouter.get('/modality-financing', getAllmodalityFinancing)


sinafipRouter.post('/request/new',createRequestSinafip)
sinafipRouter.get('/request/get-all', getAllRequest)
sinafipRouter.get('/request/:id', getOneRequest)
// sinafipRouter.post('/request/create', createRequest)
// sinafipRouter.delete('/request/delete/:id', deleteOneRequest)



export default sinafipRouter