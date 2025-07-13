import React from 'react'
import AdoptSection from './AdoptSection'
import PostPetSection from './PostPetSection'

const Services = () => {
  return (
    <div className='main-container'>
        <div className='adopt-pet'>
            <AdoptSection/>
        </div>
        <div className='post-pet'>
            <PostPetSection/>
        </div>

        <style>{`
        .main-container {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
}

        .adopt-pet {
          max-width: 50vw;
}

        .post-pet {
          max-width: 50vw;
}
        `}</style>
    </div>
  )
}

export default Services
