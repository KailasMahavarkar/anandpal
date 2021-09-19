import "../src/css/loop.css";
import "../src/css/index.css";

import { useState, useEffect } from "react";
import Navbar from "./components/blocks/Navbar";
import Newblog from "./components/pages/Newblog";
import Blogpage from "./components/pages/Blogpage";
import Adminpage from "./components/pages/Adminpage";
import Loginpage from "./components/pages/Loginpage";
import Logoutpage from "./components/pages/Logoutpage";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth, AuthProvider } from "./hooks/useAuth";

import {
	BrowserRouter,
	Routes,
	Route,
	Link,
	useNavigate,
} from "react-router-dom";

import dotenv from "dotenv";
dotenv.config();

function App() {
	const [user, setUser] = useState({});
	const [err, setErr] = useState("");
	const { authed } = useAuth();


	const refresh = async (refreshToken) => {
		console.log("Refreshing token!");
		const newAccessToken = await axios.post(
			"http://localhost:1000/auth/refreshtoken",
			{ token: refreshToken }
		);
		Cookies.set("accessToken", newAccessToken);
	};

	const requestLogin = async (accessToken, refreshToken) => {
		console.log(accessToken, refreshToken);
		return new Promise((resolve, reject) => {
			axios
				.post(
					"http://localhost:1000/auth/verify",
					{},
					{ headers: { authorization: `Bearer ${accessToken}` } }
				)
				.then(async (data) => {
					if (data.data.success === false) {
						if (data.data.msg === "User not authenticated") {
							setErr("Login again");
						} else if (data.data.msg === "Access token expired") {
							const accessToken = await refresh(refreshToken);
							return await requestLogin(
								accessToken,
								refreshToken
							);
						}

						resolve(false);
					} else {
						// protected route has been accessed, response can be used.
						setErr("Protected route accessed!");
						resolve(true);
					}
				});
		});
	};

	const hasAccess = async (accessToken, refreshToken) => {
		if (!refreshToken) return null;

		if (accessToken === undefined) {
			accessToken = await refresh(refreshToken);
			return accessToken;
		}
		return accessToken;
	};

	const protectWrapper = async (e) => {
		let accessToken = Cookies.get("accessToken");
		let refreshToken = Cookies.get("refreshToken");
		accessToken = await hasAccess(accessToken, refreshToken);

		if (!accessToken) {
			window.location.href = "/";
		} else {
			return await requestLogin(accessToken, refreshToken);
		}
	};

	const protect = async () => {
		const res = protectWrapper();
		if (!res) {
			// history.push('/');
		}
	};

	return (
		<div className="App">
			<AuthProvider>
				<div className="container">
					<BrowserRouter>
						<Routes>
							<Route path="/">
								<Loginpage authed={authed} />
							</Route>
							<Route path="/login">
								<Loginpage authed={authed} />
							</Route>
							<Route path="/admin">
								<Adminpage protect={protect} />
							</Route>
							<Route path="/newblog">
								<Newblog protect={protect} />
							</Route>
							<Route path="/blogs">
								<Blogpage protect={protect} />
							</Route>
							<Route path="/logout">
								<Logoutpage />
							</Route>
						</Routes>
					</BrowserRouter>
				</div>
			</AuthProvider>
		</div>
	);
}

export default App;
