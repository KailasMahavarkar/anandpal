import axios from "axios";
import React, { useRef } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";
import { url, isEmpty } from "./helper";


export const ProtectedRoute = ({ component: Component, ...rest }) => {

    if (!localStorage.getItem('refreshToken')){
        return <Redirect to="/" />
    }

    if (!localStorage.getItem('accessToken')){
        return <Redirect to="/" />
    }

	if (auth.isAuthenticated()) {
		return (
			<Route
				{...rest}
				render={(props) => {
					return <Component {...props} />;
				}}
			/>
		);
	} else{
        return <Redirect to="/" />
    }
};
