import { Request, Response } from 'express';
import models from "../../db/connection";
import { entity } from '../../models/sinafip/entity.entity';



export async function getAllEntities(req: Request, res: Response) {
  try {
    let entities = await entity.findAll()
    if (entities.length <= 0) {
      let ents = ['AMSA', 'AMSCLAE', 'ANADIE', 'CAMINOS', 'CDAG', 'CGC', 'CONAP', 'CONRED', 'COPEREX', 'DEFENSORIA PENAL', 'EMPORNAC', 'ENCA',
        'EPQ', 'FODES', 'FODIGUA', 'FONDETEL', 'FONTIERRA', 'FSS', 'IGSS', 'INAB', 'INACIF', 'INAP', 'INDE', 'INFOM', 'INGUAT', 'INSIVUMEH',
        'INTECAP', 'MAGA', 'MARN', 'MEM', 'MICUDE', 'MIDES', 'MINDEF', 'MINECO', 'MINEDUC', 'MINEX', 'MINGOB', 'MINTRAB', 'MP', 'MSPAS', 'OJ',
        'PNC', 'PROVIAL', 'RENAP', 'RGP', 'RIC', 'SAT', 'SBS', 'SEGEPLAN', 'SENACYT', 'SEPAZ', 'SEPREM', 'SOSEP', 'UCEE', 'UDEVIPO',
        'UNEPAR', 'UNIDAD DE CONCESIONES', 'USAC', 'ZOLIC',];

      let resEnt = await Promise.all(ents.map(async (ent: any) => {
        let enti = {nameEntity: ent}
        let res = await entity.create(enti);
        return res;
      }));

      entities = await entity.findAll()
      return res.status(200).send(entities)
    }

    return res.status(200).send(entities)

  } catch (error: any) {
    return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
  }
}