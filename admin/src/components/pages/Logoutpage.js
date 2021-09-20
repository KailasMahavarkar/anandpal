import React, { useState, useEffect } from "react";
import { url } from "../../helper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../../hooks/useAuth";

const Logoutpage = (props) => {
    const navigate = useNavigate();

	const logoutHandler =() => {
        if (props.authed){
            navigate('/')
        }else{
            props.logout();
        }
	};

	return (-----------------);
};

export default Logoutpage;
