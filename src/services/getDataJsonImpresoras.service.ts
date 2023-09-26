import fs from 'fs'
import path from 'path';
import { promisify } from 'util';
import { Impresora } from '../types/impresora';


export async function getJsonImpresoras(): Promise<Impresora[]> {
    try {
        const filePath = path.resolve(__dirname + './../../impresoras.json');
        const readFileAsync = promisify(fs.readFile);
        const contenido = await  readFileAsync(filePath, 'utf-8');

        // Parsea el contenido JSON
        const data: Impresora[] = JSON.parse(contenido);
        return data
    } catch (error) {
        console.log("error al leer archivo")
        return []
    }
}