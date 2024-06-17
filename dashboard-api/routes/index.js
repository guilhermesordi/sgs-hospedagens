const express = require('express');
const router = express.Router();

const staffController = require('../controllers/staffController');
const roomsController = require('../controllers/roomsController');
const bookingsController = require('../controllers/bookingsController');
const customersController = require('../controllers/customersController');
const loginController = require('../controllers/loginController');
const dashboardController = require('../controllers/dashboardController');

// Staff Routes
router.get('/staff', staffController.getAllStaff);
router.post('/staff', staffController.createStaff);
router.put('/staff/:id', staffController.updateStaff);

// Rooms Routes
router.get('/rooms', roomsController.getAllRooms);

// Bookings Routes
router.get('/bookings', bookingsController.getAllBookings);
router.post('/bookings', bookingsController.createBooking);
router.put('/bookings/:id', bookingsController.updateBooking);

// Customers Routes
router.get('/customers', customersController.getAllCustomers);
router.post('/customers', customersController.createCustomer);

// Login Route
router.post('/login', loginController.login);

// Dashboard Route
router.get('/dashboard', dashboardController.getDashboardData);

module.exports = router;
