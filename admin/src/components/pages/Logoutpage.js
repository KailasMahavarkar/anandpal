import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';



const Logoutpage = (props) => {
	let history = useNavigate();


	const logoutHandler = () => {
		Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
	};

	return (
		<div className="navbar__menu__item" onClick={logoutHandler}>
			logout
		</div>
	);
};

export default Logoutpage;
