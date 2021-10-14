import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {

    // redirect when there is no refresh token
    if (!localStorage.getItem('refreshToken')){
        return <Redirect to="/" />
    }

    if (!localStorage.getItem('accessToken')){
        return <Redirect to="/" />
    }

	if(auth.isAuthenticated()){
		return <Route
			{...rest}
			render={(props) => {
				return <Component {...props} />;
			}}
		/>
    }else{
        return <Redirect to="/" />
    }
};