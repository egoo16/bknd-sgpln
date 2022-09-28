import e, {Request, Response} from 'express';
import models from "../../db/connection";
import { request} from '../../models/sinafip'


export async function createRequest( req:Request, res:Response) 
{
  let transaction = await models.transaction()
    try {
        const newRequest = await request.create(req.body,{transaction})
        transaction.commit()
        return res.status(201).send(newRequest)
    } catch (error: any) {
        transaction.rollback()
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}

export async function getAllRequest( req:Request, res:Response) 
{
    try {
        const requests = await request.findAll()
        if(requests.length > 0){
          return res.status(200).send(request)
        }
        else {
          return res.send({status: 200,data:[]});
        }
        
        
    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}


export async function getOneRequest( req:Request, res:Response) 
{
    try {
        const getRequest = await request.findOne({ where : {
          id: req.params.id
        } })

        return res.status(200).send(getRequest)
        
        
    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}


export async function deleteOneRequest( req:Request, res:Response) 
{
    try {
        const getRequest = await request.destroy({
          where: {
            id: req.params.id
          }
        })

        return res.status(200).send({
          message : `request with code ${req.params.id} was deteled successfully`
        })
        
        
    } catch (error: any) {
        return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
    }
}