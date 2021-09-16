import React from "react";
import { useState } from "react";
import axios from "axios";
import { url } from "../../helper";
import { Link, useHistory } from "react-router-dom";
import Logoutpage from "../pages/Logoutpage";

const Navbar = (props) => {

    let history = useHistory()

	const logoutHandler = () => {
        props.removeAccessToken();
		props.removeRefreshToken();
        history.push('/login');
	};

	const blogHandler = () => {};
    const adminHandler = () => {
        props.protect(props.accessToken, props.refreshToken);
    };

	return (
		<div className="navbar">
			<div className="navbar__logo" onClick={history.push('/')}>
				<a href="/" className="alink">
					AnandPal
				</a>
			</div>

			<div className="navbar__menu">
				<Link to="/blogs">
					<div className="navbar__menu__item" onClick={blogHandler}>
						Blogs
					</div>
				</Link>

                <Link to="/admin">
					<div className="navbar__menu__item" onClick={adminHandler}>
						Admin
					</div>
				</Link>

                {/* handle -> admin logout */}
                <div className="navbar__menu__item" onClick={logoutHandler}>
                    Logout
                </div>
			</div>
		</div>
	);
};

export default Navbar;
