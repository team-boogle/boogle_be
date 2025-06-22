const express = require('express');
const cors = require('cors');
const session = require('express-session');
const loadDictionary = require('./utils/loaddictionary');
const dictionaryRoutes = require('./routes/dictionaryRoutes');
const { setDictionary } = require('./controllers/dictionaryController');
const userRoutes = require('./routes/userRoutes');
const signRoutes = require('./routes/signRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',  // 프론트엔드가 구동 중인 주소
  credentials: true                 // 필요 시, 쿠키/세션도 허용
}));

app.use(express.json());

// ✅ 세션 설정
app.use(session({
  secret: process.env.SESSION_SECRET || 'my-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // HTTPS가 아니라면 false
    maxAge: 1000 * 60 * 60 * 2, // 2시간
  },
}));

//app.use('/api', userRoutes);

// dictionary loading
const dictionaryPath = './dictionary.txt';
const wordSet = loadDictionary(dictionaryPath);
setDictionary(wordSet);
console.log(`${wordSet.size}개 단어 로딩 완료`);

// routes
app.use('/', dictionaryRoutes);
app.use('/api/users', userRoutes);
app.use('/api', signRoutes);

// 공통 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error('💥 에러 발생:', err.stack);
  res.status(500).json({ success: false, message: '서버 내부 오류 발생' });
});

// server 
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server ongoing: http://localhost:${PORT}`);
});