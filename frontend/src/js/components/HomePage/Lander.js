import React from "react";
import ScrollAnimation from "react-animate-on-scroll";

function Lander() {
  return (
    <div className="lander_home_page">
      <div className="lander_home_page_overlay">
        <ScrollAnimation animateIn="animate__flipInX" animateOnce offset={0}>
          <div className="lander_home_page_text">
            <div className="lander_home_page_logo" />
            <div className="lander_home_page_text--header">anandpal</div>
            <div className="lander_home_page_text--subheader">
              join us ro enrich your lives
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}

export default Lander;
