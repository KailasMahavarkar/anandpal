import React from "react";
import { useState } from "react";
import axios from "axios";
import { url } from "../../helper";
import { Link, useHistory } from "react-router-dom";
import Cookies from 'js-cookie';


const Navbar = (props) => {

    let history = useHistory();

    const logoutHandler = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('authed');
        history.push('/login');
    };

	const blogHandler =  () => {
        history.push('/blogs');
    };
    const adminHandler = () => {
        history.push('/admin');
    };

	return (
		<div className="navbar">
			<div className="navbar__logo" onClick={()=>console.log("logo clicked")}>
                <Link to="/">
                    <a className="alink">
                       AnandPal
                    </a>
                </Link>
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
