const express = require('express');

const authController = require('../controllers/authController');
const { loginRateLimiter } = require('../middlewares/loginRateLimiter');
const { requireAuth } = require('../middlewares/requireAuth');
const { validate } = require('../middlewares/validate');
const { loginSchema, registerSchema } = require('../validation/authSchemas');

const router = express.Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', loginRateLimiter, validate(loginSchema), authController.login);
router.get('/profile', requireAuth, authController.profile);
router.post('/logout', authController.logout);

module.exports = router;
