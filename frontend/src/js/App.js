import { BrowserRouter as Router, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
      {/* basename="C:/Users/LKGR8/Desktop/AnandPal/AnandPal/frontend/build" */}
      <div className="App">
        <NavigationBar />
        <ConnectWithUs />
        <Route path="/" component={HomePage} exact />
        <Route path="/about_us" component={AboutUs} />
        <Route path="/business" component={BusinessPage} />
        <Route path="/blogs" component={BlogPage} />
        <Route path="/shop" component={ShoppingCart} />
        <Route path="/checkout" component={CheckOut} />
        <ContactUs />
      </div>
    </Router>
  );
}

export default App;
