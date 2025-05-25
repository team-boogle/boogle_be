const express = require('express');
const loadDictionary = require('./utils/loaddictionary');
const dictionaryRoutes = require('./routes/dictionaryRoutes');
const { setDictionary } = require('./controllers/dictionaryController');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// dictionary loading
const dictionaryPath = './dictionary.txt';
const wordSet = loadDictionary(dictionaryPath);
setDictionary(wordSet);
console.log(`${wordSet.size}개 단어 로딩 완료`);

// routes
app.use('/', dictionaryRoutes);
app.use('/api/users', userRoutes);


// server 
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server ongoing: http://localhost:${PORT}`);
});
