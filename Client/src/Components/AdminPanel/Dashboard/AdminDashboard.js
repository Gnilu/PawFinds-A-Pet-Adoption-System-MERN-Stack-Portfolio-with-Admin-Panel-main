import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardCard from './DashboardCard';
import DashboardChart from './DashboardChart';
import { FaCalendarCheck, FaClipboardList, FaUsers } from 'react-icons/fa';

const AdminDashboard = () => {
  const [appointmentsToday, setAppointmentsToday] = useState(0);
  const [ordersToday, setOrdersToday] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [orderAnalysisData, setOrderAnalysisData] = useState([]);
  const [appointmentAnalysisData, setAppointmentAnalysisData] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/dashboard-summary')
      .then(res => {
        const data = res.data;
        setAppointmentsToday(data.todayAppointments);
        setOrdersToday(data.todayOrders);
        setTotalCustomers(data.totalCustomers);
        setOrderAnalysisData(data.orderChart);
        setAppointmentAnalysisData(data.appointmentChart);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-cards">
        <DashboardCard title="Today's Appointments" count={appointmentsToday} icon={<FaCalendarCheck />} bgColor="bg-blue-500" />
        <DashboardCard title="Today's Orders" count={ordersToday} icon={<FaClipboardList />} bgColor="bg-green-500" />
        <DashboardCard title="Total Customers" count={totalCustomers} icon={<FaUsers />} bgColor="bg-purple-500" />
      </div>

      <div className="dashboard-graphs">
        <DashboardChart title="Order Reservation Analysis" data={orderAnalysisData} dataKey="orders" />
        <DashboardChart title="Appointment Analysis" data={appointmentAnalysisData} dataKey="appointments" />
      </div>

      <style>{`
      .admin-dashboard {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dashboard-cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .dashboard-cards {
    flex-direction: row;
  }
}

.dashboard-graphs {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .dashboard-graphs {
    flex-direction: row;
  }
}

      `}</style>
    </div>
  );
};

export default AdminDashboard;
