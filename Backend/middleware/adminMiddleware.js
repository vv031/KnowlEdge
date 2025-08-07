const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
  // console.log(req); // debug
  if (!req.headers.xauth) {
    return res.status(403).send({ message: 'Access denied: No token provided' });
  }

  const cookies = req.headers.xauth.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.split('=').map(c => c.trim());
    acc[name] = value;
    return acc;
  }, {});

  const token = cookies.jwt;

  if (!token) {
    return res.status(403).send({ message: 'Access denied: No token provided' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: 'Access denied: Invalid token' });
    }

    if (!decoded.admin) {
      return res.status(403).send({ message: 'Access denied: Admins only' });
    }

    next();
  });
};

module.exports = isAdmin;
