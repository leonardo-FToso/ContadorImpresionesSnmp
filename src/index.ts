import { getNumeroCopias } from "./services/getCopyNumber.service";
import { deteleFromAllasterisco, getRowsTable } from "./services/getCountRowsDB.service";
import { getJsonImpresoras } from "./services/getDataJsonImpresoras.service";
import { insertCopiasInDB } from "./services/insertData.service";
import { DatosImpresora, Impresora } from "./types/impresora";

async function getDatosImpresiones(): Promise<DatosImpresora[]> {
    const snmpCommunity = 'public'; // Comunidad SNMP (generalmente 'public' o 'private')
    const copyCountOID = [1, 3, 6, 1, 2, 1, 43, 10, 2, 1, 4, 1, 1]; // OID para el contador de copias en una impresora Kyocera y Brother

    const impresoras: Impresora[] = await getJsonImpresoras() // get ips from impresoras.json example: ['192.168.5.26', '192.168.5.107', '192.168.5.29', '192.168.5.28']

    console.log("Cantidad de impresoras ", impresoras.length)

    let datos: DatosImpresora[] = []
    for (const impresora of impresoras) {
        const numeroCopias = await getNumeroCopias(copyCountOID, impresora.ip!, snmpCommunity)
        console.log("numeroCopias: ", numeroCopias)
        datos.push({
            //ip: impresora.ip,
            impresiones: numeroCopias,
            fecha: new Date(),
            dispositivoId: impresora.dispositivoId
        })
    }
    return datos
}


function hola() {
    console.clear()
    const datosRandom = []
    for (let index = 0; index < 100; index++) {

        const numeroAleatorio: number = Math.floor(Math.random() * 10) + 1;
        for (let index = 0; index < numeroAleatorio - 1; index++) {

            const datos: DatosImpresora[] = []
            const eeeee = () => {
                getDatosImpresiones().then(response => datos.push(...response))
            }
            eeeee()

            

            setTimeout(() => { }, 4000);

            console.log("Datos: ", datos.length)

            // insertar datos en BD
            const aaaahhhh = () => {
                insertCopiasInDB(datos).then(response => console.log("insert all", datos.length))
            }
            aaaahhhh()
            console.log("Datos: ", datos.length)
            // for (const impresora of datos) {

            //         const response = await insertCopiasInDB(impresora)
            //         console.log(response)
            //     }
            // }



        }

        let response = {}
        getRowsTable().then(res => response = res)
        const isEqual = response == (numeroAleatorio - 1) * 7
        console.log("Datos : count", response, " random: ", (numeroAleatorio - 1) * 7, " comparacion: ", isEqual)

        datosRandom.push({ countTable: response, numeroAleatorio: (numeroAleatorio - 1) * 7, isEqual: response == (numeroAleatorio - 1) * 7 })
        deteleFromAllasterisco().then(res => console.log(res))
    }

    console.log(datosRandom)
    const resultado = datosRandom.reduce((contador, objeto) => {
        if (objeto.isEqual === true) {
            contador.trueCount++;
        } else {
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

hola()