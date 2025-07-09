import React from "react";
import HomeLandingContainer from "./HomeLandingContainer";
import CardBelowHome from "./CardBelowHome";
//import PlanningToAdoptAPet from "./PlanningToAdoptAPet";
import HomeContent from "./HomeContent";

const Home = (props) => {
  return (
    <>
      <HomeLandingContainer description={props.description} />
      <CardBelowHome />
      <HomeContent/>
      
    </>
  );
};

export default Home;
