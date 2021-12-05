import React from "react";
import BusinessIntro from "./HomePage/BusinessIntro";
import Lander from "./HomePage/Lander";
import SmallIntroduction from "./HomePage/SmallIntroduction";
import ContactUs from "./ContactUs";

function HomePage() {
	return (
		<div className="home_page">
			<Lander />
			<SmallIntroduction />
			<BusinessIntro />
			<ContactUs />
		</div>
	);
}

export default HomePage;
