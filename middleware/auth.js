const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // check if token exists
  if (!token) {
    return res.status(401).json({
      message: '토큰이 없습니다',
    });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({
      message: '잘못된 토큰 정보입니다',
    });
  }
};
