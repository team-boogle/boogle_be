const {runQuery} = require("../config/db");

const getByEmail = async (email) => {
    const sql = 'SELECT email, nickName, password ' +
    'FROM users WHERE email = ?';

    const result = await runQuery(sql, [email]);
    return result[0];
}

const createUser = async (email, password, nickName) => {
    const sql = 'INSERT INTO users (email, password, nickName) VALUES (?, ?, ?)';
    await runQuery(sql, [email, password, nickName]);
}

module.exports = {
    getByEmail,
    createUser,
};