const {runQuery} = require("../config/db");

const getByEmail = async (email) => {
    const sql = 'SELECT email, nickname, password, bg_color, profile_image, max_score ' +
    'FROM users WHERE email = ?';

    const result = await runQuery(sql, [email]);
    return result[0];
}

const findByNickname = async (nickName) => {
  const [rows] = await runQuery('SELECT * FROM users WHERE nickname = ?', [nickName]);
  return rows;
};

const findByEmail = async (email) => {
  const [rows] = await runQuery('SELECT * FROM users WHERE email = ?', [email]);
  return rows;
};

const createUser = async (user) => {
    const sql = 'INSERT INTO users (email, password, nickName) VALUES (?, ?, ?)';
    await runQuery(sql, [user.email, user.password, user.nickName]);
}

module.exports = {
    getByEmail,
    findByNickname,
    findByEmail,
    createUser,
};