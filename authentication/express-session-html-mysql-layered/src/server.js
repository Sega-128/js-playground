const env = require('./config/env');
const app = require('./app');
const { pool } = require('./db/client');

(async () => {
    await pool.query('SELECT 1');
    console.log('MySQL pool is connected and ready for queries');

    app.listen(env.PORT, (err) => {
        if (err) throw err;
        console.log(`Server running at http://localhost:${env.PORT}/`);
    });
})().catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1);
});
