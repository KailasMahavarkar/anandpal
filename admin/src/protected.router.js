import axios from "axios";
import React, { useRef, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";
import { url, isEmpty } from "./helper";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				const AT = localStorage.getItem("accessToken");
				const RT = localStorage.getItem("refeshToken");

				if (isEmpty(AT) && isEmpty(RT)) {
					return (
						<Redirect
							to={{
								pathname: "/",
								state: {
									from: props.location,
								},
							}}
						/>
					);
				}

				if (auth.isAuthenticated()) {
					return <Component {...props} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: "/",
								state: {
									from: props.location,
								},
							}}
						/>
					);
				}
			}}
		/>
	);
};
