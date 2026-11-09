const session = require('express-session');

const sessionRepository = require('../repositories/sessionRepository');

const CLEANUP_INTERVAL_MS = 1000 * 60 * 15; // 15 min

// Two handlers in one then(): an error thrown by the callback must not call it a second time.
function toCallback(promise, callback) {
    promise.then(
        (result) => callback(null, result),
        (err) => callback(err),
    );
}

// Adapts the callback API that express-session expects to the promise-based repository.
class MysqlSessionStore extends session.Store {
    constructor({ ttlMs, cleanupIntervalMs = CLEANUP_INTERVAL_MS }) {
        super();
        this.ttlMs = ttlMs;

        if (cleanupIntervalMs > 0) {
            // unref() lets the process exit even while this timer is scheduled.
            setInterval(() => this.removeExpired(), cleanupIntervalMs).unref();
        }
    }

    get(sid, callback) {
        const loaded = sessionRepository.findById(sid).then((row) => {
            if (!row || row.expiresAt <= new Date()) return null;
            return JSON.parse(row.data);
        });
        toCallback(loaded, callback);
    }

    set(sid, sess, callback = () => {}) {
        const data = JSON.stringify(sess);
        toCallback(sessionRepository.upsert({ sid, data, expiresAt: this.getExpiry(sess) }), callback);
    }

    touch(sid, sess, callback = () => {}) {
        toCallback(sessionRepository.touch(sid, this.getExpiry(sess)), callback);
    }

    destroy(sid, callback = () => {}) {
        toCallback(sessionRepository.deleteById(sid), callback);
    }

    getExpiry(sess) {
        const expires = sess.cookie?.expires;
        return expires ? new Date(expires) : new Date(Date.now() + this.ttlMs);
    }

    removeExpired() {
        return sessionRepository.deleteExpired(new Date()).catch((err) => {
            console.error('Error removing expired sessions:', err);
        });
    }
}

module.exports = { MysqlSessionStore };
