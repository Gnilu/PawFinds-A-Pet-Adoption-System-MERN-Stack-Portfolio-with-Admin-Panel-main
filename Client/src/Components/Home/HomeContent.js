import React from 'react';
import './HomeContent.css';

const Home = () => {
  return (
    <div className="home-content-container">
      <div className="nav-buttons">
        <button className="btn-orange">Treatments</button>
        <button className="btn-orange">Shop Products</button>
      </div>

      <section className="services">
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="service-card">Schedule Appointment</div>
          <div className="service-card">Pet Vaccination</div>
          <div className="service-card">Surgeries & Protection</div>
          <div className="service-card">Pet Care Products</div>
        </div>
      </section>

      <section className="news-section">
        <h2>Latest NEWS</h2>
        <div className="news-cards">
          <div className="news-card">
            <h3>World Rabies Day 2025</h3>
            <p>Join our mission to eliminate rabies by 2030 through education and pet vaccination awareness.</p>
          </div>
          <div className="news-card">
            <h3>Pet Health Alert!</h3>
            <p>Recent rise in tick-borne illnesses. Ensure your pet’s protection today!</p>
          </div>
          <div className="news-card image-card">
            <img src="https://via.placeholder.com/150" alt="Pet Care" />
            <p>Keep Your Pets Cool this Summer. Hydration and shade are key.</p>
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