import React from "react";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faInstagram,
	faLinkedin,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons";
// import { faAd } from "@fortawesome/free-solid-svg-icons";

function AboutUsContent() {
	return (
		<div className="about_us_container">
			<div className="about_us_nav_bar_container">
				<div className="about_us_nav_bar_contents">
					<a href="#about_us">
						<div className="about_us_nav_bar_content">about us</div>
					</a>
					<a href="#about_anand">
						<div className="about_us_nav_bar_content">
							about anand
						</div>
					</a>
					<a href="#about_pallavi">
						<div className="about_us_nav_bar_content">
							about pallavi
						</div>
					</a>
					<a href="#about_business">
						<div className="about_us_nav_bar_content">
							about our business
						</div>
					</a>
					<a href="#contact_us_section">
						<div className="about_us_nav_bar_content">
							contact us
						</div>
					</a>
					<div className="">
						<a href="" target="_blank">
							<FontAwesomeIcon
								icon={faFacebook}
								className="contact_icons"
							/>
						</a>
						<a href="" target="_blank">
							<FontAwesomeIcon
								icon={faTwitter}
								className="contact_icons"
							/>
						</a>
						<a
							href="https://www.instagram.com/pallavichobhe/"
							target="_blank"
						>
							<FontAwesomeIcon
								icon={faInstagram}
								className="contact_icons"
							/>
						</a>
						<a href="" target="_blank">
							<FontAwesomeIcon
								icon={faLinkedin}
								className="contact_icons"
							/>
						</a>

						{/* <i class="fab fa-facebook-square"></i> */}
					</div>
				</div>
			</div>
			<div className="about_us_content">
				{/* about us */}
				<div className="about_us_section" id="about_us">
					<p className="about_us_heading_sub">about us</p>
					<h1 className="about_us_heading_main">about us</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing
						elit. Assumenda quidem asperiores perferendis facere
						nobis inventore culpa eaque! Sunt, est mollitia.
					</p>
					<p className="about_us_data">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Ratione cupiditate ex distinctio doloremque, officiis
						officia impedit molestias assumenda! Placeat,
						aspernatur! Optio molestias voluptatum, asperiores
						distinctio ipsum voluptatem porro ad commodi repellat
						hic error quaerat, amet in delectus itaque voluptates,
						ullam facere suscipit? Ratione, et consequatur
						voluptatum voluptates magnam similique neque.
					</p>
				</div>
				{/* anand */}
				<div className="about_us_section" id="about_anand">
					<p className="about_us_heading_sub">about anand</p>
					<h1 className="about_us_heading_main">about anand</h1>
					<div className="anandpal">
						<div className="anandpal_photo" />
						<div className="relative_container">
							<div className="anandpal_content">
								<p>
									mr. anand is a business entrepreneur. he
									helps people who have dreams to achieve
									them. He is in the business of network
									marketing , in vestege. He is also a great
									motivational speaker. Also award holder of
									rajiv gandhi Rashtriya Ekta Samman Award
								</p>
							</div>
						</div>
					</div>
				</div>
				{/* pallavi */}
				<div className="about_us_section" id="about_pallavi">
					<p className="about_us_heading_sub">about pallavi</p>
					<h1 className="about_us_heading_main">about pallavi</h1>
					<div className="anandpal">
						<div className="anandpal_photo" />
						<div className="relative_container">
							<div className="anandpal_content">
								<p>
									Mrs. Pallavi is also a business entrepreneur
									as well as a doctor. like mr. Anand she is
									also in vestege. She has also started a
									startup in medical field as “Hritvi
									Wellness”. For which she has received a
									award for good startup. She is also a
									motivational speaker. Education
									qualifications, Bachelor of Ayurveda
									Medicine and Surgery [BAMS], post graduate
									in nutritional therapy and environmental
									science. Certified in chelation and ozone
									therapy.
								</p>
							</div>
						</div>
					</div>
				</div>
				{/*about business  */}
				<div className="about_us_section" id="about_business">
					<p className="about_us_heading_sub">about our business</p>
					<h1 className="about_us_heading_main">
						about our business
					</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing
						elit. Assumenda quidem asperiores perferendis facere
						nobis inventore culpa eaque! Sunt, est mollitia.
					</p>
					<p className="about_us_data">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Ratione cupiditate ex distinctio doloremque, officiis
						officia impedit molestias assumenda! Placeat,
						aspernatur! Optio molestias voluptatum, asperiores
						distinctio ipsum voluptatem porro ad commodi repellat
						hic error quaerat, amet in delectus itaque voluptates,
						ullam facere suscipit? Ratione, et consequatur
						voluptatum voluptates magnam similique neque.
					</p>
				</div>
			</div>
		</div>
	);
}

export default AboutUsContent;
