const assert = require('node:assert/strict');
const { afterEach, beforeEach, describe, it, mock } = require('node:test');
const { promisify } = require('node:util');

const sessionRepository = require('../repositories/sessionRepository');
const { MysqlSessionStore } = require('./mysqlSessionStore');

describe('MysqlSessionStore', () => {
    const HOUR = 1000 * 60 * 60;
    const inOneHour = () => new Date(Date.now() + HOUR).toISOString();
    let rows;
    let store;
    let get;
    let set;
    let touch;
    let destroy;

    // Replace the repository functions, so no database is needed.
    beforeEach(() => {
        rows = new Map();
        mock.method(sessionRepository, 'findById', async (sid) => rows.get(sid) ?? null);
        mock.method(sessionRepository, 'upsert', async (row) => {
            rows.set(row.sid, row);
        });
        mock.method(sessionRepository, 'touch', async (sid, expiresAt) => {
            rows.get(sid).expiresAt = expiresAt;
        });
        mock.method(sessionRepository, 'deleteById', async (sid) => {
            rows.delete(sid);
        });
        mock.method(sessionRepository, 'deleteExpired', async (now) => {
            for (const [sid, row] of rows) {
                if (row.expiresAt <= now) rows.delete(sid);
            }
        });

        store = new MysqlSessionStore({ ttlMs: HOUR, cleanupIntervalMs: 0 });
        get = promisify(store.get.bind(store));
        set = promisify(store.set.bind(store));
        touch = promisify(store.touch.bind(store));
        destroy = promisify(store.destroy.bind(store));
    });

    afterEach(() => {
        mock.restoreAll();
    });

    it('returns a session that was saved', async () => {
        const sess = { cookie: { expires: inOneHour() }, user: { username: 'igor' } };

        await set('a', sess);

        assert.deepEqual(await get('a'), sess);
    });

    it('returns nothing for an unknown session', async () => {
        assert.equal(await get('missing'), null);
    });

    it('does not return an expired session', async () => {
        await set('a', { cookie: { expires: new Date(Date.now() - HOUR).toISOString() } });

        assert.equal(await get('a'), null);
    });

    it('uses the ttl when the cookie has no expiry', async () => {
        await set('a', { cookie: {} });

        assert.ok(rows.get('a').expiresAt > new Date());
    });

    it('extends the expiry on touch', async () => {
        await set('a', { cookie: { expires: inOneHour() } });
        const later = new Date(Date.now() + 2 * HOUR);

        await touch('a', { cookie: { expires: later.toISOString() } });

        assert.deepEqual(rows.get('a').expiresAt, later);
    });

    it('removes a destroyed session', async () => {
        await set('a', { cookie: { expires: inOneHour() } });

        await destroy('a');

        assert.equal(await get('a'), null);
    });

    it('removes only expired sessions during cleanup', async () => {
        await set('old', { cookie: { expires: new Date(Date.now() - HOUR).toISOString() } });
        await set('new', { cookie: { expires: inOneHour() } });

        await store.removeExpired();

        assert.deepEqual([...rows.keys()], ['new']);
    });

    it('passes malformed session data to the callback as an error', async () => {
        rows.set('a', { sid: 'a', data: '{oops', expiresAt: new Date(Date.now() + HOUR) });

        await assert.rejects(get('a'), SyntaxError);
    });

    it('passes repository errors to the callback', async () => {
        sessionRepository.findById.mock.mockImplementation(async () => {
            throw new Error('db is down');
        });

        await assert.rejects(get('a'), /db is down/);
    });
});
