
import { Prisma } from "@prisma/client";

export interface Impresora {
    ip?: string
    dispositivoId: number
}

export interface DatosImpresora extends Impresora {
    impresiones: number,
    fecha: Date,
}

export type CreateNumeroImpresiones = Prisma.NumeroImpresionesUncheckedCreateInput