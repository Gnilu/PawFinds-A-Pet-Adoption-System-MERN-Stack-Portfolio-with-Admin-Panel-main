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

      <section className="services">
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
            <p>Join our mission to eliminate rabies by 2030 through education and pet vaccination awareness.</p>
          </div>
          <div className='news-cards-right'>
          <div className="news-card">
            <h3>Pet Health Alert!</h3>
            <p>Recent rise in tick-borne illnesses. Ensure your pet’s protection today!</p>
          </div>
          <div className="news-cards-below">
            <div className='news-img-card'>
              <img src={DogImageSitting} alt="Dog & Cat sitting" />
            </div>
            <div className='news-card-below'>
              <p>Keep Your Pets Cool this Summer. Hydration and shade are key.</p>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Customers Say?</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            “Excellent service and clean environment. My dog loves the staff here!”
          </div>
          <div className="testimonial-card highlight">
            “When my cat had ticks, they treated her gently and professionally. Highly recommend PetcRe.”
          </div>
          <div className="testimonial-card">
            “Affordable treatments and trustworthy advice. We always visit for vaccinations.”
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;