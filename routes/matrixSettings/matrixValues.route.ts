import { Router } from 'express'
import { getAdmissionMatrixValues, getRelevanceMatrixValues } from '../../controllers/matrixValues/matrix.controller';


const matrixRouter = Router();


matrixRouter.get('/admission', getAdmissionMatrixValues)
matrixRouter.get('/relevance', getRelevanceMatrixValues)

export default matrixRouter