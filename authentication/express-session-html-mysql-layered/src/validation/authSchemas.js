const { z } = require('zod');

const FILL_ALL_FIELDS = 'Fill all fields';

const requiredString = () => z.string({ error: FILL_ALL_FIELDS }).trim().min(1, FILL_ALL_FIELDS);

const registerSchema = z.object({
    username: requiredString().max(255, 'Username is too long'),
    email: z.string({ error: FILL_ALL_FIELDS }).pipe(z.email('Invalid email').max(255, 'Email is too long')),
    password: z.string({ error: FILL_ALL_FIELDS }).min(8, 'Password must have at least 8 characters'),
});

const loginSchema = z.object({
    username: requiredString(),
    password: z.string({ error: FILL_ALL_FIELDS }).min(1, FILL_ALL_FIELDS),
});

module.exports = { registerSchema, loginSchema };
