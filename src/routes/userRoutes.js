const express = require('express');
const router = express.Router();
const verifySession = require('../middleware/authMiddleware');
const ctrl = require('../controllers/userController');

const { getTopRankers } = require('../controllers/userController');
const { updatePassword } = require('../controllers/userController');
const { updateProfile } = require('../controllers/userController');
const { getMyInfo } = require('../controllers/userController');
const { checkAuth } = require('../controllers/userController');
const {updateScore} = require('../controllers/userController')

router.get('/rankings', getTopRankers);

router.patch('/password', verifySession, updatePassword);
router.patch('/profile', verifySession, updateProfile);
router.patch('/score', verifySession, updateScore);
router.get('/me', verifySession, getMyInfo);
router.get('/auth/check', verifySession, checkAuth);


module.exports = router;
