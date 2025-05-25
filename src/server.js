const express = require('express');
const cors = require('cors');
const loadDictionary = require('./utils/loaddictionary');
const dictionaryRoutes = require('./routes/dictionaryRoutes');
const { setDictionary } = require('./controllers/dictionaryController');

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', // Next.js 프론트엔드 주소
  methods: ['POST', 'GET'],    // 허용할 HTTP 메소드
  allowedHeaders: ['Content-Type'], // 허용할 요청 헤더
  credentials: true // 만약 쿠키나 인증 헤더를 주고받는다면 필요
};

app.use(cors(corsOptions));
// dictionary loading
const dictionaryPath = './dictionary.txt';
const wordSet = loadDictionary(dictionaryPath);
setDictionary(wordSet);
console.log(`${wordSet.size}개 단어 로딩 완료`);

// routes
app.use('/', dictionaryRoutes);

// server 
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`server ongoing: http://localhost:${PORT}`);
});
