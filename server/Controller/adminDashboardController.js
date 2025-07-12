const Appointment = require('../Model/Appointment');
const Pet = require('../Model/Pet');  // your "product" model for orders/adoptions
const User = require('../Model/User');

const getDashboardSummary = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // Count today's appointments
    const todayAppointments = await Appointment.countDocuments({
      createdAt: { $gte: startOfToday, $lte: endOfToday }
    });

    // Count today's new pets added (you can consider these as "orders" or "new pets")
    const todayPetsAdded = await Pet.countDocuments({
      createdAt: { $gte: startOfToday, $lte: endOfToday }
    });

    // Count total customers (users with role 'user')
    const totalCustomers = await User.countDocuments({ role: 'user' });

    // Order (Pet) analysis: last 7 days - group by date
    const orderChart = await Pet.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 7*24*60*60*1000) }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Appointment analysis: last 7 days - group by date
    const appointmentChart = await Appointment.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 7*24*60*60*1000) }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          appointments: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Format data for frontend
    const formattedOrderChart = orderChart.map(item => ({
      date: item._id,
      orders: item.orders
    }));

    const formattedAppointmentChart = appointmentChart.map(item => ({
      date: item._id,
      appointments: item.appointments
    }));

    res.json({
      todayAppointments,
      todayOrders: todayPetsAdded,  // using pets count as "orders"
      totalCustomers,
      orderChart: formattedOrderChart,
      appointmentChart: formattedAppointmentChart,
    });
  } catch (error) {
    console.error('Error in dashboard summary:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getDashboardSummary };
