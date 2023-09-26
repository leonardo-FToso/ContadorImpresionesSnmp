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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsonImpresoras = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
function getJsonImpresoras() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filePath = path_1.default.resolve(__dirname + './../../impresoras.json');
            const readFileAsync = (0, util_1.promisify)(fs_1.default.readFile);
            const contenido = yield readFileAsync(filePath, 'utf-8');
            // Parsea el contenido JSON
            const data = JSON.parse(contenido);
            return data;
        }
        catch (error) {
            console.log("error al leer archivo");
            return [];
        }
    });
}
exports.getJsonImpresoras = getJsonImpresoras;
