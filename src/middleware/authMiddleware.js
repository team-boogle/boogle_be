const verifySession = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ success: false, message: '로그인이 필요합니다.' });
  }

  req.user = req.session.user;  
  next();
};

module.exports = verifySession;
