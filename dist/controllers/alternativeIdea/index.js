'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIdeaAlternativeComplete = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const feature_1 = require("./feature");
/**
 * Funcion para  listar las configuraciones globales
 * @param {*} req
 */
function createIdeaAlternativeComplete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let transaction = yield connection_1.default.transaction();
        try {
            let ideaAlternative = yield (0, feature_1.FcreateIdeaAlternativeComplete)(req.body.ideaAlternative, transaction);
            transaction.commit();
            return res.status(200).send(ideaAlternative);
        }
        catch (error) {
            transaction.rollback();
            return res.status(error.codigo || 500).send({ message: `${error.message || error}` });
        }
    });
}
exports.createIdeaAlternativeComplete = createIdeaAlternativeComplete;
//# sourceMappingURL=index.js.map