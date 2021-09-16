import React, { useState } from "react";
import { url } from "../../helper";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Loginpage = (props) => {
	let history = useHistory();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const usernameChangeHandler = ({ target: { value } }) => {
		setUsername(value);
	};

	const passwordChangeHandler = ({ target: { value } }) => {
		setPassword(value);
	};

	const loginHandler = async () => {
		console.log(username, password);
		const loginResult = await axios.post(url("/auth/login"), {
			username: username,
			password: password,
		});

		if (loginResult.status === 200) {
			console.log("success login");
			props.setAccessToken(loginResult.data.accessToken);
			props.setRefreshToken(loginResult.data.refreshToken);

			history.push("/login");
			// console.log(props.accessToken);
		} else {
			console.log("failed");
		}
	};

	return (
		<div className="view">
			<div className="loginwrapper">
				<div className="centerwrapper">
                    <div className="centerwrapper__login">login</div>
					<label> Username </label>
					<input
						type="text"
						onChange={usernameChangeHandler}
						placeholder="zeno"
					/>
					<label> Password </label>
					<input
						type="text"
						onChange={passwordChangeHandler}
						placeholder="1245k"
					/>
					<button type="submit" value="submit" onClick={loginHandler}>
						login
					</button>
				</div>
			</div>
		</div>
	);
};

export default Loginpage;
