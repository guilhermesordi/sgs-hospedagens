const { db } = require('../db');

const getAllRooms = async (req, res) => {
  db.manyOrNone('SELECT * FROM rooms')
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
};

module.exports = {
  getAllRooms,
};
