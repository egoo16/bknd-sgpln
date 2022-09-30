import { 
    requestEntity,
    institutionEntity,
    investmentProjectEntity,
    studyDescriptionEntity,
    delimitEntity,
    requiredDocumentEntity,
    stimatedBudgetEntity,
    activitiesEntity
} from '../../models/sinafip';
import {Request, Response} from 'express';
import models from "../../db/connection";



export async function createRequestSinafip( req:Request, res:Response) 
{
 // let transaction = await models.transaction()
    try {
        let allActivities :any =[]
        const {status,author,institution,investment,studyDescription,delimit,requirementsDocuments} = req.body;
        const {totalStimated,activities} = requirementsDocuments.stimatedBudget
        const requestCreated = await requestEntity.create({status,author});
        const institutionCreated = await institutionEntity.create({...institution,requestId:requestCreated.id});
        const investmentCreated = await investmentProjectEntity.create({...investment,requestId:requestCreated.id});
        const studyDescriptionCreated = await studyDescriptionEntity.create({...studyDescription,requestId:requestCreated.id});
        const delimitCreated  = await delimitEntity.create({...delimit,requestId:requestCreated.id});
        const requiredDocumentCreated = await requiredDocumentEntity.create({requestId:requestCreated.id});
        const stimatedBugdetCreated = await stimatedBudgetEntity.create({totalStimated,docId:requiredDocumentCreated.id})


        if (activities?.length > 0) {
            const allData = await Promise.all(activities.map(async (activity: any) => {
                const  res = await activitiesEntity.create({...activity,stimatedId:stimatedBugdetCreated.id});
                return res;
            }));
            allActivities = [...allData];
        }

        const response = {
                request:requestCreated,
                institution:institutionCreated,
                investment: investmentCreated,
                studyDescription : studyDescriptionCreated,
                delimit :delimitCreated,
                requiredDocuments: {
                    id: requiredDocumentCreated.id,
                    stimatedBudget: {
                        id:stimatedBugdetCreated.id,
                        totalStimated:stimatedBugdetCreated.totalStimated,
                        activities:allActivities
                    }

                }          
        }
       // transaction.commit()
        return res.status(201).send(response)
    } catch (error: any) {
        //transaction.rollback()
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}


export async function getAllRequest( req:Request, res:Response) 
{
 
    try {
        const requests = await requestEntity.findAll();

        const allRequest = await Promise.all(requests.map(async (request:any) => 
        {
            const institution = await institutionEntity.findOne({where:{requestId:request.id}});
            const investment = await investmentProjectEntity.findOne({where:{requestId:request.id}});
            const studyDescription = await studyDescriptionEntity.findOne({where:{requestId:request.id}});
            const delimit = await delimitEntity.findOne({where:{requestId:request.id}});
            return {
                request,
                institution,
                investment,
                studyDescription,
                delimit
            };
        }));
    

        return res.status(201).send({
            msg: 'Datos Obtenidos',
            data: allRequest
        })
        
      
    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}

export async function getOneRequest( req:Request, res:Response) 
{
 
    try {
        const { id } = req.params
        const request = await requestEntity.findOne({where: {id}});
        const institution = await institutionEntity.findOne({where:{requestId:request.id}});
        const investment = await investmentProjectEntity.findOne({where:{requestId:request.id}});
        const studyDescription = await studyDescriptionEntity.findOne({where:{requestId:request.id}});
        const delimit = await delimitEntity.findOne({where:{requestId:request.id}});
        const requiredDoc = await requiredDocumentEntity.findOne({where:{requestId:request.id}});
        const stimated = await stimatedBudgetEntity.findOne({where: { docId:requiredDoc.id}})
        const activ = await activitiesEntity.findAll({where: { stimatedId:stimated.id}})
        const  response   = {
                request,
                institution,
                investment,
                studyDescription,
                delimit,
                requiredDocuments :{
                    id:requiredDoc.id,
                    tdr: requiredDoc.tdr,
                    scheduleActiv: requiredDoc.scheduleActiv,
                    stimatedBudget: {
                        id: stimated.id,
                        totalStimated: stimated.totalStimated,
                        activities : activ
                }
        
            }
        }

        return res.status(201).send(response);
        
      
    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}