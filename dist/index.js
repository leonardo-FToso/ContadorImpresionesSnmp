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
const getCopyNumber_service_1 = require("./services/getCopyNumber.service");
const getDataJsonImpresoras_service_1 = require("./services/getDataJsonImpresoras.service");
const insertData_service_1 = require("./services/insertData.service");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const snmpCommunity = 'public'; // Comunidad SNMP (generalmente 'public' o 'private')
    const copyCountOID = [1, 3, 6, 1, 2, 1, 43, 10, 2, 1, 4, 1, 1]; // OID para el contador de copias en una impresora Kyocera y Brother
    const impresoras = yield (0, getDataJsonImpresoras_service_1.getJsonImpresoras)(); // get ips from impresoras.json example: ['192.168.5.26', '192.168.5.107', '192.168.5.29', '192.168.5.28']
    console.log("Cantidad de impresoras ", impresoras.length);
    let datos = [];
    for (const impresora of impresoras) {
        const numeroCopias = yield (0, getCopyNumber_service_1.getNumeroCopias)(copyCountOID, impresora.ip, snmpCommunity);
        datos.push({
            ip: impresora.ip,
            impresiones: numeroCopias,
            fecha: new Date(),
            dispositivoId: impresora.dispositivoId
        });
    }
    // console.log("Impresoras :", datos)
    //insertar en base de datos dispositivos
    const primerDato = datos[0];
    const response = yield (0, insertData_service_1.insertCopiasInDB)(primerDato);
    console.log(response);
}))();
