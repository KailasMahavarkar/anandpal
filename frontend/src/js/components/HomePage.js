import React from "react";
import BusinessIntro from "./HomePage/BusinessIntro";
import Lander from "./HomePage/Lander";
import SmallIntroduction from "./HomePage/SmallIntroduction";

function HomePage() {
  return (
    <div className="home_page">
      <Lander />
      <SmallIntroduction />
      <BusinessIntro />
    </div>
  );
}

export default HomePage;
