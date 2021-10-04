import axios from "axios";
import { isEmpty, url } from "./helper";

class Auth {
	constructor() {
		this.authenticated = false;
	}

	async login(username, password, cb) {
		try {
			const loginResult = await axios.post(url("/auth/login"), {
				username: username,
				password: password,
			});

			if (
				loginResult.status === 200 &&
				loginResult.data.msg === "success"
			) {
				localStorage.setItem(
					"accessToken",
					loginResult.data.accessToken
				);
				localStorage.setItem(
					"refreshToken",
					loginResult.data.refreshToken
				);
				localStorage.setItem("authed", true);
				this.authenticated = true;
			}
		} catch (error) {
			this.authenticated = false;
			if (!isEmpty(error.response)) {
				localStorage.setItem(
					"errorText",
					JSON.stringify(error.response.data)
				);
				console.log("loginResult", error.response);
			} else {
				localStorage.setItem(
					"errorText",
					JSON.stringify({ msg: "Server is Down" })
				);
			}
		}

		cb();
	}

	logout(cb) {
		this.authenticated = false;

		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("authed");

		cb();
	}

	isAuthenticated() {
		return this.authenticated;
	}
}

export default new Auth();
