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
router.delete('/admin/appointments/:id', deleteAppointment); // ✅ Correct admin path
router.put('/admin/appointments/:id/status', updateAppointmentStatus); // ✅ Correct admin path

// Public routes
router.post('/appointments', createAppointment);
router.get('/appointments/booked', getBookedSlots);

module.exports = router;
