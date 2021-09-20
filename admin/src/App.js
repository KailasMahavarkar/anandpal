import "../src/css/loop.css";
import "../src/css/index.css";

import React, {
	useEffect,
	createContext,
	useReducer,
	useContext,
	useState,
} from "react";
import Navbar from "./components/blocks/Navbar";
import Newblog from "./components/pages/Newblog";
import Blogpage from "./components/pages/Blogpage";
import Adminpage from "./components/pages/Adminpage";
import Loginpage from "./components/pages/Loginpage";
import Logoutpage from "./components/pages/Logoutpage";
import axios from "axios";
// import { AuthProvider } from "./hooks/useAuth";
// import PrivateRouter from "./provider/PrivateRoute";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory,
} from "react-router-dom";

import dotenv from "dotenv";
dotenv.config();

const ACTIONS = {
	LOGIN: "login",
	LOGOUT: "logout",
};
// const ACTIONS = {
//     INCREMENT: 'increment',
//     DECREMENT: 'decrement'
// }

const refresh = async (refreshToken) => {
	console.log("Refreshing token!");
	const newAccessToken = await axios.post(
		"http://localhost:1000/auth/refreshtoken",
		{ token: refreshToken }
	);
	localStorage.setItem("accessToken", newAccessToken);
};

const hasAccess = async (accessToken, refreshToken) => {
	if (!refreshToken) return null;

	if (accessToken === undefined) {
		accessToken = await refresh(refreshToken);
		return accessToken;
	}
	return accessToken;
};

export const UserContext = createContext();

const Routing = () => {
	const [authed, setAuthed] = useState(false);
	const [state, dispatch] = useReducer(reducer, { authed: false });
	const history = useHistory();

	function reducer(state, action) {
		switch (action.type) {
			case ACTIONS.LOGIN:
				return { authed: true };
			case ACTIONS.LOGOUT:
				return { authed: false };
			default:
				return state;
		}
	}

	const loginHandler = async () => {
		dispatch({ type: ACTIONS.LOGIN });
	};

	const logoutHandler = () => {
		dispatch({ type: ACTIONS.LOGOUT });
	};

	useEffect(() => {
		const currentAuthed = JSON.parse(localStorage.getItem("authed"));
		console.log("curr authed ->", currentAuthed);
		if (currentAuthed) {
			dispatch({ type: ACTIONS.LOGIN });
			history.push("/blogs");
		} else {
			history.push("/login");
		}
	}, [dispatch]);

	return (
		<div className="container">
			<Switch>
                {<h1>Hello</h1>}}
				<Route exact path="/">
					<Navbar />
				</Route>
				<Route path="/admin">
					<Navbar />
					<Adminpage />
				</Route>

				<Route path="/newblog">
					<Navbar />
					<Newblog />
				</Route>

				<Route exact path="/logout">
					<Logoutpage loginHandler={logoutHandler} />
				</Route>

			</Switch>
		</div>
	);
};

function App(props) {
	const state = props.state;
	const dispatch = props.dispatch;
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<Router>
				<Routing />
			</Router>
		</UserContext.Provider>
	);
}

export default App;
