import { Request, Response } from 'express';
import models from "../../db/connection";
import { entity } from '../../models/sinafip/entity.entity';
import { generalStudies } from '../../models/sinafip/generalStudies.entity';
import { modalityFinancing } from '../../models/sinafip/modalityFinancing.entity';
import { preinvDocument } from '../../models/sinafip/preinvDocument.entity';
import { projectFunction } from '../../models/sinafip/projectFunction.entity';



export async function getAllEntities(req: Request, res: Response) {
  try {
    let data = await entity.findAll({
      order: [['name', 'ASC']]
    })
    if (data.length <= 0) {
      let ents = ['AMSA', 'AMSCLAE', 'ANADIE', 'CAMINOS', 'CDAG', 'CGC', 'CONAP', 'CONRED', 'COPEREX', 'DEFENSORIA PENAL', 'EMPORNAC', 'ENCA',
        'EPQ', 'FODES', 'FODIGUA', 'FONDETEL', 'FONTIERRA', 'FSS', 'IGSS', 'INAB', 'INACIF', 'INAP', 'INDE', 'INFOM', 'INGUAT', 'INSIVUMEH',
        'INTECAP', 'MAGA', 'MARN', 'MEM', 'MICUDE', 'MIDES', 'MINDEF', 'MINECO', 'MINEDUC', 'MINEX', 'MINGOB', 'MINTRAB', 'MP', 'MSPAS', 'OJ',
        'PNC', 'PROVIAL', 'RENAP', 'RGP', 'RIC', 'SAT', 'SBS', 'SEGEPLAN', 'SENACYT', 'SEPAZ', 'SEPREM', 'SOSEP', 'UCEE', 'UDEVIPO',
        'UNEPAR', 'UNIDAD DE CONCESIONES', 'USAC', 'ZOLIC',];

      let resEnt = await Promise.all(ents.map(async (ent: any) => {
        let enti = { name: ent }
        let res = await entity.create(enti);
        return res;
      }));

      data = await entity.findAll({
        order: [['name', 'ASC']]
      })
      return res.status(200).send(data)
    }

    return res.status(200).send(data)

  } catch (error: any) {
    return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
  }
}

export async function getAllProjectFunction(req: Request, res: Response) {
  try {
    let data = await projectFunction.findAll({
      order: [['name', 'ASC']]
    })
    if (data.length <= 0) {
      let ents = ['AGUA Y SANEAMIENTO', 'SALUD Y ASISTENCIASOCIAL', 'EDUCACION', 'MEDIO AMBIENTE', 'AGROPECUARIO', 'VIVIENDA', 'TRABAJO Y PREVISION SOCIAL',
        'ENERGIA', 'TRANSPORTE', 'SEGURIDAD INTERNA', 'DESARROLLO URBANO Y RURAL', 'INDUSTRIA Y COMERCIO', 'CIENCIA Y TECNOLOGIA', 'JUDICIAL', 'ADMINISTRACION FISCAL TURISMO',
        'SERVICIOS GENERALES', 'CULTURA Y DEPORTES', 'FINANCIERAS Y SEGUROS',];

      let resEnt = await Promise.all(ents.map(async (ent: any) => {
        let enti = { name: ent }
        let res = await projectFunction.create(enti);
        return res;
      }));

      data = await projectFunction.findAll({
        order: [['name', 'ASC']]
      })
      return res.status(200).send(data)
    }

    return res.status(200).send(data)

  } catch (error: any) {
    return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
  }
}

export async function getAllgeneralStudies(req: Request, res: Response) {
  try {
    let data = await generalStudies.findAll({
      order: [['name', 'ASC']]
    })
    if (data.length <= 0) {
      let ents = ['ESTUDIOS TÉCNICOS', 'ESTUDIOS ECONÓMICOS', 'ESTUDIOS SOCIALES',];

      let resEnt = await Promise.all(ents.map(async (ent: any) => {
        let enti = { name: ent }
        let res = await generalStudies.create(enti);
        return res;
      }));

      data = await generalStudies.findAll({
        order: [['name', 'ASC']]
      })
      return res.status(200).send(data)
    }

    return res.status(200).send(data)

  } catch (error: any) {
    return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
  }
}


export async function getAllpreinvDocument(req: Request, res: Response) {
  try {
    let data = await preinvDocument.findAll({
      order: [['name', 'ASC']]
    })
    if (data.length <= 0) {
      let ents = ['PERFIL', 'PREFACTIBILIDAD', 'FACTIBILIDAD', 'MEGAPROYECTO', 'DE IMPACTO', 'ESTRUCTURAL',
        'DISEÑO FINAL DE INGENIERIA', 'DISEÑO FINAL DE ARQUITECTURA', 'COMPLEMENTARIOS (CUYA FACTIBILIDAD HAYA SIDO DEMOSTRADA)',];

      let resEnt = await Promise.all(ents.map(async (ent: any) => {
        let enti = { name: ent }
        let res = await preinvDocument.create(enti);
        return res;
      }));

      data = await preinvDocument.findAll({
        order: [['name', 'ASC']]
      })
      return res.status(200).send(data)
    }

    return res.status(200).send(data)

  } catch (error: any) {
    return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
  }
}

export async function getAllmodalityFinancing(req: Request, res: Response) {
  try {
    let data = await modalityFinancing.findAll({
      order: [['name', 'ASC']]
    })
    if (data.length <= 0) {
      let ents = ['APORTACIONES DEL ESTADO', 'PRESTAMO', 'TRANSFERENCIA NO REEMBOLSABLE', 'OTROS MECANISMOS DE FINANCIAMIENTO',];

      let resEnt = await Promise.all(ents.map(async (ent: any) => {
        let enti = { name: ent }
        let res = await modalityFinancing.create(enti);
        return res;
      }));

      data = await modalityFinancing.findAll({
        order: [['name', 'ASC']]
      })
      return res.status(200).send(data)
    }

    return res.status(200).send(data)

  } catch (error: any) {
    return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
  }
}