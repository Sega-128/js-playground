const { defineConfig } = require('drizzle-kit');

module.exports = defineConfig({
    dialect: 'mysql',
    schema: './src/db/schema.js',
    out: './src/db/migrations',
});
