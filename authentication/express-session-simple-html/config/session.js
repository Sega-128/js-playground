const isProd = process.env.NODE_ENV === 'production';

const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'mysecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24, // 1d
  },
};

module.exports = sessionOptions;