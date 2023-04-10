import { Router } from 'express'
import { getAdvisedEntities } from '../../controllers';
import { addTrack, createProject, getAllProjects, getProjectById } from '../../controllers/seguimiento/seguimiento.controller';


const seguimientoRouter = Router();


seguimientoRouter.post('/project/new', createProject)
seguimientoRouter.get('/project/get-all', getAllProjects)
seguimientoRouter.get('/project/:id', getProjectById)
seguimientoRouter.post('/project/track/:id', addTrack)

// sinafipRouter.delete('/request/delete/:id', deleteOneRequest)

// seguimientoRouter.put('/request/:status/:id', updateState)
// seguimientoRouter.post('/request/admission/:id', createAdmissionQuanty)
// seguimientoRouter.get('/request/data-priorization/:id', getDataPriorization)

export default seguimientoRouter