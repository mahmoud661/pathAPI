"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_1 = require("../../config");
const consoleLogger_1 = __importDefault(require("../logger/consoleLogger"));
const pool = new pg_1.Pool({
    connectionString: config_1.config.dbHost,
    ssl: {
        rejectUnauthorized: false,
    },
    max: 100, // Maximum number of connections in the pool
    min: 20, // Minimum number of idle connections
    idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
    connectionTimeoutMillis: 10000, // Wait up to 2 seconds for a connection
});
pool.on('connect', () => {
    consoleLogger_1.default.Info('Database connection established successfully');
});
pool.on('error', (err) => {
    consoleLogger_1.default.Error('Unexpected error on idle client', 'DBpool');
});
exports.default = pool;
//# sourceMappingURL=DBpool.js.map