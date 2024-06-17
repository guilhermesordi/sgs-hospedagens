const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/database.json');

const getAllCustomers = (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  res.json(data.customers);
};

const createCustomer = (req, res) => {
  const newCustomer = req.body;
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  data.customers.push(newCustomer);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.status(201).json(newCustomer);
};

module.exports = {
  getAllCustomers,
  createCustomer
};
