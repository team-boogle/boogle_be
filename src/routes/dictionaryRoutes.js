const express = require('express');
const router = express.Router();
const { checkWord } = require('../controllers/dictionaryController');

router.post('/check-word', checkWord);

module.exports = router;
