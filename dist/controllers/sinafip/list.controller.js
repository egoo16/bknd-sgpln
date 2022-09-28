"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEntities = void 0;
const entity_entity_1 = require("../../models/sinafip/entity.entity");
function getAllEntities(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let entities = yield entity_entity_1.entity.findAll();
            if (entities.length <= 0) {
                let ents = ['AMSA', 'AMSCLAE', 'ANADIE', 'CAMINOS', 'CDAG', 'CGC', 'CONAP', 'CONRED', 'COPEREX', 'DEFENSORIA PENAL', 'EMPORNAC', 'ENCA',
                    'EPQ', 'FODES', 'FODIGUA', 'FONDETEL', 'FONTIERRA', 'FSS', 'IGSS', 'INAB', 'INACIF', 'INAP', 'INDE', 'INFOM', 'INGUAT', 'INSIVUMEH',
                    'INTECAP', 'MAGA', 'MARN', 'MEM', 'MICUDE', 'MIDES', 'MINDEF', 'MINECO', 'MINEDUC', 'MINEX', 'MINGOB', 'MINTRAB', 'MP', 'MSPAS', 'OJ',
                    'PNC', 'PROVIAL', 'RENAP', 'RGP', 'RIC', 'SAT', 'SBS', 'SEGEPLAN', 'SENACYT', 'SEPAZ', 'SEPREM', 'SOSEP', 'UCEE', 'UDEVIPO',
                    'UNEPAR', 'UNIDAD DE CONCESIONES', 'USAC', 'ZOLIC',];
                let resEnt = yield Promise.all(ents.map((ent) => __awaiter(this, void 0, void 0, function* () {
                    let enti = { nameEntity: ent };
                    let res = yield entity_entity_1.entity.create(enti);
                    return res;
                })));
                entities = yield entity_entity_1.entity.findAll();
                return res.status(200).send(entities);
            }
            return res.status(200).send(entities);
        }
        catch (error) {
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.getAllEntities = getAllEntities;
