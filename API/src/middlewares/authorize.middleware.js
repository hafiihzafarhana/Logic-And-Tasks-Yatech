const { HttpExceptionForbidden } = require("./../exception/httpException");

const authorize = (requiredRole) => {
  return (req, res, next) => {
    const user = req.user;
    // condition of role can access
    if (!Array.isArray(requiredRole)) {
      if (!user || user?.role_id !== requiredRole)
        throw new HttpExceptionForbidden(
          "You do not have permission to access this resource - string"
        );
    } else if (Array.isArray(requiredRole)) {
      if (!requiredRole.includes(req.user?.role_id))
        throw new HttpExceptionForbidden(
          "You do not have permission to access this resource - array"
        );
    }

    next();
  };
};

module.exports = authorize;
