const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/database.json');

const getAllStaff = (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  res.json(data.staff);
};

const createStaff = (req, res) => {
  const newStaff = req.body;
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  data.staff.push(newStaff);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.status(201).json(newStaff);
};

const updateStaff = (req, res) => {
  const { id } = req.params;
  const updatedStaff = req.body;
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const staffIndex = data.staff.findIndex(staff => staff.id === id);

  if (staffIndex !== -1) {
    data.staff[staffIndex] = { ...data.staff[staffIndex], ...updatedStaff };
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    res.status(200).json(data.staff[staffIndex]);
  } else {
    res.status(404).json({ message: 'Staff not found' });
  }
};

module.exports = {
  getAllStaff,
  createStaff,
  updateStaff
};
