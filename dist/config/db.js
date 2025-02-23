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
exports.initDB = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dbHost = process.env.DB_HOST || 'localhost';
const dbUser = process.env.DB_USER || 'myuser';
const dbPass = process.env.DB_PASS || 'mypassword';
const dbName = process.env.DB_NAME || 'ordersdb';
exports.sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: 'postgres',
    logging: false,
});
function initDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.sequelize.authenticate();
            console.log('Database connection established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
            process.exit(1);
        }
    });
}
exports.initDB = initDB;
//# sourceMappingURL=db.js.map