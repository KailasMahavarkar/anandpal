const PallaviInfo = () => {
	return (
		<>
			<span>
				<b>Mrs. Pallavi</b> is also a business entrepreneur as well as a
				doctor. like mr. Anand she is also in vestege.
			</span>
			<span>
				She has also started a startup in medical field as “Hritvi
				Wellness”. For which she has received a award for good startup.
				She is also a motivational speaker.
			</span>
			<span>
				Education qualifications, Bachelor of Ayurveda Medicine and
				Surgery [BAMS], post graduate in nutritional therapy and
				environmental science. Certified in chelation and ozone therapy.
			</span>
		</>
	);
};

const AnandInfo = () => {
	return (
		<>
			<span>
				<b>Mr. anand </b> is a business entrepreneur. he helps people
				who have dreams to achieve them.
			</span>
			<span>
				He is in the business of network marketing, in vestege. He is
				also a great motivational speaker.
			</span>
			<span>
				He is also an award holder of rajiv gandhi Rashtriya Ekta Samman
				Award
			</span>
		</>
	);
};

export const PALLAVI = {
	name: "Pallavi",
	profession: ["Doctor", "Entrepreneur", "motivational speaker"],
	image: "./pallavi.jpg",
	info: PallaviInfo,
	social: {
		instagram: "https://www.instagram.com/anand_pal/",
		facebook: "https://www.facebook.com/anand.pal.9",
		twitter: "https://twitter.com/anand_pal",
		linkedin: "https://www.linkedin.com/in/anand-pal-b9a8a11a3/",
	},
};

export const ANAND = {
	name: "Anand",
	profession: ["motivational speaker", "Business Entrepreneur"],
	image: "./anand.jpg",

	info: AnandInfo,
	social: {
		instagram: "https://www.instagram.com/anand_pal/",
		facebook: "https://www.facebook.com/anand.pal.9",
		twitter: "https://twitter.com/anand_pal",
		linkedin: "https://www.linkedin.com/in/anand-pal-b9a8a11a3/",
	},
};
