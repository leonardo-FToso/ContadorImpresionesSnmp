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
exports.insertCopiasInDB = void 0;
const db_server_1 = require("../utils/db.server");
function insertCopiasInDB(datos) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("insertCopiasImpresoras: params", datos.dispositivoId, " ", datos.impresiones);
        try {
            const response = yield db_server_1.db.numeroImpresiones.create({
                data: {
                    fecha: datos.fecha,
                    dispositivoId: datos.dispositivoId,
                    impresiones: datos.impresiones
                },
                select: {
                    id: true,
                }
            });
            return response;
        }
        catch (error) {
            console.log("problemas para conectar con base de datos");
            return {};
        }
    });
}
exports.insertCopiasInDB = insertCopiasInDB;
