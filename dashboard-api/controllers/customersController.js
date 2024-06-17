const { db } = require('../db');

const getAllCustomers = (req, res) => {
  db.manyOrNone('SELECT * FROM customers')
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
};

const createCustomer = (req, res) => {
  const newCustomer = req.body;

  db.none('INSERT INTO customers(id, name, date_of_birth, email, cellphone) VALUES($1, $2, $3, $4, $5)', [
    newCustomer.id,
    newCustomer.name,
    newCustomer.dateOfBirth,
    newCustomer.email,
    newCustomer.cellphone,
  ])
    .then((data) => {
      res.status(201).json({ ...newCustomer });
    })
    .catch((error) => {
      res.status(422).json(error);
    });
};

module.exports = {
  getAllCustomers,
  createCustomer,
};
