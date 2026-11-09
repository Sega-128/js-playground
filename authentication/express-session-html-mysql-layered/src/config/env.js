require('dotenv').config();
const { z } = require('zod');

const envSchema = z.object({
    NODE_ENV: z.string().default('development'),
    PORT: z.coerce.number().int().positive().default(3000),
    SESSION_SECRET: z.string().min(16),
    FRONTEND_URL: z.url(),
    DB_HOST: z.string().min(1),
    DB_PORT: z.coerce.number().int().positive().default(3306),
    DB_USER: z.string().min(1),
    DB_PASSWORD: z.string().default(''),
    DB_NAME: z.string().min(1),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
    const problems = result.error.issues.map((issue) => `  ${issue.path.join('.')}: ${issue.message}`);
    throw new Error(`Invalid environment variables:\n${problems.join('\n')}`);
}

module.exports = result.data;
