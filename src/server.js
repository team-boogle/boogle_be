import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); //json 형식 요청 처리 -> req.body에 { user_id: 'user1', user_pwd: 'pass1'} 형태로 파싱
app.use(express.urlencoded({ extended: false }));   // form 요청 처리 -> req.body에 { user_id: 'user1', user_pwd: 'pass1'} 형태로 파싱

// 가짜 DB
// TODO : DB 생성 후 연결
const users = [{ id: 'user1', password: 'pass1' }];

// 로그인
app.post('/api/login', (req, res) => {
    //front에서 사용자 정보 넘겨줄 때 키를 user_id, user_pwd로 준다고 가정
    //front key name에 따라 user_id, user.pwd 변경
    const id = req.body.user_id;
    const password = req.body.user_pwd;

    const user = users.find(u => u.id === id && u.password === password);
    
    if (user) {
        res.status(200).json({ success: true, message: '로그인 성공', user: { id } });
    } else {
        res.status(401).json({ success: false, message: '아이디 또는 비밀번호가 틀렸습니다' });
    }
});

//단어 관련 코드
const wordSet = new Set();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dictionaryPath = join(__dirname, 'dictionary.txt');
const lines = fs.readFileSync(dictionaryPath, 'utf-8').split('\n');
lines.forEach(line => {
  const word = line.trim();
  if (word) {
    wordSet.add(word);
  }
});

console.log(`✅ ${wordSet.size}개 단어 로딩 완료`);

// 단어 유효성 검사
app.post('/check-word', (req, res) => {
  const { word } = req.body;
  
  if (!word) {
    return res.status(400).json({ success: false, message: 'require valid word.' });
  }

  const isValid = wordSet.has(word);
  res.json({ success: true, isValid });
});

// test case와 실행 구분
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
      console.log(`server ongoing: http://localhost:${PORT}`);
  });
}

export default app;