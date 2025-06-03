const jwt = require('jsonwebtoken');

const auth = function (req, res, next) {
  // const token = req.headers.authorization?.replace('Bearer ', '');
  const token = req.header('Authorization')?.replace('Bearer ', '');

  console.log('Raw token:', token); // Debug log

  if (!token) return res.status(401).json({ msg: 'No token, access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded payload:', decoded); // Debug log
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      // Token expired, send specific error
      return res.status(401).json({ msg: 'Token expired' });
    }
    console.error('Token verification failed:', err);
    res.status(401).json({ msg: 'Invalid token' });
  }
};
module.exports = auth;




