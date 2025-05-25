const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');

const { getTopRankers } = require('../controllers/userController');
const { updatePassword } = require('../controllers/userController');
const { updateProfile } = require('../controllers/userController');
const { getMyInfo } = require('../controllers/userController');

router.get('/rankings', getTopRankers);
router.patch('/password', verifyToken, updatePassword);
router.patch('/profile', verifyToken, updateProfile);
router.get('/me', verifyToken, getMyInfo);


module.exports = router;
