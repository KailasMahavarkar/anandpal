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
							mr. anand is a business entrepreneur. he helps
							people who have dreams to achieve them. He is in the
							business of network marketing , in vestege. He is
							also a great motivational speaker. Also award holder
							of rajiv gandhi Rashtriya Ekta Samman Award
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
					<div className="profile_intro">
						<h3>Pallavi</h3>
						<p>
							Mrs. Pallavi is also a business entrepreneur as well
							as a doctor. like mr. Anand she is also in vestege.
							She has also started a startup in medical field as
							“Hritvi Wellness”. For which she has received a
							award for good startup. She is also a motivational
							speaker. Education qualifications, Bachelor of
							Ayurveda Medicine and Surgery [BAMS], post graduate
							in nutritional therapy and environmental science.
							Certified in chelation and ozone therapy.
						</p>
					</div>

					<div className="profile_img2" />
				</div>
			</ScrollAnimation>
		</div>
	);
}

export default SmallIntroduction;
