module.exports = (...allowed) => {
  const isAllowed = (role) => allowed.indexOf(role) > -1;

  // return a middleware
  return (request, response, next) => {
    if (request.decoded && isAllowed(request.decoded.role)) {
      next();
    } else {
      response.status(403).json({ message: 'Forbidden' }); // user is forbidden
    }
  };
};
