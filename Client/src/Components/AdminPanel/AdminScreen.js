import React, { useState } from 'react'
import PostingPets from './PostingPets'
import AdoptingRequests from './AdoptingRequests'
import AdoptedHistory from './AdoptedHistory'
import ApprovedRequests from './ApprovedRequests'
import AdminCreateArticle from './AdminCreateArticle'
import AdminDashboard from './Dashboard/AdminDashboard'
import AdminAppointments from './Appointment'

const AdminScreen = () => {
  const [screen, setScreen] = useState('postingPet')

  return (
    <div className='admin-screen-container'>
      <div className='admin-screen-left'>
        <div>
          <p onClick={() => setScreen('dashboard')}>Dashboard</p>
          <p onClick={() => setScreen('appointment')}>Appointments</p>
          <p onClick={() => setScreen('postingPet')}>Post Pet Requests</p>
          <p onClick={() => setScreen('approvedRequests')}>Approved Pets</p>
          <p onClick={() => setScreen('adoptingPet')}>Adoption Requests</p>
          <p onClick={() => setScreen('adoptedHistory')}>Adopted History</p>
           <p onClick={() => setScreen('treatments')}>Treatments</p>

        </div>
      </div>
      <div className='admin-screen-right'>
        {screen === 'dashboard' && <AdminDashboard />}
        {screen === 'appointment' && <AdminAppointments />}
        {screen === 'postingPet' && <PostingPets />}
        {screen === 'approvedRequests' && <ApprovedRequests />}
        {screen === 'adoptingPet' && <AdoptingRequests />}
        {screen === 'adoptedHistory' && <AdoptedHistory />}
        {screen === 'treatments' && <AdminCreateArticle />}
      </div>
    </div>
  )
}

export default AdminScreen
