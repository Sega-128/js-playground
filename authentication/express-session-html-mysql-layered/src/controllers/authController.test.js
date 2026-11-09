const assert = require('node:assert/strict');
const { afterEach, beforeEach, describe, it, mock } = require('node:test');

const authService = require('../services/authService');
const authController = require('./authController');

describe('authController.login', () => {
    const user = { username: 'igor', email: 'igor@test.dev' };
    let res;

    beforeEach(() => {
        mock.method(authService, 'login', async () => user);
        res = { json: mock.fn() };
    });

    afterEach(() => {
        mock.restoreAll();
    });

    function createRequest({ saveError = null } = {}) {
        const steps = [];
        const session = {
            regenerate: (callback) => {
                steps.push('regenerate');
                callback();
            },
            save: (callback) => {
                steps.push('save');
                callback(saveError);
            },
        };
        return { req: { body: {}, session }, steps };
    }

    it('regenerates and saves the session before responding', async () => {
        const { req, steps } = createRequest();

        await authController.login(req, res);

        assert.deepEqual(steps, ['regenerate', 'save']);
        assert.deepEqual(req.session.user, user);
        assert.equal(res.json.mock.callCount(), 1);
    });

    it('does not report success when the session cannot be saved', async () => {
        const { req } = createRequest({ saveError: new Error('db is down') });

        await assert.rejects(authController.login(req, res), /db is down/);

        assert.equal(res.json.mock.callCount(), 0);
    });
});
