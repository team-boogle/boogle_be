const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/userController');

// 회원가입 API
router.post('/sign_up', ctrl.signUp);

// 로그인 API
router.post('/sign_in', ctrl.signIn);

module.exports = router;