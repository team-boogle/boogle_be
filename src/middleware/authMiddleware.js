const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: '인증 토큰이 필요합니다.' });
  }

  try {
    const decoded = jwt.verify(token, 'SECRET_KEY'); // 향후 .env로 분리
    req.user = decoded; // req.user에 사용자 정보 저장
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: '유효하지 않은 토큰입니다.' });
  }
};

module.exports = verifyToken;
