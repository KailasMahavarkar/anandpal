import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import auth from "../../auth";
import { isEmpty } from "../../helper";
import customToast from "../blocks/swal/customToast";

const Loginpage = (props) => {
	const history = useHistory();

	// const history = useHistory();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const usernameChangeHandler = ({ target: { value } }) => {
		setUsername(value);
	};
	const passwordChangeHandler = ({ target: { value } }) => {
		setPassword(value);
	};

	// 'top' | 'top-start' | 'top-end' | 'top-left' | 'top-right' |
	// 'center' | 'center-start' | 'center-end' | 'center-left' | 'center-right' |
	// 'bottom' | 'bottom-start' | 'bottom-end' | 'bottom-left' | 'bottom-right';
	const loginHandler = async () => {
		try {
			await auth.login(username, password, () => {
				history.push("/blogs");
			});

			if (!auth.isAuthenticated() && auth.isError()) {
				const { msg, error } = auth.isError();
				customToast("error", msg);
			}

			if (auth.isAuthenticated()) {
				customToast("success", "Logged in successfully");
			}
		} catch (error) {
			if (!isEmpty(error)) {
				customToast("error", error.respose.data);
				setTimeout(() => {
					customToast(
						"error",
						`Error Code ${error.respose.data}`,
						6000
					);
				}, 4000);
			} else {
				customToast("error", "connection to backend failed", 6000);
			}
		}
	};

	return (
		<div className="loginwrapper">
			<div className="centerwrapper">
				<div className="centerwrapper__section centerwrapper__adminlogin">
					Admin Login
				</div>
				<div className="centerwrapper__section">
					<input
						type="text"
						onChange={usernameChangeHandler}
						placeholder="Username"
						className="centerwrapper__section__input"
						required={true}
					/>
				</div>
				<div className="centerwrapper__section">
					<input
						type="password"
						onChange={passwordChangeHandler}
						placeholder="Password"
						className="centerwrapper__section__input"
						required={true}
					/>
				</div>
				<div className="centerwrapper__section">
					<button
						className="centerwrapper__section__button"
						type="submit"
						value="submit"
						onClick={loginHandler}
					>
						login
					</button>
				</div>
			</div>
		</div>
	);
};

export default Loginpage;
