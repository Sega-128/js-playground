const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mydb',
    waitForConnections: true,
    connectionLimit: 10
});

async function query(sql, params) {
    const [rows] = await pool.execute(sql, params);
    return rows;
}


// User move to repository folder
async function addUser({ username, email, password }) {
    await query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, password]
    );
}

async function findUserByUsername(username) {
    const rows = await query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
}

module.exports = { pool, addUser, findUserByUsername };