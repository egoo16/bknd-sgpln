import { Request, Response } from 'express';
import models from "../../db/connection";
import { denomination, referencePopulation } from '../../models/BancoIdeas';
import advisedEntity from '../../models/seguimiento/advisedEntity.entity';
import subSectorization from '../../models/seguimiento/subSectorization.entity';
import { entity } from '../../models/sinafip/entity.entity';
import { generalStudies } from '../../models/sinafip/generalStudies.entity';
import { modalityFinancing } from '../../models/sinafip/modalityFinancing.entity';
import { preinvDocument } from '../../models/sinafip/preinvDocument.entity';
import { projectFunction } from '../../models/sinafip/projectFunction.entity';
import { advEntities } from './advisedEnt';
import typeProject from '../../models/BancoIdeas/typeProject';



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
      let ents = ['AMBIENTAL', 'ECONÓMICO', 'SOCIAL',];

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



export const getDenomination = async (req: Request, res: Response) => {
  try {
    let data = await denomination.findAll();
    if (data.length <= 0) {
      let den1 = { name: 'Alumnos' };
      let denCreated = await denomination.create(den1)
      den1.name = 'Pacientes'
      denCreated = await denomination.create(den1)
      den1.name = 'Agricultores'
      denCreated = await denomination.create(den1)
    }
    data = await denomination.findAll();


    res.status(200).json({
      msg: "Datos Obtenidos",
      data,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error,
    });
  }
};

export const createDenomination = async (req: Request, res: Response) => {
  try {
    if (req.body.name) {
      const name = req.body.name;
      let denCreated = await denomination.create({ name })

      if (denCreated) {
        res.status(200).json({
          msg: "Datos Creados",
          data: denCreated,
        });
      }
    }
    else {
      throw `Error al crear Denominacion`;
    }

  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error,
    });
  }
}

export const deleteDenomination = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {

      const denominationToDelete = await denomination.findOne({ where: { codigo: req.params.id } });
      if (denominationToDelete) {

        const codigo = req.params.id;
        let denCreated = await denomination.destroy({
          where: {
            codigo: denominationToDelete.codigo
          }
        })

        res.status(200).json({
          msg: "Datos Eliminados",
          data: denominationToDelete
        });
      } else {
        throw `No se encontró el registro`;
      }
    }

    else {
      throw `Error al eliminar Denominacion`;
    }

  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error,
    });
  }
}

export const updateDenomination = async (req: Request, res: Response) => {
  try {
    if (req.body.name && req.params.id) {
      const name = req.body.name;
      const codigo = req.params.id;
      const denominationToUpdate = await denomination.findOne({ where: { codigo: req.params.id } });
      if (denominationToUpdate) {

        let denCreated = await denomination.update({ name }, {
          where: {
            codigo
          }
        })

        const denominationToUpdated = await denomination.findOne({ where: { codigo: req.params.id } });

        if (denCreated) {
          res.status(200).json({
            msg: "Datos Actualizados",
            data: denominationToUpdated
          });
        }
      } else {
        throw `No se encontró el registro`;
      }

    }
    else {
      throw `Error al crear Denominacion`;
    }

  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error,
    });
  }
}

export const getReferencePopulation = async (req: Request, res: Response) => {
  try {
    let data = await referencePopulation.findAll();
    if (data.length <= 0) {
      let ref = { name: 'Nacional' };
      let denCreated = await referencePopulation.create(ref)
      ref.name = 'Departamental'
      denCreated = await referencePopulation.create(ref)
      ref.name = 'Municipal'
      denCreated = await referencePopulation.create(ref)
      ref.name = 'Comunal'
      denCreated = await referencePopulation.create(ref)
    }
    data = await referencePopulation.findAll();

    res.status(200).json({
      msg: "Datos Obtenidos",
      data,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error,
    });
  }
};



export const createReferencePopulation = async (req: Request, res: Response) => {
  try {
    if (req.body.name) {
      const name = req.body.name;
      let denCreated = await referencePopulation.create({ name })

      if (denCreated) {
        res.status(200).json({
          msg: "Datos Created",
          data: denCreated,
        });
      }
    }
    else {
      throw `Error al crear Poblacion de Referencia`;
    }

  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error,
    });
  }
}

export const deleteReferencePopulation = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const refToDelete = await referencePopulation.findOne({ where: { codigo: req.params.id } });
      if (refToDelete) {
        const codigo = req.params.id;
        let denCreated = await referencePopulation.destroy({
          where: {
            codigo
          }
        })

        res.status(200).json({
          msg: "Datos Eliminados",
          data: refToDelete
        });
      } else {
        throw `No se encontró el registro`;
      }

    }
    else {
      throw `Error al eliminar Poblacion de Referencia`;
    }

  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error,
    });
  }
}

export const updateReferencePopulation = async (req: Request, res: Response) => {
  try {
    if (req.body.name && req.params.id) {
      const name = req.body.name;
      const codigo = req.params.id;
      const refToUpdate = await referencePopulation.findOne({ where: { codigo: req.params.id } });

      if (refToUpdate) {
        let denCreated = await referencePopulation.update({ name }, {
          where: {
            codigo
          }
        })
        const refToUpdated = await referencePopulation.findOne({ where: { codigo: req.params.id } });

        if (denCreated) {
          res.status(200).json({
            msg: "Datos Actualizados",
            data: refToUpdated
          });
        }
      } else {
        throw `No se encontró el registro`;
      }

    }
    else {
      throw `Error al actualizar Poblacion de Referencia`;
    }

  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error,
    });
  }
}

export async function getAllmodalityFinancing(req: Request, res: Response) {
  try {
    let data = await modalityFinancing.findAll({
      order: [['name', 'ASC']]
    })
    if (data.length <= 0) {
      let ents = ['APORTACIONES DEL ESTADO',
        'OTROS MECANISMOS DE FINANCIAMIENTO',
        'INGRESOS CORRIENTES',
        'INGRESOS TRIBUTARIOS IVA PAZ',
        'INGRESOS ORDINARIOS DE APORTE CONSTITUCIONAL',
        'INGRESOS PROPIOS',
        'CRÉDITO EXTERNO – PRESTAMOS EXTERNOS',
        'DONACIONES EXTERNAS',
        'PRESTAMO TRASFERENCIA NO REEMBOLSABLE',
        'NO SE CUENTA CON FUENTE DE FINANCIAMIENTO',
      ];

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

export const createModalityFinancing = async (req: Request, res: Response) => {
  try {
    if (req.body.name) {
      const name = req.body.name;
      let denCreated = await modalityFinancing.create({ name })

      if (denCreated) {
        res.status(200).json({
          msg: "Datos Created",
          data: denCreated,
        });
      }
    }
    else {
      throw `Error al crear Fuentes de Financiamiento`;
    }

  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error,
    });
  }
}

export const deleteModalityFinancing = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {

      const modalityToDelete = await modalityFinancing.findOne({ where: { id: req.params.id } });

      if (modalityToDelete) {

        const id = req.params.id;
        let denCreated = await modalityFinancing.destroy({
          where: {
            id
          }
        })

        res.status(200).json({
          msg: "Datos Eliminados",
          data: modalityToDelete
        });
      } else {
        throw `No se encontró el registro`;
      }
    }
    else {
      throw `Error al eliminar Fuentes de Financiamiento`;
    }

  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error,
    });
  }
}

export const updateModalityFinancing = async (req: Request, res: Response) => {
  try {
    if (req.body.name && req.params.id) {
      const name = req.body.name;
      const id = req.params.id;
      const modalityToUpdate = await modalityFinancing.findOne({ where: { id: req.params.id } });

      if (modalityToUpdate) {

        let denCreated = await modalityFinancing.update({ name }, {
          where: {
            id
          }
        })
        const modalityToUpdate = await modalityFinancing.findOne({ where: { id: req.params.id } });

        if (denCreated) {
          res.status(200).json({
            msg: "Datos Actualizados",
            data: modalityToUpdate
          });
        }
      } else {
        throw `No se encontró el registro`;
      }
    }
    else {
      throw `Error al crear Fuentes de Financiamiento`;
    }

  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error,
    });
  }
}

export async function getAdvisedEntities(req: Request, res: Response) {
  interface IsbSector {
    id?: string;
    name: string;
    advisedEntityId?: string;
  }
  interface IAdvEntities {
    id?: string;
    name: string;
    sbSector?: IsbSector[];
  }


  try {
    let data = await advisedEntity.findAll({
      order: [['name', 'ASC']],
      include: [
        {
          required: false,
          model: subSectorization
        },
      ]
    })
    if (data.length <= 0) {
      let ents: IAdvEntities[] = advEntities;

      let resEnt = await Promise.all(ents.map(async (ent: IAdvEntities) => {
        let entObj = { name: ent.name }
        let res = await advisedEntity.create(entObj);
        if (ent.sbSector && ent.sbSector?.length > 0) {
          let resEnt2 = await Promise.all(ent.sbSector.map(async (ent2: IsbSector) => {
            let ent2Obj: IsbSector = { name: ent2.name, advisedEntityId: res.id }
            let res2 = await subSectorization.create(ent2Obj);
            return res2;
          }));
        }
        return res;
      }));

      data = await advisedEntity.findAll({
        order: [['name', 'ASC']],
        include: [
          {
            required: false,
            model: subSectorization
          },
        ]
      })
      return res.status(200).send(data)
    }
    return res.status(200).send(data)

  } catch (error: any) {
    return res.status(error.codigo || 500).send({ message: `${error.message || error}` })
  }
}


export const getTypeProjects = async (req: Request, res: Response) => {
  try {
    let data = await typeProject.findAll();
    if (data.length <= 0) {
      let ref = { name: 'Desarrollo económico' };
      let denCreated = await typeProject.create(ref)
      ref.name = 'Desarrollo social'
      denCreated = await typeProject.create(ref)
      ref.name = 'Desarrollo ambiental y recursos naturales'
      denCreated = await typeProject.create(ref)
    }
    data = await typeProject.findAll();

    res.status(200).json({
      msg: "Datos Obtenidos",
      data,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error,
    });
  }
};

export const createTypeProject = async (req: Request, res: Response) => {
  try {
    if (req.body.name) {
      const name = req.body.name;
      let denCreated = await typeProject.create({ name })

      if (denCreated) {
        res.status(200).json({
          msg: "Datos Created",
          data: denCreated,
        });
      }
    }
    else {
      throw `Error al crear Tipo de Proyecto`;
    }

  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error,
    });
  }
}

export const deleteTypeProject = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const refToDelete = await typeProject.findOne({ where: { id: req.params.id } });
      if (refToDelete) {
        const id = req.params.id;
        let denCreated = await typeProject.destroy({
          where: {
            id
          }
        })

        res.status(200).json({
          msg: "Datos Eliminados",
          data: refToDelete
        });
      } else {
        throw `No se encontró el registro`;
      }

    }
    else {
      throw `Error al eliminar Tipo de Proyecto`;
    }

  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error,
    });
  }
}

export const updateTypeProject = async (req: Request, res: Response) => {
  try {
    if (req.body.name && req.params.id) {
      const name = req.body.name;
      const id = req.params.id;
      const refToUpdate = await typeProject.findOne({ where: { id: req.params.id } });

      if (refToUpdate) {
        let denCreated = await typeProject.update({ name }, {
          where: {
            id
          }
        })
        const refToUpdated = await typeProject.findOne({ where: { id: req.params.id } });

        if (denCreated) {
          res.status(200).json({
            msg: "Datos Actualizados",
            data: refToUpdated
          });
        }
      } else {
        throw `No se encontró el registro`;
      }

    }
    else {
      throw `Error al actualizar Tipo de Proyecto`;
    }

  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error,
    });
  }
}