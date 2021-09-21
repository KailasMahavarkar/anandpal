import "../src/css/loop.css";
import "../src/css/index.css";

import React, { useEffect, useState } from "react";

import Navbar from "./components/blocks/Navbar";
import Newblog from "./components/pages/Newblog";
import Blogpage from "./components/pages/Blogpage";
import Adminpage from "./components/pages/Adminpage";
import Loginpage from "./components/pages/Loginpage";
import Logoutpage from "./components/pages/Logoutpage";
import x404 from './components/pages/x404'
import axios from "axios";
import { ProtectedRoute } from "./protected.router";


import {
	Switch,
	Route,
	useHistory,
} from "react-router-dom";

import dotenv from "dotenv";
dotenv.config();

function App(props) {
	return (
		<div className="App">
			<Switch>
                {/* pattern for base route */}
				<Route exact path="/" component={Loginpage} />
                <ProtectedRoute exact path="/blogs" component={Blogpage}  />
                <ProtectedRoute exact path="/newblog" component={Newblog}  />
                <ProtectedRoute exact path="/admin" component={Adminpage}  />
                {/* pattern for unknown routes */}
                <Route path="*" component={x404} />                    
			</Switch>
		</div>
	);
}

export default App;
