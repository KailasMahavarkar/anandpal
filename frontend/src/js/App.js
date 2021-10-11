import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./components/HomePage";
import ContactUs from "./components/ContactUs";
import BusinessPage from "./components/BusinessPage";
import BlogPage from "./components/BlogPage";
import ConnectWithUs from "./components/ConnectWithUs";

import "animate.css/animate.min.css";
import ShoppingCart from "./components/ShoppingCart";
import CheckOut from "./components/Cart/CheckOut";

// import { library } from "@fortawesome/fontawesome-svg-core";

// library.add(fab);
//  basename="C:/Users/LKGR8/Desktop/AnandPal/AnandPal/frontend/build"

function App() {
	return (
		<div className="App">
			<NavigationBar />
			<ConnectWithUs />

			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/about_us" component={AboutUs} />
				<Route exact path="/business" component={BusinessPage} />
				<Route exact path="/blogs" component={BlogPage} />
				<Route exact path="/shop" component={ShoppingCart} />
				<Route exact path="/checkout" component={CheckOut} />
			</Switch>
			<ContactUs />
		</div>
	);
}

export default App;
