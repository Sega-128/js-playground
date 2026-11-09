const path = require('node:path');
const { migrate } = require('drizzle-orm/mysql2/migrator');

const { db, pool } = require('./client');

(async () => {
    await migrate(db, { migrationsFolder: path.join(__dirname, 'migrations') });
    await pool.end();
    console.log('Migrations applied');
})().catch((err) => {
    console.error('Error applying migrations:', err);
    process.exit(1);
});
