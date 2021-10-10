import React from "react";
import vestegeImage from "../../../images/BusinessPage/vestege.jpeg";
function Vestege() {
  return (
    <div className="vestege_container" id="vestege_container">
      {/* <section className="vestege-odd-section">
        <div className="vestege-info">
        <div className="vestege-info-content">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Consequatur ea maxime dolorum facere corrupti repellendus aliquid
        molestias, distinctio tenetur aliquam error, autem excepturi
        architecto nam voluptate quas laudantium saepe nostrum officia
        dolore itaque inventore minus blanditiis quasi. Praesentium
        explicabo accusantium nisi, ipsa minima atque voluptate ad delectus
        cumque vel voluptatum.
        </div>
        <div className="vestege-info-image"></div>
        </div>
        </section> 
        <hr />
      */}

      <h1 className="vestege-heading">VESTEGE</h1>
      <section className="vestege-even-section">
        <div className="vestege-info">
          <div className="vestege-info-content">
            <h3>WHAT IS VESTEGE?</h3>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Consequatur ea maxime dolorum facere corrupti repellendus aliquid
            molestias, distinctio tenetur aliquam error, autem excepturi
            architecto nam voluptate quas laudantium saepe nostrum officia
            dolore itaque inventore minus blanditiis quasi. Praesentium
            explicabo accusantium nisi, ipsa minima atque voluptate ad delectus
            cumque vel voluptatum.
          </div>
          <div className="vestege-video">
            <iframe
              src="http://www.youtube.com/embed/W7qWa52k-nE"
              width="100%"
              frameBorder="0"
              allowFullScreen="allowFullScreen"
              title="vestege-what"
            />
          </div>
        </div>
      </section>
      <section className="vestege-odd-section">
        <div className="vestege-info">
          <div className="vestege-video">
            <iframe
              src="http://www.youtube.com/embed/W7qWa52k-nE"
              width="100%"
              frameBorder="0"
              allowFullScreen="allowFullScreen"
              title="vestege-why"
            />
          </div>
          <div className="vestege-info-content">
            <h3>WHY DIRECT SELLING INDUSTRY?</h3>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Consequatur ea maxime dolorum facere corrupti repellendus aliquid
            molestias, distinctio tenetur aliquam error, autem excepturi
            architecto nam voluptate quas laudantium saepe nostrum officia
            dolore itaque inventore minus blanditiis quasi. Praesentium
            explicabo accusantium nisi, ipsa minima atque voluptate ad delectus
            cumque vel voluptatum.
          </div>
        </div>
      </section>
      <section className="vestege-even-section">
        <div className="vestege-info">
          <div className="vestege-info-content">
            <h3>HOW YOU CAN JOIN THIS BUSINESS AND GROW?</h3>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Consequatur ea maxime dolorum facere corrupti repellendus aliquid
            molestias, distinctio tenetur aliquam error, autem excepturi
            architecto nam voluptate quas laudantium saepe nostrum officia
            dolore itaque inventore minus blanditiis quasi. Praesentium
            explicabo accusantium nisi, ipsa minima atque voluptate ad delectus
            cumque vel voluptatum.
          </div>
          <div className="vestege-video">
            <iframe
              src="http://www.youtube.com/embed/W7qWa52k-nE"
              width="100%"
              frameBorder="0"
              allowFullScreen="allowFullScreen"
              title="vestege-how"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Vestege;
