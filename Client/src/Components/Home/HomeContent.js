import React from 'react';
import './HomeContent.css';
import Calender from './images/calender.png';
import Vaccination from './images/vaccination.png';
import MedicalKit from './images/medical-kit.png';
import Product from './images/cart.png';
import DogImageSitting from './images/Cat & Dog Sitteing.png';

const Home = () => {
  return (
    <div className="home-content-container">
      <div className="nav-buttons">
        <button className="btn-treatment">Treatments</button>
        <button className="btn-shop">Shop Products</button>
      </div>

      <section className="services" id='services'>
        <div className='background-box'></div>
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="service-card">
            <p>Schedule Appointment</p>
            <img className='calender' src={Calender} alt='Schedule Appointment'/>
          </div>
          <div className="service-card">
            <p>Pet Vaccination</p>
            <img className='vaccination' src={Vaccination} alt='Pet Vaccination'/>
          </div>
          <div className="service-card">
            <p>Surgeries & Protection</p>
            <img className='surgeries' src={MedicalKit} alt='Surgeries and Protection'/>
          </div>
          <div className="service-card">
            <p>Pet Care Products</p>
            <img className='product' src={Product} alt='Shop Product'/>
          </div>
        </div>
      </section>

      <section className="news-section">
        <h2>Latest NEWS</h2>
        <div className="news-cards">
          <div className="news-card-left">
            <h3>World Rabies Day 2025</h3>
            <p> <br/><br/>World Rabies Day is a global awareness campaign aimed at educating communities about rabies prevention. Pet owners are encouraged to vaccinate their pets and spread awareness about responsible pet ownership. Stay tuned for events and vaccination drives in Sri Lanka!</p>
          </div>
          <div className='news-cards-right'>
          <div className="news-card">
            <h3>Pet Health Alert!</h3>
            <p>Rise in Ticks and Fleas with Changing Weather Veterinarians across Sri Lanka are noticing a seasonal rise in tick and flea infestations. Make sure your pets are protected with regular treatments. Visit our clinic for tick prevention advice and the latest anti-parasitic medications.</p>
          </div>
          <div className="news-cards-below">
            <div className='news-img-card'>
              <img src={DogImageSitting} alt="Dog & Cat sitting" />
            </div>
            <div className='news-card-below'>
              <h3>Keep Your Pets Cool</h3>
              <p>With rising temperatures in Sri Lanka, pets are at higher risk of heatstroke. Keep them hydrated, avoid walks during midday, and never leave them in parked vehicles. Check our blog for summer care tips.</p>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Customers Say?</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            "Excellent service and clean facilities. The staff are friendly and explain everything clearly. The new pet health app is also super useful for keeping track of vaccinations and appointments."
          </div>
          <div className="testimonial-card highlight">
            "When my cat suddenly fell ill, the team at the clinic responded quickly and treated her with such compassion. They even followed up a few days later to check on her progress. I really appreciate their dedication."
          </div>
          <div className="testimonial-card">
            "I’ve been bringing my Labrador, Max, to this clinic for over two years now. The vets are incredibly caring and professional. Max actually enjoys coming here! Highly recommended for anyone who wants quality care for their pets."
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;