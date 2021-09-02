import React from "react";

function Vestege() {
  return (
    <div className="vestege_container" id="vestege_container">
      <section
        className="vestege-odd-section"
        style={{ paddingBottom: "2rem" }}
      >
        <h1 className="vestege-heading">VESTEGE</h1>
        <div className="vestege-info">
          <div className="relative_container">
            <div
              className="vestege-info-content"
              style={{ borderRight: "1px solid black" }}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Consequatur ea maxime dolorum facere corrupti repellendus aliquid
              molestias, distinctio tenetur aliquam error, autem excepturi
              architecto nam voluptate quas laudantium saepe nostrum officia
              dolore itaque inventore minus blanditiis quasi. Praesentium
              explicabo accusantium nisi, ipsa minima atque voluptate ad
              delectus cumque vel voluptatum.
            </div>
          </div>
          <div className="vestege-info-image"></div>
        </div>
      </section>
      <hr />
      <section className="vestege-even-section">
        <div className="vestege-what">
          <div className="vestege-info">
            <div className="relative_container">
              <div className="vestege-info-content">
                <h3>WHAT IS VESTEGE?</h3>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Consequatur ea maxime dolorum facere corrupti repellendus
                aliquid molestias, distinctio tenetur aliquam error, autem
                excepturi architecto nam voluptate quas laudantium saepe nostrum
                officia dolore itaque inventore minus blanditiis quasi.
                Praesentium explicabo accusantium nisi, ipsa minima atque
                voluptate ad delectus cumque vel voluptatum.
              </div>
            </div>
            <div className="vestege-what-video">
              <iframe
                src="http://www.youtube.com/embed/W7qWa52k-nE"
                width="100%"
                height="315"
                frameborder="0"
                allowfullscreen
              />
            </div>
          </div>
        </div>
      </section>
      <hr />
      <section className="vestege-odd-section">
        <div className="vestege-why">
          <div className="vestege-info">
            <div className="vestege-what-video">
              <iframe
                src="http://www.youtube.com/embed/W7qWa52k-nE"
                width="100%"
                height="315"
                frameborder="0"
                allowfullscreen
              />
            </div>
            <div className="relative_container">
              <div className="vestege-info-content">
                <h3>WHY DIRECT SELLING INDUSTRY?</h3>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Consequatur ea maxime dolorum facere corrupti repellendus
                aliquid molestias, distinctio tenetur aliquam error, autem
                excepturi architecto nam voluptate quas laudantium saepe nostrum
                officia dolore itaque inventore minus blanditiis quasi.
                Praesentium explicabo accusantium nisi, ipsa minima atque
                voluptate ad delectus cumque vel voluptatum.
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <section className="vestege-even-section">
        <div className="vestege-why">
          <div className="vestege-info">
            <div className="relative_container">
              <div className="vestege-info-content">
                <h3>HOW YOU CAN JOIN THIS BUSINESS AND GROW?</h3>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Consequatur ea maxime dolorum facere corrupti repellendus
                aliquid molestias, distinctio tenetur aliquam error, autem
                excepturi architecto nam voluptate quas laudantium saepe nostrum
                officia dolore itaque inventore minus blanditiis quasi.
                Praesentium explicabo accusantium nisi, ipsa minima atque
                voluptate ad delectus cumque vel voluptatum.
              </div>
            </div>
            <div className="vestege-what-video">
              <iframe
                src="http://www.youtube.com/embed/W7qWa52k-nE"
                width="100%"
                height="315"
                frameborder="0"
                allowfullscreen
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Vestege;
