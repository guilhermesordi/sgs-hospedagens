const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/database.json');

const login = (req, res) => {
  const { username, password } = req.body;
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const user = data.staff.find(staff => staff.username === username && staff.password === password);

  if (user) {
    res.status(200).json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
};

module.exports = {
  login
};
