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
import PrivateRouter from './provider/PrivateRoute';

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

	const { authed, login, logout } = useAuth();

    // console.log(logout);



	


	return (
		<div className="App">
			<AuthProvider>
				<div className="container">
					<BrowserRouter>
						<Routes>
							<PrivateRouter path="/" authed={authed}>
								<Loginpage 
                                    authed={authed}
                                    login={login}
                                    logout={logout}
                                 />
							</PrivateRouter >
							<Route path="login">
								<Loginpage
                                    authed={authed}
                                    login={login}
                                    logout={logout} />
							</Route>
							<Route path="admin">
								<Adminpage />
							</Route>
							<Route path="newblog">
								<Newblog />
							</Route>
							<PrivateRouter path="blogs" authed={authed}>
                                {/* <Adminpage /> */}
								<Blogpage />
							</PrivateRouter>
							<Route path="logout" logout={logout}>
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
