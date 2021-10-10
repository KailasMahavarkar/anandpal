import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function ConnectWithUs() {
  return (
    <div className="connect-with-us">
      <div className="connect-with-us-anand">
        <span>A</span>
        <a href="">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
      <div className="connect-with-us-pallavi">
        <span>P</span>
        <a href="">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
      <div className="connect-with-us-text">
        &rarr; <br />
        connect
      </div>
    </div>
  );
}

export default ConnectWithUs;
