const assert = require('node:assert/strict');
const { describe, it, mock } = require('node:test');

const { InvalidCredentialsError } = require('../errors/AppError');
const { errorHandler } = require('./errorHandler');

function createResponse({ headersSent = false } = {}) {
    const res = { headersSent, status: mock.fn(() => res), json: mock.fn() };
    return res;
}

describe('errorHandler', () => {
    it('sends the status and message of an AppError', () => {
        const res = createResponse();

        errorHandler(new InvalidCredentialsError(), {}, res, mock.fn());

        assert.equal(res.status.mock.calls[0].arguments[0], 401);
        assert.deepEqual(res.json.mock.calls[0].arguments[0], { message: 'Invalid credentials' });
    });

    it('hides the details of an unknown error and logs it', () => {
        const res = createResponse();
        const req = { log: { error: mock.fn() } };
        const err = new Error('secret database details');

        errorHandler(err, req, res, mock.fn());

        assert.equal(res.status.mock.calls[0].arguments[0], 500);
        assert.deepEqual(res.json.mock.calls[0].arguments[0], { message: 'Internal server error' });
        assert.equal(req.log.error.mock.calls[0].arguments[0], err);
    });

    it('passes the error on when the response has already started', () => {
        const res = createResponse({ headersSent: true });
        const next = mock.fn();
        const err = new Error('too late');

        errorHandler(err, {}, res, next);

        assert.equal(next.mock.calls[0].arguments[0], err);
        assert.equal(res.status.mock.callCount(), 0);
    });
});
