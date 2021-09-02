import React from "react";

function SmallIntroduction() {
  return (
    <div className="small_introduction">
      <div className="first_intro">
        <div className="profile_img1" />
        <div className="relative_container">
          <div
            className="profile_intro"
            style={{ borderLeft: "1px solid black" }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
            dignissimos tempore temporibus cupiditate adipisci impedit quam?
            Corporis iusto optio debitis assumenda, minus, facilis at a,
            incidunt dolorum aliquid eaque mollitia!
          </div>
        </div>
      </div>
      <div className="second_intro">
        <div className="relative_container">
          <div
            className="profile_intro"
            style={{ borderRight: "1px solid black" }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
            dignissimos temp lorem100
          </div>
        </div>

        <div className="profile_img2" />
      </div>
    </div>
  );
}

export default SmallIntroduction;
