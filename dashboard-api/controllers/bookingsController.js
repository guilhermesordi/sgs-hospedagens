const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/database.json');

const getAllBookings = (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  res.json(data.bookings);
};

const createBooking = (req, res) => {
  const newBooking = req.body;
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  data.bookings.push(newBooking);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.status(201).json(newBooking);
};

const updateBooking = (req, res) => {
  const { id } = req.params;
  const updatedBooking = req.body;
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const bookingIndex = data.bookings.findIndex(booking => booking.id === parseInt(id, 10));

  if (bookingIndex !== -1) {
    data.bookings[bookingIndex] = { ...data.bookings[bookingIndex], ...updatedBooking };
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    res.status(200).json(data.bookings[bookingIndex]);
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
};

module.exports = {
  getAllBookings,
  createBooking,
  updateBooking
};
