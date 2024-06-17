const { db } = require('../db');

const getDashboardData = async (req, res) => {
  let staffData = [];
  let roomsData = [];
  let bookingsData = [];
  let customersData = [];
  let totalRevenue = 0;

  await db.manyOrNone('SELECT * FROM staff').then((data) => {
    staffData = data;
  });
  await db.manyOrNone('SELECT * FROM rooms').then((data) => {
    roomsData = data;
  });
  await db.manyOrNone('SELECT * FROM bookings').then((data) => {
    bookingsData = data;
  });
  await db.manyOrNone('SELECT * FROM customers').then((data) => {
    customersData = data;
  });
  await db.manyOrNone('SELECT sum(total_amount) FROM bookings').then((data) => {
    totalRevenue = data[0].sum;
  });

  const totalStaff = staffData.length;
  const totalRooms = roomsData.length;
  const totalBookings = bookingsData.length;
  const totalCustomers = customersData.length;

  const dashboardData = {
    totalStaff,
    totalRooms,
    totalBookings,
    totalCustomers,
    totalRevenue,
    recentBookings: bookingsData.slice(-5),
    recentCustomers: customersData.slice(-5),
  };

  res.json(dashboardData);
};

module.exports = {
  getDashboardData,
};
