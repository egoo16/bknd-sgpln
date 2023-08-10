import { Router } from 'express'
import { getAdvisedEntities } from '../../controllers';
import { addTrack, createProject, deleteProject, deleteTrack, editProject, editTrack, getAllProjects, getProjectById } from '../../controllers/seguimiento/seguimiento.controller';


const seguimientoRouter = Router();


seguimientoRouter.post('/project/new', createProject)
seguimientoRouter.get('/project/get-all', getAllProjects)
seguimientoRouter.get('/project/:id', getProjectById)
seguimientoRouter.put('/project/:id', editProject)
seguimientoRouter.post('/project/track/:id', addTrack)
seguimientoRouter.put('/project/track/:id', editTrack)
seguimientoRouter.delete('/project/:id', deleteProject)
seguimientoRouter.delete('/track/:id', deleteTrack)


// sinafipRouter.delete('/request/delete/:id', deleteOneRequest)

// seguimientoRouter.put('/request/:status/:id', updateState)
// seguimientoRouter.post('/request/admission/:id', createAdmissionQuanty)
// seguimientoRouter.get('/request/data-priorization/:id', getDataPriorization)

export default seguimientoRouter