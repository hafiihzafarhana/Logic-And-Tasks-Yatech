const { StatusCodes: status } = require("http-status-codes");

/**
 * Returns a custom response.
 */
function apiResponse(code, responseStatus, message, data, meta) {
  return {
    code,
    status: responseStatus,
    message,
    data,
    meta,
  };
}

/**
 * Returns status code 400.
 */
function apiBadRequestResponse(message) {
  return {
    code: status.BAD_REQUEST,
    status: "BAD_REQUEST",
    message,
  };
}

/**
 * Returns status code 404.
 */
function apiNotFoundResponse(message) {
  return {
    code: status.NOT_FOUND,
    status: "NOT_FOUND",
    message,
  };
}

/**
 * Returns status code 429.
 */
function apiTooManyRequestsResponse(message) {
  return {
    code: status.TOO_MANY_REQUESTS,
    status: "TOO_MANY_REQUESTS",
    message,
  };
}

/**
 * Returns status code 403.
 */
function apiForbiddenResponse(message) {
  return {
    code: status.FORBIDDEN,
    status: "FORBIDDEN",
    message,
  };
}

module.exports = {
  apiResponse,
  apiBadRequestResponse,
  apiNotFoundResponse,
  apiTooManyRequestsResponse,
  apiForbiddenResponse,
};
