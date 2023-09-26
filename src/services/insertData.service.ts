import { CreateNumeroImpresiones } from "../types/impresora"
import { db } from "../utils/db.server"

export async function insertCopiasInDB(datos: CreateNumeroImpresiones) {
    console.log("insertCopiasImpresoras: params",  datos.dispositivoId, " ", datos.impresiones)

    try {
        const response = await db.numeroImpresiones.create({
            data: {
                fecha: datos.fecha,
                dispositivoId: datos.dispositivoId,
                impresiones: datos.impresiones            
            },
            select: {
                id: true,
            }
        })
        return response
    } catch (error) {
        console.log("problemas para conectar con base de datos")
        return {}
    }
   

}