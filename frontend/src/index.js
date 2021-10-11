import React from "react";
import ReactDOM from "react-dom";
import App from "./js/App";

// SCSS
import "./scss/main.scss";
// to work with store in redux
import { createStore } from "redux";

// to implement the redux with react
import { Provider } from "react-redux";

// to implement switch
import { BrowserRouter as Router } from "react-router-dom";

// all the reducer after combining
import rootReducers from "../src/js/redux/reducers";

// creating a store
let store = createStore(
	rootReducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
