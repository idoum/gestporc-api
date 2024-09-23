const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const tokenOrigin = req.headers['authorization'];
  const token = tokenOrigin.replace("Bearer ", "");
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!', err, token });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
