import axios from "axios";
import { isEmpty, url, typeMatch } from "./helper";

class Auth {
	constructor() {
		this.errorText = "";
	}

	async login(username, password, cb) {
		try {
			localStorage.clear();
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
			}
			return this.authenticated;
		} catch (error) {
			if (!isEmpty(error.response)) {
				this.errorText = JSON.stringify(error.response.data);
			} else {
				this.errorText = JSON.stringify(error.response.data);
			}
		}
	}

	logout(cb) {
		this.authenticated = false;
		localStorage.clear();

		cb();
	}

	isAuthenticated() {
		const accessToken = localStorage.getItem("accessToken");

		if (accessToken) {
			return true;
		} else {
			localStorage.clear();

			try {
				axios
					.post(url("/auth/verify"), {
						token: accessToken,
					})
					.then((result) => {
						localStorage.setItem(
							"accessToken",
							result.data.accessToken
						);
					})
					.catch((error) => {
						localStorage.setItem("authed", false);
					});
			} catch (errorx) {
				console.log("renewed token error :(");
			}
		}
		return false;
	}
}

export default new Auth();
