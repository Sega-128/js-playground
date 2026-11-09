const { eq, lte } = require('drizzle-orm');

const { db } = require('../db/client');
const { sessions } = require('../db/schema');

async function findById(sid) {
    const [session] = await db.select().from(sessions).where(eq(sessions.sid, sid)).limit(1);
    return session ?? null;
}

async function upsert({ sid, data, expiresAt }) {
    await db
        .insert(sessions)
        .values({ sid, data, expiresAt })
        .onDuplicateKeyUpdate({ set: { data, expiresAt } });
}

async function touch(sid, expiresAt) {
    await db.update(sessions).set({ expiresAt }).where(eq(sessions.sid, sid));
}

async function deleteById(sid) {
    await db.delete(sessions).where(eq(sessions.sid, sid));
}

async function deleteExpired(now) {
    await db.delete(sessions).where(lte(sessions.expiresAt, now));
}

module.exports = { findById, upsert, touch, deleteById, deleteExpired };
