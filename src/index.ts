import { getNumeroCopias } from "./services/getCopyNumber.service";
import { getJsonImpresoras } from "./services/getDataJsonImpresoras.service";
import { insertCopiasInDB } from "./services/insertData.service";
import { DatosImpresora, Impresora } from "./types/impresora";



(async () => {
    const snmpCommunity = 'public'; // Comunidad SNMP (generalmente 'public' o 'private')
    const copyCountOID = [1, 3, 6, 1, 2, 1, 43, 10, 2, 1, 4, 1, 1]; // OID para el contador de copias en una impresora Kyocera y Brother
    
    const impresoras : Impresora[]  = await getJsonImpresoras() // get ips from impresoras.json example: ['192.168.5.26', '192.168.5.107', '192.168.5.29', '192.168.5.28']
    
    console.log("Cantidad de impresoras ", impresoras.length)

    let datos : DatosImpresora[] = []
    for (const impresora of impresoras) {
        const numeroCopias = await getNumeroCopias(copyCountOID, impresora.ip, snmpCommunity)
        
        datos.push({
            ip: impresora.ip,
            impresiones: numeroCopias,
            fecha: new Date(),
            dispositivoId: impresora.dispositivoId
        })
    }

   // console.log("Impresoras :", datos)

    //insertar en base de datos dispositivos
    const primerDato = datos[0]
    const response = await insertCopiasInDB(primerDato)
    console.log(response)

    
})()
