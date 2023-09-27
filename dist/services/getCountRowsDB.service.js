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
exports.deteleFromAllasterisco = exports.getRowsTable = void 0;
const db_server_1 = require("../utils/db.server");
function getRowsTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield db_server_1.db.numeroImpresiones.count();
            return response;
        }
        catch (error) {
            console.log("problemas para conectar con base de datos");
            return {};
        }
    });
}
exports.getRowsTable = getRowsTable;
function deteleFromAllasterisco() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield db_server_1.db.numeroImpresiones.deleteMany({});
            return response.count;
        }
        catch (error) {
            console.log("deteleFromAllasterisco: ", error);
        }
    });
}
exports.deteleFromAllasterisco = deteleFromAllasterisco;
