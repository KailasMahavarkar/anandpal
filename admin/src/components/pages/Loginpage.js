import React, { useState, useEffect } from "react";
import { url } from "../../helper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../../hooks/useAuth";

const Loginpage = (props) => {
	let navigate = useNavigate();

	useEffect(async () => {
		if (props.authed) {
			navigate("/blogs");
		}
	}, []);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const usernameChangeHandler = ({ target: { value } }) => {
		setUsername(value);
	};

	const passwordChangeHandler = ({ target: { value } }) => {
		setPassword(value);
	};

	const loginHandler = async () => {
		const loginResult = await axios.post(url("/auth/login"), {
			username: username,
			password: password,
		});

		console.log("login data -->", loginResult);
        console.log("authed status --> ", props.authed)

		if (loginResult.status === 200 && loginResult.data.msg === "success") {
			Cookies.set("accessToken", loginResult.data.accessToken);
			Cookies.set("refreshToken", loginResult.data.refreshToken);
            await props.login();
			navigate("/blogs");
		} else {
			Cookies.remove("accessToken");
			Cookies.remove("refreshToken");
            await props.logout();
			navigate("/login");
		}
	};

	return (
		<div className="view">
			<div className="loginwrapper">
				<div className="centerwrapper">
					<div className="centerwrapper__section">
						<input
							type="text"
							onChange={usernameChangeHandler}
							placeholder="*Username"
							className="centerwrapper__section__input"
							required={true}
						/>
					</div>
					<div className="centerwrapper__section">
						<input
							type="text"
							onChange={passwordChangeHandler}
							placeholder="*Password"
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
		</div>
	);
};

export default Loginpage;
