import axios from "axios";
import { isEmpty, url } from "./helper";

class Auth {
	constructor() {
		this.authenticated = false;
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
				this.authenticated = true;
				localStorage.setItem(
					"accessToken",
					loginResult.data.accessToken
				);
				localStorage.setItem(
					"refreshToken",
					loginResult.data.refreshToken
				);
			}
			return this.authenticated;
		} catch (error) {
			this.authenticated = false;
			if (!isEmpty(error.response)) {
				this.errorText = JSON.stringify(error.response.data);
			} else {
				this.errorText = JSON.stringify(error.response.data);
			}
			return this.authenticated;
		}
	}

	logout(cb) {
		this.authenticated = false;
		localStorage.clear();

		cb();
	}

	async isAuthenticated() {
		const accessToken = localStorage.getItem("accessToken");

		// if (!isEmpty(accessToken)) {
		try {
			const authRes = await axios.post(
				url("/auth/verify"),
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			if (authRes.status === 200 && authRes.data.msg === "success") {
				this.authenticated = true;
			}
		} catch (error) {
			if (error.response.status === 401) {
				const refreshToken = localStorage.getItem("refreshToken");
				if (!isEmpty(refreshToken)) {
					try {
						const newAccessToken = await axios.post(
							url("/auth/refresh"),
							{
								token: refreshToken,
							}
						);

						localStorage.setItem(
							"accessToken",
							newAccessToken.data.accessToken
						);
						if (!isEmpty(newAccessToken.data.accessToken)) {
							this.authenticated = true;
							console.log("accessToken renewed");
							return this.authenticated;
						} else {
							this.authenticated = false;
						}
					} catch (errorx) {
						console.log("inner error --> ", console.log(errorx));
						this.authenticated = false;
					}
				} else {
					this.authenticated = false;
					return this.authenticated;
				}
			}
		}

		if (!this.authenticated) {
			localStorage.clear();
		}

		return this.authenticated;
	}

	isError() {
		return JSON.parse(this.errorText);
	}
}

export default new Auth();
