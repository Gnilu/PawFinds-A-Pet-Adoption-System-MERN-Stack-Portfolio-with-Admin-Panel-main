const express = require('express');
const router = express.Router();
const {
  getAppointments,
  deleteAppointment,
  updateAppointmentStatus,
  createAppointment,
  getBookedSlots
} = require('../Controller/appointmentController');

// Admin routes
router.get('/appointments', getAppointments);
router.delete('/appointments/:id', deleteAppointment);
router.put('/appointments/:id/status', updateAppointmentStatus);

// Public routes
router.post('/appointments', createAppointment);
router.get('/appointments/booked', getBookedSlots);

module.exports = router;
