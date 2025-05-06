const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const wordSet = new Set();

const dictionaryPath = './dictionary.txt'; 
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server ongoing: http://localhost:${PORT}`);
});
