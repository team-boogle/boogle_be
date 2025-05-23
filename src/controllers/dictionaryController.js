let wordSet = new Set(); 

function setDictionary(set) {
  wordSet = set;
}

function checkWord(req, res) {
  const { word } = req.body;
  if (!word) {
    return res.status(400).json({ success: false, message: 'require valid word.' });
  }

  const isValid = wordSet.has(word);
  res.json({ success: true, isValid });
}

module.exports = {
  checkWord,
  setDictionary
};
