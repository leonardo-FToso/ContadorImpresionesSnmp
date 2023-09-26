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
exports.getNumeroCopias = void 0;
const snmp_native_1 = require("snmp-native");
const util_1 = require("util");
function getNumeroCopias(copyCountOID, printerIp, snmpCommunity) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = new snmp_native_1.Session({ host: printerIp, community: snmpCommunity });
        let contadorImpresiones = 0;
        // Realiza una consulta SNMP para obtener el contador de copias
        const getAsync = (0, util_1.promisify)(session.get.bind(session));
        try {
            const varbinds = yield getAsync({ oid: copyCountOID });
            if (varbinds.length > 0) {
                // console.log("datos de " + printerIp + " datos ", varbinds)
                const copyCount = parseInt(varbinds[0].value);
                contadorImpresiones = copyCount;
            }
            else {
                contadorImpresiones = 0;
            }
        }
        catch (error) {
            console.error('Error al consultar SNMP:', error);
        }
        finally {
            // Cierra la sesión SNMP
            session.close();
        }
        return contadorImpresiones;
    });
}
exports.getNumeroCopias = getNumeroCopias;
//    session.get({ oid: copyCountOID }, (error, varbinds) => {
//         if (error) {
//             console.error('Error al consultar SNMP:', error);
//         } else {
//             if (varbinds.length > 0) {
//                 const copyCount: number = parseInt(varbinds[0].value);
//                 console.log("se obtiene dato :", copyCount)
//                 contadorImpresiones = copyCount
//             } else {
//                 contadorImpresiones = 0
//             }
//         }
//         // Cierra la sesión SNMP
//         session.close();
//     });
