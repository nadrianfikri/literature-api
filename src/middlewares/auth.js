const jwt = require('jsonwebtoken');

// create middleware for authentication
exports.auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY);

    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid token' });
  }
};

// create middleware for admin access
exports.adminOnly = (req, res, next) => {
  if (req.user.role && req.user.role === 'admin') {
    next();
    return;
  }
  res.status(403).send({ message: 'Forbidden' });
};
