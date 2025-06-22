const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const ctrl = require('../controllers/userController');

const { getTopRankers } = require('../controllers/userController');
const { updatePassword } = require('../controllers/userController');
const { updateProfile } = require('../controllers/userController');
const { getMyInfo } = require('../controllers/userController');
const { checkAuth } = require('../controllers/userController');

router.get('/rankings', getTopRankers);
router.patch('/password', verifyToken, updatePassword);
router.patch('/profile', verifyToken, updateProfile);
router.get('/me', verifyToken, getMyInfo);
router.get('/auth/check', verifyToken, checkAuth);


module.exports = router;
