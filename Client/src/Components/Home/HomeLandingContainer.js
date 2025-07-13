import React from "react";
import girlHoldingADog from "./images/girlHoldingADog.png";
import homepageDog from "./images/homepageDog.png";
import { Link } from "react-router-dom";

const HomeLandingContainer = (props) => {
  // const scrollToTop = () => {
  //   window.scrollTo(0, 0);
  // };
  return (
    <div className="home-container">
      <div className="homeContainer-left">
        <div>
          <p className="home-title">
            <div className="home-titlePlusPng">
            <p>Your Trusted </p><img src={homepageDog} alt="Dog sitting"/>
            </div>
            Partner in
            <br />
            Pet Care
          </p>
          <p className="home-second-para">
            {props.description}
          </p>
        </div>
        <div className="adopt-btn">
          <Link to='./appointment'><button className="Home-appointment-btn"><p>Make an Appointment</p></button></Link>
          
        </div>
      </div>
      <div className="homeContainer-right">
        <img src={girlHoldingADog} alt='Girl holding a Dog'/>
      </div>

      <style>{`
      .home-container {
        padding: 20px 50px 70px 50px;
        width: 100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
}

      .homeContainer-left {
        width: 60vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
}

      .home-title {
        font-size: 70px;
        line-height: 1.2;
        font-weight: bold;
        font-family: 'Preahvihear', sans-serif;
}

      .home-titlePlusPng {
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
}

      .home-titlePlusPng>img {
        width: 80px;
        margin-left: 10px;
}

      .home-second-para {
        font-size: 18px;
        color: grey;
        margin: 20px 0px 20px 0px;
}

      .homeContainer-right {
        padding-left: 40PX;
        width: 35vw;
        display: flex;
        justify-content: center;
        align-items: center;
}

      .Home-appointment-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px #e78a3c solid;
        height: 42px;
        width: 250px;
        font-weight: bold;
        font-size: 14px;
        border-radius: 20px;
        background-color: white;
        color: black;
        box-shadow: 1.5px 1.5px 3px var(--orange);
        font-family: 'Preahvihear', sans-serif;
}

      .adopt-btn>* {
        text-decoration: none;
}

      .Home-appointment-btn:hover {
        border: 2px #e78a3c solid;
        background-color: #F4A261;
        color: white;
        transition: all 0.3s ease;
        cursor: pointer;
}

@media (max-width: 600px) {
  .home-container {
    flex-direction: column-reverse;
    padding: 40px 20px;
    text-align: center;
  }

  .homeContainer-left, .homeContainer-right {
    width: 100%;
    padding: 0;
  }

  .home-title {
    font-size: 48px;
  }

  .home-titlePlusPng img {
    width: 50px;
  }

  .Home-appointment-btn {
    width: 80%;
    margin: 0 auto;
  }
}

@media (max-width: 600px) {
  .home-title {
    font-size: 36px;
  }

  .home-second-para {
    font-size: 16px;
  }

  .Home-appointment-btn {
    width: 100%;
    font-size: 12px;
  }
}


      `}</style>
    </div>
  );
};

export default HomeLandingContainer;
