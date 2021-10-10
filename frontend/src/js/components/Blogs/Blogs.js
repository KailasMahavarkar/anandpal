import React from "react";
import img1 from "../../../images/introductionBG.jpg";
import img2 from "../../../images/profile.png";
import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from "react-responsive-carousel";

function Blogs() {
  const img_arr = [img1, img2];
  return (
    <div className="blog">
      <Carousel
        showArrows={false}
        autoPlay={true}
        showIndicators={false}
        showThumbs={false}
        stopOnHover={false}
        dynamicHeight={true}
        infiniteLoop={true}
        statusFormatter={() => null}
      >
        {img_arr.map((img) => (
          <img src={img} className="blog-image" alt="" />
        ))}
      </Carousel>
      <div className="blog-bg-text-container">
        <span className="blog-bg-text">ANAND & PAL</span>
      </div>
      <h2>hello</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui tenetur
        porro voluptates ducimus. A quisquam dicta, sunt esse ipsum ex
        voluptatibus labore ratione impedit dolores magni aspernatur obcaecati
        perspiciatis, porro laborum voluptates doloremque libero voluptatem ea
        voluptate recusandae odio dolor id est. Repudiandae voluptas quia quam
        fugit exercitationem magnam tenetur.
      </p>
    </div>
  );
}

export default Blogs;
