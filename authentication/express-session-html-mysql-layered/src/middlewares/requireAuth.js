const { NotAuthenticatedError } = require('../errors/AppError');

function requireAuth(req, res, next) {
    if (!req.session?.user) {
        throw new NotAuthenticatedError();
    }
    next();
}

module.exports = { requireAuth };
