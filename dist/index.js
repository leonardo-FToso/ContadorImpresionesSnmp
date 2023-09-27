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
const getCountRowsDB_service_1 = require("./services/getCountRowsDB.service");
const getDataJsonImpresoras_service_1 = require("./services/getDataJsonImpresoras.service");
const insertData_service_1 = require("./services/insertData.service");
function getDatosImpresiones() {
    return __awaiter(this, void 0, void 0, function* () {
        const snmpCommunity = 'public'; // Comunidad SNMP (generalmente 'public' o 'private')
        const copyCountOID = [1, 3, 6, 1, 2, 1, 43, 10, 2, 1, 4, 1, 1]; // OID para el contador de copias en una impresora Kyocera y Brother
        const impresoras = yield (0, getDataJsonImpresoras_service_1.getJsonImpresoras)(); // get ips from impresoras.json example: ['192.168.5.26', '192.168.5.107', '192.168.5.29', '192.168.5.28']
        console.log("Cantidad de impresoras ", impresoras.length);
        let datos = [];
        for (const impresora of impresoras) {
            const numeroCopias = yield (0, getCopyNumber_service_1.getNumeroCopias)(copyCountOID, impresora.ip, snmpCommunity);
            console.log("numeroCopias: ", numeroCopias);
            datos.push({
                //ip: impresora.ip,
                impresiones: numeroCopias,
                fecha: new Date(),
                dispositivoId: impresora.dispositivoId
            });
        }
        return datos;
    });
}
function hola() {
    console.clear();
    const datosRandom = [];
    for (let index = 0; index < 100; index++) {
        const numeroAleatorio = Math.floor(Math.random() * 10) + 1;
        for (let index = 0; index < numeroAleatorio - 1; index++) {
            const datos = [];
            const eeeee = () => {
                getDatosImpresiones().then(response => datos.push(...response));
            };
            eeeee();
            setTimeout(() => { }, 4000);
            console.log("Datos: ", datos.length);
            // insertar datos en BD
            const aaaahhhh = () => {
                (0, insertData_service_1.insertCopiasInDB)(datos).then(response => console.log("insert all", datos.length));
            };
            aaaahhhh();
            console.log("Datos: ", datos.length);
            // for (const impresora of datos) {
            //         const response = await insertCopiasInDB(impresora)
            //         console.log(response)
            //     }
            // }
        }
        let response = {};
        (0, getCountRowsDB_service_1.getRowsTable)().then(res => response = res);
        const isEqual = response == (numeroAleatorio - 1) * 7;
        console.log("Datos : count", response, " random: ", (numeroAleatorio - 1) * 7, " comparacion: ", isEqual);
        datosRandom.push({ countTable: response, numeroAleatorio: (numeroAleatorio - 1) * 7, isEqual: response == (numeroAleatorio - 1) * 7 });
        (0, getCountRowsDB_service_1.deteleFromAllasterisco)().then(res => console.log(res));
    }
    console.log(datosRandom);
    const resultado = datosRandom.reduce((contador, objeto) => {
        if (objeto.isEqual === true) {
            contador.trueCount++;
        }
        else {
            contador.falseCount++;
        }
        return contador;
    }, { trueCount: 0, falseCount: 0 });
    console.log("Total de insert correctos:", resultado.trueCount);
    console.log("Total de insert incorrectos:", resultado.falseCount);
    console.log("Total de datos:", datosRandom.length);
    // const snmpCommunity = 'public'; // Comunidad SNMP (generalmente 'public' o 'private')
    // const copyCountOID = [1, 3, 6, 1, 2, 1, 43, 10, 2, 1, 4, 1, 1]; // OID para el contador de copias en una impresora Kyocera y Brother
    // const impresoras: Impresora[] = await getJsonImpresoras() // get ips from impresoras.json example: ['192.168.5.26', '192.168.5.107', '192.168.5.29', '192.168.5.28']
    // console.log("Cantidad de impresoras ", impresoras.length)
    // let datos: DatosImpresora[] = []
    // for (const impresora of impresoras) {
    //     const numeroCopias = await getNumeroCopias(copyCountOID, impresora.ip, snmpCommunity)
    //     console.log("numeroCopias: ",numeroCopias)
    //     datos.push({
    //         ip: impresora.ip,
    //         impresiones: numeroCopias,
    //         fecha: new Date(),
    //         dispositivoId: impresora.dispositivoId
    //     })
    //     console.log(datos.length)
    // }
    // console.log("Datos: ",datos.length)
    // // setTimeout(() => {}, 2000)
    // // insertar datos en BD
    // for (const impresora of datos) {
    //     const response = await insertCopiasInDB(impresora)
    //     console.log(response)
    // }
    // const countTable = await 
    // datos = []
}
hola();
