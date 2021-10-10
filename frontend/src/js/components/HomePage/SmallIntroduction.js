import React from "react";
import ScrollAnimation from "react-animate-on-scroll";

function SmallIntroduction() {
  return (
    <div className="small_introduction">
      <ScrollAnimation
        animateIn="animate__zoomIn"
        animateOnce
        offset={0}
        // duration={0.5}
      >
        <div className="introduction">
          <div className="profile_img1" />
          <div
            className="profile_intro"
            style={{ borderLeft: "1px solid black" }}
          >
            <h3>Anand</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
              dignissimos tempore temporibus cupiditate adipisci impedit quam?
              Corporis iusto optio debitis assumenda, minus, facilis at a,
              inc0idunt dolorum aliquid eaque mollitia!
            </p>
          </div>
        </div>
      </ScrollAnimation>
      <ScrollAnimation
        animateIn="animate__zoomIn"
        animateOnce
        offset={0}
        // duration={0.5}
      >
        <div className="introduction">
          <div
            className="profile_intro"
            style={{ borderRight: "1px solid black" }}
          >
            <h3>Pallavi</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
              dignissimos tempore temporibus cupiditate adipisci impedit quam?
              Corporis iusto optio debitis assumenda, minus, facilis at a,
              inc0idunt dolorum aliquid eaque mollitia!
            </p>
          </div>

          <div className="profile_img2" />
        </div>
      </ScrollAnimation>
    </div>
  );
}

export default SmallIntroduction;
