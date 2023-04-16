import { Router } from 'express'
import { getAdmissionMatrixValues } from '../../controllers/matrixValues/matrix.controller';


const matrixRouter = Router();


// seguimientoRouter.post('/project/new', createProject)
matrixRouter.get('/admission', getAdmissionMatrixValues)
// seguimientoRouter.get('/project/:id', getProjectById)
// seguimientoRouter.post('/project/track/:id', addTrack)

// sinafipRouter.delete('/request/delete/:id', deleteOneRequest)

// seguimientoRouter.put('/request/:status/:id', updateState)
// seguimientoRouter.post('/request/admission/:id', createAdmissionQuanty)
// seguimientoRouter.get('/request/data-priorization/:id', getDataPriorization)

export default matrixRouter