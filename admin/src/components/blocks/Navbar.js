import React from "react";
import { useState } from "react";
import axios from "axios";
import { url } from "../../helper";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


const Navbar = (props) => {

    let navigate = useNavigate();

    const logoutHandler = () => {
		Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        props.logout();
        navigate('/login')
	};

	const blogHandler =  () => {
        navigate('/blogs')
    };
    const adminHandler = () => {
        navigate('/blogs')
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
