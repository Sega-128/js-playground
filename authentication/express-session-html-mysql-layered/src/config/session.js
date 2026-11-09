const env = require('./env');
const { MysqlSessionStore } = require('../sessions/mysqlSessionStore');

const SESSION_COOKIE_NAME = 'sid';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24; // 1d

const sessionOptions = {
    name: SESSION_COOKIE_NAME,
    secret: env.SESSION_SECRET,
    store: new MysqlSessionStore({ ttlMs: SESSION_TTL_MS }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: SESSION_TTL_MS,
    },
};

module.exports = { SESSION_COOKIE_NAME, sessionOptions };
