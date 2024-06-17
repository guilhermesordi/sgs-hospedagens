const { db } = require('../db');

const getAllStaff = (req, res) => {
  db.manyOrNone('SELECT * FROM staff')
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
};

const createStaff = (req, res) => {
  const newStaff = req.body;

  db.none('INSERT INTO staff(name, username, password, active, roles) VALUES($1, $2, $3, $4, $5)', [
    newStaff.name,
    newStaff.username,
    newStaff.password,
    true,
    ['ADMIN'],
  ])
    .then((data) => {
      res.status(201).json({ ...newStaff, active: true, roles: ['ADMIN'] });
    })
    .catch((error) => {
      res.status(422).json(error);
    });
};

const updateStaff = (req, res) => {
  const { id } = req.params;
  const updatedStaff = req.body;

  db.none('UPDATE staff SET update_tmz = $1, name = $2, username = $3, password = $4, active = $5 WHERE id = $6', [
    new Date().toISOString(),
    updatedStaff.name,
    updatedStaff.username,
    updatedStaff.password,
    updatedStaff.active,
    id,
  ])
    .then((data) => {
      res.status(201).json({ ...updatedStaff });
    })
    .catch((error) => {
      res.status(422).json(error);
    });
};

module.exports = {
  getAllStaff,
  createStaff,
  updateStaff,
};
