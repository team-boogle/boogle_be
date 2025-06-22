const db = require('../config/db');
const bcrypt = require('bcrypt');
const { UserDAO } = require('../DAO');
const { generatePassword, verifyPassword } = require('../lib/authentication');

// signup
exports.signUp = async (req, res, next) => {
  try {
    const { email, password, nickName } = req.body;

    // 1. 
    // 입력값 검증 v
    if (!email || !password || !nickName) {
      return res.status(400).json({
        success: false,
        message: '이메일, 비밀번호, 닉네임을 모두 입력해야 합니다.'
      });
    }

    // 비밀번호 길이 검증 v
    if (password.length < 6 || password.length >255 ) {
      return res.status(400).json({ success: false, message: '비밀번호는 6자 이상이어야 합니다.' });
    }

    // 닉네임 길이 검증
    if (nickName.length > 50) {
      return res.status(400).json({ success: false, message: '닉네임은 50자 이하로 입력해주세요.' });
    }

    // 2. 중복 사용자 확인
    const existingUser = await UserDAO.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ success: false, message: '이미 사용 중인 이메일입니다.' });
    }

    const existingNick = await UserDAO.findByNickname(nickName);
    if (existingNick) {
      return res.status(409).json({ success: false, message: '이미 사용 중인 닉네임입니다.' });
    }


    const hashedPassword = await generatePassword(password);
    await UserDAO.createUser({
      email,
      password: hashedPassword,
      nickName
    });
  

    return res.status(201).json({ success: true, message: '회원가입 성공!' });
  } catch (err) {
    next(err);  // 자동으로 위 미들웨어로 전달됨
}
};

// login
exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Missing credentials' });

    const user = await UserDAO.getByEmail(email);
    if (!user)
      return res.status(401).json({ success: false, message: 'Invalid email or password' });

    const isValid = await verifyPassword(password, user.password);
    if (!isValid)
      return res.status(401).json({ success: false, message: 'Invalid email or password' });

    req.session.user = { email };

    return res.json({ success: true, message: 'Login success', email: email });

  } catch (err) {
    return next(err);
  }
};