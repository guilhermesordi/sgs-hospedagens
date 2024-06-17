const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/database.json');

const getAllRooms = (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  res.json(data.rooms);
};

module.exports = {
  getAllRooms
};
