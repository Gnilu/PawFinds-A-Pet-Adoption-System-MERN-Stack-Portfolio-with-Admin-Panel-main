import React from "react";
import adoptPet from "./images/adoptPet.png";
import { Link } from "react-router-dom";

const AdoptSection = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="adopt-section">
      <h2>Vaccination</h2>
      <p>Healthy Pet, Happy Life</p>
      <img src={adoptPet} alt="Happy Pet" />

      <p>
        Welcome to our petcare clinic! Vaccinations are a vital part of keeping your pet safe from harmful diseases and ensuring a long, healthy life.
      </p>

      <h3>Why Vaccinations Matter</h3>
      <ul>
        <li>Protect your pet from life-threatening illnesses</li>
        <li>Prevent the spread of contagious diseases</li>
        <li>Strengthen your pet’s immune system</li>
      </ul>

      <h3>Vaccination Services We Offer</h3>
      <ol>
        <li>Core and Non-core vaccination</li>
        <li>vaccination schedules</li>
        <li>Annual boosters and wellness checkups</li>
      </ol>

      <h3>Vaccination Process</h3>
      <ol>
        <li>1.Schedule a Check-Up with our clinic</li>
        <li>2.Receive a Tailored Vaccination Plan based on your pet's age, breed, and lifestyle</li>
        <li>3.Track Booster Dates and stay up-to-date with our reminders</li>
      </ol>

      <h5> Give your pet the best protection—schedule a vaccination appointment today!</h5>
      <Link to="/pets">
        <button className="cta-button" onClick={scrollToTop}>Find Your Perfect Pet</button>
      </Link>
    </section>
  );
};

export default AdoptSection;
