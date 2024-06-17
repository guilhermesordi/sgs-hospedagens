const { db } = require('../db');

const login = (req, res) => {
  const user = req.body;

  db.one('SELECT * FROM staff WHERE username = $1 AND password = $2 AND active = TRUE', [user.username, user.password])
    .then((data) => {
      res.status(200).json({ message: 'Login successful', user: data });
    })
    .catch((error) => {
      res.status(401).json({ message: 'Invalid username or password' });
    });
};

module.exports = {
  login,
};
