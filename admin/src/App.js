import "../src/css/loop.css";
import "../src/css/index.css";

import Newblog from "./components/pages/Newblog";
import Blogpage from "./components/pages/Blogpage";
import Adminpage from "./components/pages/Adminpage";
import Navbar from "./components/blocks/Navbar";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	Link,
	useHistory,
} from "react-router-dom";


const log = console.log;

function App() {
	let history = useHistory();

	return (
		<div className="App">
			<div className="container">
                <Navbar />
				<Router>
					<Switch>
						<Route path="/admin">
							<Adminpage history={history} />
						</Route>
						<Route path="/newblog">
							<Newblog history={history} />
						</Route>
						<Route path="/">
							<Blogpage history={history} />
						</Route>
					</Switch>
				</Router>
			</div>
		</div>
	);
}

export default App;
