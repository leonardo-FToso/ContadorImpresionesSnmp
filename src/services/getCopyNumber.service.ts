import { Session } from 'snmp-native';
import { promisify } from 'util'

interface Copias {
    printerIp: string,
    copyCOunter: number
}
export async function getNumeroCopias(copyCountOID: number[], printerIp: string, snmpCommunity: string): Promise<number> {

    const session = new Session({ host: printerIp, community: snmpCommunity });
    let contadorImpresiones: number = 0;
    // Realiza una consulta SNMP para obtener el contador de copias
    const getAsync = promisify(session.get.bind(session))

    try {
        const varbinds = await getAsync({ oid: copyCountOID })
        if (varbinds.length > 0) {
            // console.log("datos de " + printerIp + " datos ", varbinds)
            const copyCount: number = parseInt(varbinds[0].value);
            contadorImpresiones = copyCount;
        } else {
            contadorImpresiones = 0;
        }
    } catch (error) {
        console.error('Error al consultar SNMP:', error);
    } finally {
        // Cierra la sesión SNMP
        session.close();
    }
    return contadorImpresiones
}


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