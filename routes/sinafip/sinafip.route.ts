import { Router } from 'express'
import { getAllEntities, getAllgeneralStudies, getAllmodalityFinancing, getAllpreinvDocument, getAllProjectFunction } from '../../controllers/sinafip/list.controller';
import { getAllRequest, getOneRequest, createRequestSinafip, updateState, createAdmissionQuanty, getDataPriorization } from '../../controllers/sinafip/sinafip.controller';
import { verificaToken } from '../../middlewares/authentication';


const sinafipRouter = Router();

// Listados
sinafipRouter.get('/entities', getAllEntities)
sinafipRouter.get('/project-function', getAllProjectFunction)
sinafipRouter.get('/general-studies', getAllgeneralStudies)
sinafipRouter.get('/preinv-document', getAllpreinvDocument)
sinafipRouter.get('/modality-financing', getAllmodalityFinancing)


sinafipRouter.post('/request/new',verificaToken, createRequestSinafip)
sinafipRouter.get('/request/get-all', verificaToken, getAllRequest)
sinafipRouter.get('/request/:id', getOneRequest)
// sinafipRouter.post('/request/create', createRequest)
// sinafipRouter.delete('/request/delete/:id', deleteOneRequest)

sinafipRouter.put('/request/:status/:id', verificaToken, updateState)
sinafipRouter.post('/request/admission/:id', verificaToken, createAdmissionQuanty)
sinafipRouter.get('/request/data-priorization/:id', getDataPriorization)

export default sinafipRouter