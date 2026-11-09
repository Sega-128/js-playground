// Errors that are safe to show to the client. The errorHandler middleware turns them into responses.
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }
}

class ValidationError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}

class UsernameTakenError extends AppError {
    constructor() {
        super('Username already exists', 400);
    }
}

class UserAlreadyExistsError extends AppError {
    constructor() {
        super('Username or email already exists', 400);
    }
}

class InvalidCredentialsError extends AppError {
    constructor() {
        super('Invalid credentials', 401);
    }
}

class NotAuthenticatedError extends AppError {
    constructor() {
        super('Not logged in', 401);
    }
}

module.exports = {
    AppError,
    ValidationError,
    UsernameTakenError,
    UserAlreadyExistsError,
    InvalidCredentialsError,
    NotAuthenticatedError,
};
