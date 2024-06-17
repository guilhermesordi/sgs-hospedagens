const { db } = require('../db');

const getAllBookings = (req, res) => {
  db.manyOrNone('SELECT * FROM bookings')
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
};

const createBooking = (req, res) => {
  const newBooking = req.body;

  db.none(
    'INSERT INTO bookings(num_people, checkin_date, checkout_date, status, total_amount, customer, room) VALUES($1, $2, $3, $4, $5, $6, $7)',
    [
      newBooking.numPeople,
      newBooking.checkinDate,
      newBooking.checkoutDate,
      newBooking.status,
      newBooking.totalAmount,
      newBooking.customer,
      newBooking.room,
    ],
  )
    .then((data) => {
      res.status(201).json({ ...newBooking });
    })
    .catch((error) => {
      res.status(422).json(error);
    });
};

const updateBooking = (req, res) => {
  const { id } = req.params;
  const updatedBooking = req.body;

  db.none(
    'UPDATE bookings SET updated_tmz = $1, num_people = $2, checkin_date = $3, checkout_date = $4, status = $5, total_amount = $6, customer = $7, room = $8 WHERE id = $9',
    [
      new Date().toISOString(),
      updatedBooking.numPeople,
      updatedBooking.checkinDate,
      updatedBooking.checkoutDate,
      updatedBooking.status,
      updatedBooking.totalAmount,
      updatedBooking.customer,
      updatedBooking.room,
      id,
    ],
  )
    .then((data) => {
      res.status(201).json({ ...updatedBooking });
    })
    .catch((error) => {
      res.status(422).json(error);
    });
};

module.exports = {
  getAllBookings,
  createBooking,
  updateBooking,
};
