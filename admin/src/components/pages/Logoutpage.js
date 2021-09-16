import React from "react";
import { useHistory } from "react-router-dom";

const Logoutpage = (props) => {
	let history = useHistory();

	const logoutHandler = () => {
		props.removeAccessToken();
		props.removeRefreshToken();
		// history.push("/");
	};

	return (
		<div className="navbar__menu__item" onClick={logoutHandler}>
			logout
		</div>
	);
};

export default Logoutpage;
