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
    <>
      <div className="admin-dashboard">
        <div className="dashboard-cards">
          <DashboardCard title="Today's Appointments" count={appointmentsToday} icon={<FaCalendarCheck />} bgColor="#3b82f6" />
          <DashboardCard title="Today's Orders" count={ordersToday} icon={<FaClipboardList />} bgColor="#22c55e" />
          <DashboardCard title="Total Customers" count={totalCustomers} icon={<FaUsers />} bgColor="#8b5cf6" />
        </div>

        <div className="dashboard-graphs">
          <DashboardChart title="Order Reservation Analysis" data={orderAnalysisData} dataKey="orders" />
          <DashboardChart title="Appointment Analysis" data={appointmentAnalysisData} dataKey="appointments" />
        </div>
      </div>

      <style>{`
        .admin-dashboard {
          padding: 0.5rem 1.5rem; /* reduced space at top */
        }

        .dashboard-cards {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .dashboard-graphs {
          display: flex;
          gap: 1.5rem;
        }
      `}</style>
    </>
  );
};

export default AdminDashboard;
