import { CreateNumeroImpresiones } from "../types/impresora"
import { db } from "../utils/db.server"

export async function insertCopiasInDB(datos: CreateNumeroImpresiones[]) {
    //console.log("%c insertCopiasImpresoras: params",  datos.dispositivoId, " ", datos.impresiones, "color: blue;")

    try {
        const response = await db.numeroImpresiones.createMany({
            data: datos,                        
        })
        return response
    } catch (error) {
        console.log("problemas para conectar con base de datos")
        return {}
    }
   

}