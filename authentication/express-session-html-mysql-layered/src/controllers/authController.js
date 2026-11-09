const { SESSION_COOKIE_NAME } = require('../config/session');
const authService = require('../services/authService');

function regenerateSession(req) {
    return new Promise((resolve, reject) => {
        req.session.regenerate((err) => (err ? reject(err) : resolve()));
    });
}

function saveSession(req) {
    return new Promise((resolve, reject) => {
        req.session.save((err) => (err ? reject(err) : resolve()));
    });
}

function destroySession(req) {
    return new Promise((resolve, reject) => {
        req.session.destroy((err) => (err ? reject(err) : resolve()));
    });
}

// HTTP only. This is the one layer that touches req, res and the session.
async function register(req, res) {
    await authService.register(req.body);
    res.json({ ok: true });
}

async function login(req, res) {
    const user = await authService.login(req.body);
    // A new session id on login protects against session fixation.
    await regenerateSession(req);
    req.session.user = user;
    // Save before responding, so we never report success for a session that was not stored.
    await saveSession(req);
    res.json({ ok: true });
}

function profile(req, res) {
    res.json(req.session.user);
}

async function logout(req, res) {
    await destroySession(req);
    res.clearCookie(SESSION_COOKIE_NAME);
    res.json({ ok: true });
}

module.exports = { register, login, profile, logout };
