import React from 'react'
import AdminNavBar from "./AdminNavBar";
import AdminFooter from "./AdminFooter";
import AdminScreen from './AdminScreen';
import DashboardCard from './Dashboard/DashboardCard';
import DashboardChart from './Dashboard/DashboardChart';

const AdminPanel = () => {
  return (
    <div>
      <AdminNavBar/>
      <AdminScreen/>
      <DashboardCard/>
      <DashboardChart/>
      <AdminFooter/>
    </div>
  )
}

export default AdminPanel
