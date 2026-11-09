const { eq } = require('drizzle-orm');

const { db } = require('../db/client');
const { users } = require('../db/schema');
const { UserAlreadyExistsError } = require('../errors/AppError');

function isDuplicateEntry(err) {
    return err.code === 'ER_DUP_ENTRY' || err.cause?.code === 'ER_DUP_ENTRY';
}

async function findByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return user ?? null;
}

async function create({ username, email, password }) {
    try {
        await db.insert(users).values({ username, email, password });
    } catch (err) {
        // The unique indexes also catch a taken email and two simultaneous registrations.
        if (isDuplicateEntry(err)) throw new UserAlreadyExistsError();
        throw err;
    }
}

module.exports = { findByUsername, create };
