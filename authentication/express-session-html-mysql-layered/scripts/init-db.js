// Creates the database and the application user. Tables are created by migrations.
require('dotenv').config();
const mysql = require('mysql2/promise');

const { DB_HOST, DB_PORT, DB_ROOT_USER, DB_ROOT_PASSWORD, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

(async () => {
    const connection = await mysql.createConnection({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_ROOT_USER,
        password: DB_ROOT_PASSWORD,
    });

    await connection.query('CREATE DATABASE IF NOT EXISTS ??', [DB_NAME]);
    await connection.query("CREATE USER IF NOT EXISTS ?@'%' IDENTIFIED BY ?", [DB_USER, DB_PASSWORD]);
    await connection.query("GRANT ALL PRIVILEGES ON ??.* TO ?@'%'", [DB_NAME, DB_USER]);
    await connection.end();

    console.log(`Database ${DB_NAME} and user ${DB_USER} are ready`);
})().catch((err) => {
    console.error('Error initializing database:', err);
    process.exit(1);
});
