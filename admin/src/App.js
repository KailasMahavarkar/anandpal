import "../src/css/loop.css";
import "../src/css/index.css";

import { useState } from "react";
import Navbar from "./components/blocks/Navbar";
import Newblog from "./components/pages/Newblog";
import Blogpage from "./components/pages/Blogpage";
import Adminpage from "./components/pages/Adminpage";
import Login from "./components/pages/Loginpage";
import useLocalStorage from "./hooks/useLocalStorage";
import Logoutpage from "./components/pages/Logoutpage";
import axios from "axios";

import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";

import dotenv from "dotenv";
dotenv.config();

function App() {
	const [user, setUser] = useState({});
	const [err, setErr] = useState("");
    let history = useHistory();

	const [
        accessToken,
        setAccessToken,
        removeAccessToken
    ] = useLocalStorage("accessToken", "");

	const [
        refreshToken,
        setRefreshToken,
        removeRefreshToken
    ] = useLocalStorage("refreshToken","");

	const refresh = async (refreshToken) => {
		console.log("Refreshing token!");
		const newAccessToken = await axios.post(
			"http://localhost:1000/auth/refreshtoken",
			{ token: refreshToken }
		);
		setRefreshToken(newAccessToken);
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
                .then(async data => {
                    if (data.data.success === false) {
                        if (data.data.message === "User not authenticated") {
                            // setErr("Login again");
                            // set err message to login again.
                            history.push('/login');
                        } else if (
                            data.data.message === "Access token expired"
                        ) {
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
            // generate new accessToken
            accessToken = await refresh(refreshToken);
            return accessToken;
        }

        return accessToken;
    };

    const protect = async (accessToken, refreshtoken) => {

        accessToken = await hasAccess(accessToken, refreshToken);

        if (!accessToken) {
            console.log("---user not authorized");
        } else {
            await requestLogin(accessToken, refreshToken);
        }
    };


	return (
		<div className="App">
			<div className="container">
				<Router>
					<Navbar
						removeAccessToken={removeAccessToken}
						removeRefreshToken={removeRefreshToken}
                        protect={protect}
                        accessToken={accessToken}
                        refreshToken={refreshToken}
					/>
					<Switch>
						<Route exact path="/">
							<Blogpage />
						</Route>
						<Route exact path="/admin">
							<Adminpage />
						</Route>
						<Route exact path="/newblog">
							<Newblog />
						</Route>
						<Route exact path="/login">
							<Login
								accessToken={accessToken}
								setAccessToken={setAccessToken}
								setRefreshToken={setRefreshToken}
								refreshToken={refreshToken}
                                protect={protect}
							/>
						</Route>
						<Route exact path="/logout">
							<Logoutpage
								removeAccessToken={removeAccessToken}
								removeRefreshToken={removeRefreshToken}
							/>
						</Route>
					</Switch>
				</Router>
			</div>
		</div>
	);
}

export default App;
