class HttpException extends Error {
  constructor(code, status, message) {
    super(message);
    this.code = code;
    this.status = status;
    this.message = message;
  }
}

/**
 * Returns a response with status code 400.
 */
class HttpExceptionBadRequest extends HttpException {
  constructor(message) {
    super(400, "BAD_REQUEST", message);
  }
}

/**
 * Returns a response with status code 401.
 */
class HttpExceptionUnauthorize extends HttpException {
  constructor(message) {
    super(401, "UNAUTHORIZED", message);
  }
}

/**
 * Returns a response with status code 404.
 */
class HttpExceptionNotFound extends HttpException {
  constructor(message) {
    super(404, "NOT_FOUND", message);
  }
}

/**
 * Returns a response with status code 429.
 */
class HttpExceptionTooManyRequests extends HttpException {
  constructor(message) {
    super(429, "TOO_MANY_REQUEST", message);
  }
}

/**
 * Returns a response with status code 403.
 */
class HttpExceptionForbidden extends HttpException {
  constructor(message) {
    super(403, "FORBIDDEN", message);
  }
}

/**
 * Returns a validation error response.
 */
class HttpExceptionValidationError extends HttpException {
  constructor(message) {
    super(422, "UNPROCESSABLE_ENTITY", message);
  }
}

module.exports = {
  HttpException,
  HttpExceptionBadRequest,
  HttpExceptionUnauthorize,
  HttpExceptionNotFound,
  HttpExceptionTooManyRequests,
  HttpExceptionForbidden,
  HttpExceptionValidationError,
};
