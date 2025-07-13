import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
//import PostingPets from './PostingPets'
// import AdoptingRequests from './AdoptingRequests'
// import AdoptedHistory from './AdoptedHistory'
// import ApprovedRequests from './ApprovedRequests'
import AdminCreateArticle from './AdminCreateArticle'
import AdminDashboard from './Dashboard/AdminDashboard'
import AdminAppointments from './Appointment'
import AdminOrders from './AdminOrders'
import AdminCustomers from './AdminCustomer'
import AdminManagement from './AdminManagement'
import Items from './AdminItemManagement'


const AdminScreen = () => {
  const [screen, setScreen] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <div>
       {/* Menu icon for small devices */}
      <div className="admin-menu-toggle">
        <button onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

    <div className='admin-screen-container'>
      <div className={`admin-screen-left ${menuOpen ? 'open' : ''}`}>
        <div>
          <p onClick={() => {setScreen('dashboard'); setMenuOpen(false);}}>Dashboard</p>
          <p onClick={() => { setScreen('appointment'); setMenuOpen(false); }}>Appointments</p>
          <p onClick={() => { setScreen('orders'); setMenuOpen(false); }}>Orders Reservation</p>
          <p onClick={() => { setScreen('items'); setMenuOpen(false); }}>Add Items</p>
          {/* <p onClick={() => setScreen('approvedRequests')}>Approved Pets</p>
          <p onClick={() => setScreen('adoptingPet')}>Adoption Requests</p>
          <p onClick={() => setScreen('adoptedHistory')}>Adopted History</p> */}
          <p onClick={() => { setScreen('treatments'); setMenuOpen(false); }}>Treatments</p>
          <p onClick={() => { setScreen('customers'); setMenuOpen(false); }}>Customers</p>
          <p onClick={() => { setScreen('admins'); setMenuOpen(false); }}>Admin Management</p>

        </div>
      </div>
      <div className='admin-screen-right'>
        {screen === 'dashboard' && <AdminDashboard />}
        {screen === 'appointment' && <AdminAppointments />}
        {screen === 'orders' && <AdminOrders />}
        {screen === 'items' && <Items />}
        {/* {screen === 'approvedRequests' && <ApprovedRequests />}
        {screen === 'adoptingPet' && <AdoptingRequests />}
        {screen === 'adoptedHistory' && <AdoptedHistory />} */}
        {screen === 'treatments' && <AdminCreateArticle />}
        {screen === 'customers' && <AdminCustomers />}
        {screen === 'admins' && <AdminManagement />}
      </div>
    </div>

     {/* Inline styling */}
      <style>{`
        .admin-menu-toggle {
          display: none;
          background: #f8fafc;
          padding: 1rem;
        }

        .admin-menu-toggle button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .admin-screen-container {
          display: flex;
        }

        .admin-screen-left p {
          margin-bottom: 1rem;
          cursor: pointer;
          font-weight: 500;
        }

        .admin-screen-right {
          flex-grow: 1;
          padding: 1.5rem;
          background: #fff;
        }

        @media (max-width: 600px) {
          .admin-menu-toggle {
            display: block;
          }

          .admin-screen-container {
            flex-direction: column;
          }

          .admin-screen-left {
            display: none;
            width: 100%;
            background-color: #f1f5f9;
            padding: 1rem;
          }

          .admin-screen-left.open {
            display: block;
          }

          .admin-screen-left p {
            padding: 0.75rem 0;
            border-bottom: 1px solid #e2e8f0;
          }

          .admin-screen-right {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default AdminScreen
