const Appointment = require('../Model/Appointment');

// ✅ GET all appointments (admin)
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ CREATE appointment with availability check
exports.createAppointment = async (req, res) => {
  try {
    const { date, timeSlot } = req.body;

    const existing = await Appointment.findOne({ date, timeSlot });
    if (existing) {
      return res.status(400).json({
        message: 'This time slot is already booked. Please choose another.'
      });
    }

    const newAppointment = new Appointment(req.body);
    await newAppointment.save();

    res.json({ message: 'Appointment booked successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET booked time slots for a given date
exports.getBookedSlots = async (req, res) => {
  try {
    const { date } = req.query;
    const appointments = await Appointment.find({ date });
    const bookedSlots = appointments.map(a => a.timeSlot);
    res.json(bookedSlots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
