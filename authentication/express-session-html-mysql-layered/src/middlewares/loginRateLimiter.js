const { rateLimit } = require('express-rate-limit');

// Counts only failed attempts, so people who log in normally are never blocked.
// The counters live in memory: they reset on restart and are not shared between servers.
// Behind a reverse proxy, set Express "trust proxy", otherwise every client shares one IP.
const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    limit: 10,
    skipSuccessfulRequests: true,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { message: 'Too many login attempts, try again later' },
});

module.exports = { loginRateLimiter };
