import axios from "axios";
import { url } from "./helper";

class Auth {
	constructor() {
		this.authenticated = false;
	}

	async login(username, password, cb) {
		this.authenticated = true;


        const loginResult = await axios.post(url("/auth/login"), {
            username: username,
            password: password,
        });

        if (loginResult.status === 200 && loginResult.data.msg === "success") {
            localStorage.setItem("accessToken", loginResult.data.accessToken);
            localStorage.setItem("refreshToken", loginResult.data.refreshToken);
            localStorage.setItem("authed", true);
        }
        

		cb();
	}

	logout(cb) {
		this.authenticated = false;

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('authed');

		cb();
	}

	isAuthenticated() {
		return this.authenticated;
	}
}

export default new Auth();
