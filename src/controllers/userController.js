const db = require('../config/db');
const { UserDAO } = require('../DAO');
const { generatePassword, verifyPassword } = require('../lib/authentication');

// 회원가입 처리
exports.signUp = async (req, res, next) => {
  try {
    const { email, password, nickName } = req.body;

    if (
      !email ||
      !password ||
      !nickName 
    ) {
      return res.status(400).json({ success: false, message: 'Invalid input' });
    }

    const hashedPassword = await generatePassword(password);
    await UserDAO.createUser(email, hashedPassword, nickName);
  

    return res.status(201).json({ success: true, message: 'User registered' });
  } catch (err) {
    return next(err);
  }
};

// 로그인 처리
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