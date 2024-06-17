const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/database.json');

const getDashboardData = (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const totalStaff = data.staff.length;
  const totalRooms = data.rooms.length;
  const totalBookings = data.bookings.length;
  const totalCustomers = data.customers.length;

  const dashboardData = {
    totalStaff,
    totalRooms,
    totalBookings,
    totalCustomers,
    recentBookings: data.bookings.slice(-5),
    recentCustomers: data.customers.slice(-5)
  };

  res.json(dashboardData);
};

module.exports = {
  getDashboardData
};
