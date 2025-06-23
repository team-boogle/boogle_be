const db = require('../config/db');
const bcrypt = require('bcrypt');

// checkauth
exports.checkAuth = (req, res) => {
  return res.status(200).json({
    success: true,
    message: '로그인된 상태입니다.',
    user: req.user, // 필요시 프론트에 제공
  });
};

//gettoprankers, updatepassword, editprofile

//TOP 10 RANKING, return [email, nickname, image, score] 
exports.getTopRankers = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT email, nickname, profile_image, max_score 
       FROM users 
       ORDER BY max_score DESC 
       LIMIT 10`
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error(' ranking check failed:', error);
    res.status(500).json({ success: false, message: 'server erorr' });
  }
};

//CHANGING PASSWORD
exports.updatePassword = async (req, res) => {
  const { newPassword } = req.body;
  const email = req.user.email;  //jwt token 배열 관리 

  if (!newPassword) {
    return res.status(400).json({ success: false, message: '새 비밀번호가 필요합니다.' });
  }

  try {
    const hashed = await bcrypt.hash(newPassword, 10);

    const [result] = await db.execute(
      'UPDATE users SET password = ? WHERE email = ?',
      [hashed, email]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
    }

    res.json({ success: true, message: '비밀번호가 변경되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: '서버 오류' });
  }
};

//Editing profile (icon, backgroundcolor, nickname)
exports.updateProfile = async (req, res) => {
  const { nickname, bg_color, profile_image } = req.body;
  const email = req.user?.email; // 로그인된 유저 이메일

  if (!email) {
    return res.status(401).json({ success: false, message: '인증이 필요합니다.' });
  }

  if (!nickname || !bg_color || !profile_image) {
    return res.status(400).json({ success: false, message: '모든 항목이 필요합니다.' });
  }

  try {
    const [result] = await db.execute(
      'UPDATE users SET nickname = ?, bg_color = ?, profile_image = ? WHERE email = ?',
      [nickname, bg_color, profile_image, email]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
    }

    res.json({ success: true, message: '프로필이 수정되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: '서버 오류' });
  }
};


exports.getMyInfo = async (req, res) => {
  const { email } = req.user; 
  
  try {
    const [rows] = await db.execute(
      'SELECT email, nickname, profile_image, bg_color, max_score FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: '사용자 정보를 찾을 수 없습니다.' });
    }

    res.json({ success: true, user: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: '서버 오류' });
  }
};

exports.updateScore = async (req, res) => {
  const { score } = req.body;
  const email = req.user.email; 

  if (typeof score !== 'number') {
    return res.status(400).json({ success: false, message: 'score는 숫자여야 합니다.' });
  }

  try {
    const [rows] = await db.execute(
      'SELECT max_score FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
    }

    const currentMax = rows[0].max_score;

    if (score > currentMax) {
      await db.execute(
        'UPDATE users SET max_score = ? WHERE email = ?',
        [score, email]
      );
    }

    return res.json({ success: true, message: '점수 기록 처리 완료' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: '서버 오류' });
  }
};
