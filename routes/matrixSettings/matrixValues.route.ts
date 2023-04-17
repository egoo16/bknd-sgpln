import { Router } from 'express'
import { getAdmissionMatrixValues, getRelevanceMatrixValues, updateAdmissionValues, updateRelevanceBeneficiaries, updateRelevanceComplexy, updateRelevanceInvestment, updateRelevanceStage } from '../../controllers/matrixValues/matrix.controller';


const matrixRouter = Router();


matrixRouter.get('/admission', getAdmissionMatrixValues)
matrixRouter.put('/admission', updateAdmissionValues)

matrixRouter.get('/relevance', getRelevanceMatrixValues)
matrixRouter.put('/relevance/investment', updateRelevanceInvestment)
matrixRouter.put('/relevance/beneficiaries', updateRelevanceBeneficiaries)
matrixRouter.put('/relevance/complexy', updateRelevanceComplexy)
matrixRouter.put('/relevance/stage', updateRelevanceStage)

export default matrixRouter