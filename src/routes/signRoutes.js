const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const ctrl = require('../controllers/signController');


// signup, login
router.post('/sign_up', ctrl.signUp);
router.post('/sign_in', ctrl.signIn);

module.exports = router;