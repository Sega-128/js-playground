const mysql = require('mysql2/promise');
const { drizzle } = require('drizzle-orm/mysql2');

const env = require('../config/env');

const pool = mysql.createPool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
});

const db = drizzle(pool);

module.exports = { db, pool };
