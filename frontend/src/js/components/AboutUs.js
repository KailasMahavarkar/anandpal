import React from "react";
import AboutUsContent from "./AboutUS/AboutUsContent";
import AboutUsLander, { name } from "./AboutUS/AboutUsLander";

function AboutUs() {
  // es6 experimental import and export
  console.log(name);
  return (
    <div className="about_us">
      <AboutUsLander />
      <AboutUsContent />
    </div>
  );
}

export default AboutUs;
