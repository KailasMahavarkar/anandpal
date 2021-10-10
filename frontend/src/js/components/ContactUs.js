import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function ContactUs() {
  return (
    <div className="contact_us_container" id="contact_us_section">
      <div className="contact_overlay">
        <h1 className="contact_us_header">contact us</h1>
        <div className="contact_us">
          <div className="contact_us_left">
            <h1>how to find us</h1>
            <p>
              If you have any questions, just fill up the contact form,and we
              will answer you shortly. If you are living nearby,come vist us at
              our comfertabel places.
            </p>
            <h4>Bengluru</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
              consequuntur. <br />
              Telephone: <span className="green"> +91 9090909090</span> <br />
              E-mail: <span className="green">anandpal@gmail.com</span>
            </p>
            {/* 
            <h4>Chickmangluru</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
              consequuntur. <br />
              Telephone: <span className="green"> +91 9090909090</span> <br />
              E-mail: <span className="green">anandpal@gmail.com</span>
            </p>
            <h4>Belur</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
              consequuntur. <br />
              Telephone: <span className="green"> +91 9090909090</span> <br />
              E-mail: <span className="green">anandpal@gmail.com</span>
            </p> */}
          </div>
          <div className="contact_us_right">
            <h1>get in touch</h1>
            <form action="" method="post" className="contact_us_form">
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="E-mail" />
              <textarea name="" placeholder="Message" />
              <input type="submit" value="SUBMIT" />
            </form>
            {/* <iframe
              className="contact_map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15133.323242851997!2d73.80661599999999!3d18.5139471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfa67093d3cd%3A0x3c5dafc0ef22758a!2sDatta%20Nagar%2C%20Kothrud%2C%20Pune%2C%20Maharashtra%20411038!5e0!3m2!1sen!2sin!4v1629051324221!5m2!1sen!2sin"
              allowfullscreen=""
              loading="lazy"
            /> */}
          </div>
        </div>
        <div className="contact_us_bottom">
          <div className="">
            Connect <span> With Us</span>
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faLinkedin} />
            <FontAwesomeIcon icon={faTwitter} />
          </div>
          <div className="copy_right">
            © 2016 All Right Reserved Under Act Design and Develope by Our Make
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
