import axios from "axios";
import { isEmpty, url, typeMatch } from "./helper";

class Auth {
	constructor() {
		this.authenticated = false;
		this.errorText = "";
		this.MAX_TIME = 10 * 60 * 1000;
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
				localStorage.setItem("timestamp", Date.now() + this.MAX_TIME);
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
		const timeStamp = localStorage.getItem("timestamp");

		if (isEmpty(timeStamp)) {
			localStorage.clear();
		}

		if (timeStamp - Date.now() >= 0) {
			this.authenticated = true;
		} else {
			const refreshToken = localStorage.getItem("refreshToken");

			try {
				const newAccessToken = await axios.post(url("/auth/refresh"), {
					token: refreshToken,
				});

				localStorage.setItem(
					"accessToken",
					newAccessToken.data.accessToken
				);
				localStorage.setItem("timestamp", Date.now() + this.MAX_TIME);
				if (!isEmpty(newAccessToken.data.accessToken)) {
					console.log("renewed token :) ");
					this.authenticated = true;
				} else {
                    console.log("refresh token expired :< ");
				}
			} catch (errorx) {
				console.log("renewed token error :(");
				localStorage.clear();
			}
		}
        
        return this.authenticated;

	}
}

export default new Auth();
