import { CreateNumeroImpresiones } from "../types/impresora"
import { db } from "../utils/db.server"

export async function getRowsTable() {
    try {
        const response = await db.numeroImpresiones.count()
        return response
    } catch (error) {
        console.log("problemas para conectar con base de datos")
        return {}
    } 
}

export async function deteleFromAllasterisco() {
    try {
        const response = await db.numeroImpresiones.deleteMany({})
        return response.count
    } catch (error) {
        console.log("deteleFromAllasterisco: ", error)
    }
}