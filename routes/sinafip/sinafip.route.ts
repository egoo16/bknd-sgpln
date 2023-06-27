import { Router } from 'express'
import { createModalityFinancing, createTypeProject, deleteModalityFinancing, deleteTypeProject, getAdvisedEntities, getAllEntities, getAllgeneralStudies, getAllmodalityFinancing, getAllpreinvDocument, getAllProjectFunction, getTypeProjects, updateModalityFinancing, updateTypeProject } from '../../controllers/sinafip/list.controller';
import { getAllRequest, updateRequest, getOneRequest, createRequestSinafip, updateState, createAdmissionQuanty, getDataPriorization } from '../../controllers/sinafip/sinafip.controller';
import { verificaToken } from '../../middlewares/authentication';
import { getEntidades } from '../../controllers';


const sinafipRouter = Router();

// Listados
sinafipRouter.get('/entities', getAllEntities)
sinafipRouter.get('/entidades', getEntidades)
sinafipRouter.get('/project-function', getAllProjectFunction)
sinafipRouter.get('/general-studies', getAllgeneralStudies)
sinafipRouter.get('/preinv-document', getAllpreinvDocument)

// Modality Financing
sinafipRouter.get('/modality-financing', getAllmodalityFinancing)
sinafipRouter.post("/modality-financing/", createModalityFinancing);
sinafipRouter.delete("/modality-financing/:id", deleteModalityFinancing);
sinafipRouter.put("/modality-financing/:id", updateModalityFinancing);

// Type Project
sinafipRouter.get('/type-projects', getTypeProjects)
sinafipRouter.post("/type-project/", createTypeProject);
sinafipRouter.delete("/type-project/:id", deleteTypeProject);
sinafipRouter.put("/type-project/:id", updateTypeProject);


sinafipRouter.get("/sector-adb/", getAdvisedEntities);


sinafipRouter.post('/request/new',verificaToken, createRequestSinafip)
sinafipRouter.post('/request/new',verificaToken, createRequestSinafip)
sinafipRouter.put('/request/update/:id', updateRequest)
sinafipRouter.get('/request/get-all', verificaToken, getAllRequest)
sinafipRouter.get('/request/:id', getOneRequest)
// sinafipRouter.post('/request/create', createRequest)
// sinafipRouter.delete('/request/delete/:id', deleteOneRequest)

sinafipRouter.put('/request/:status/:id', verificaToken, updateState)
sinafipRouter.post('/request/admission/:id', verificaToken, createAdmissionQuanty)
sinafipRouter.get('/request/data-priorization/:id', getDataPriorization)

export default sinafipRouter 