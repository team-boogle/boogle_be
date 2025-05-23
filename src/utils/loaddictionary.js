const path = require('path');
const fs = require('fs');

function loadDictionary() {
  const dictionaryPath = path.join(__dirname, '../dictionary.txt'); 
  const wordSet = new Set();
  const lines = fs.readFileSync(dictionaryPath, 'utf-8').split('\n');

  lines.forEach(line => {
    const word = line.trim();
    if (word) wordSet.add(word);
  });

  return wordSet;
}

module.exports = loadDictionary;
