const path = require('node:path');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const pinoHttp = require('pino-http');

const env = require('./config/env');
const loggerOptions = require('./config/logger');
const { sessionOptions } = require('./config/session');
const { errorHandler } = require('./middlewares/errorHandler');
const authRoutes = require('./routes/authRoutes');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const app = express();

// The logger comes first, so every request is logged and req.log exists for later middleware.
app.use(pinoHttp(loggerOptions));
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static files come before the session, so they do not cause database queries.
app.use(express.static(PUBLIC_DIR, { index: 'index.html', maxAge: '1d' }));
app.use(session(sessionOptions));

app.use('/api', authRoutes);

app.use(errorHandler);

module.exports = app;
