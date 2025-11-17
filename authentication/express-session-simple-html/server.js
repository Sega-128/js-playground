require('dotenv').config();
const express = require('express');
const path = require('node:path');
const session = require('express-session');
const pinoHttp = require('pino-http');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db = require('./db');
const loggerOptions = require('./config/logger');
const sessionOptions = require('./config/session');
const { requireAuth } = require('./middlewares/auth');

const app = express();

const PUBLIC_DIR = path.join(__dirname, 'public');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(
  pinoHttp( loggerOptions)
);
app.use(session(sessionOptions));
app.use(express.static(PUBLIC_DIR, { index: 'index.html', maxAge: '1d' }));

app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password){
        return res.status(400).json({ message: 'Fill all fields' });
    } 
    if (await db.findUserByUsername(username)){
        return res.status(400).json({ message: 'Username already exists' });
    } 
    const hashedPassword = await bcrypt.hash(password, 2);
    await db.addUser({ username, email, password: hashedPassword });
    res.json({ ok: true });
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Fill all fields' });
    const user = await db.findUserByCredentials(username);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) return res.status(401).json({ message: 'Invalid credentials' });
    req.session.user = { username: user.username, email: user.email };
    res.json({ ok: true });
});

app.get('/api/profile', requireAuth, (req, res) => {
    // check in middleware requireAuth 👇🏻
    // if (!req.session.user) return res.status(401).json({ message: 'Not logged in' });
    res.json(req.session.user);
});

app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: 'Logout error' });
        res.json({ ok: true });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
