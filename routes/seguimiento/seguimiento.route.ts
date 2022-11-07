import { Router } from 'express'
import { createProject } from '../../controllers/seguimiento/seguimiento.controller';


const seguimientoRouter = Router();

// // Listados
// seguimientoRouter.get('/entities', getAllEntities)
// seguimientoRouter.get('/project-function', getAllProjectFunction)
// seguimientoRouter.get('/general-studies', getAllgeneralStudies)
// seguimientoRouter.get('/preinv-document', getAllpreinvDocument)
// seguimientoRouter.get('/modality-financing', getAllmodalityFinancing)


seguimientoRouter.post('/project/new', createProject)
// seguimientoRouter.get('/request/get-all', getAllRequest)
// seguimientoRouter.get('/request/:id', getOneRequest)
// // sinafipRouter.post('/request/create', createRequest)
// sinafipRouter.delete('/request/delete/:id', deleteOneRequest)

// seguimientoRouter.put('/request/:status/:id', updateState)
// seguimientoRouter.post('/request/admission/:id', createAdmissionQuanty)
// seguimientoRouter.get('/request/data-priorization/:id', getDataPriorization)

export default seguimientoRouter