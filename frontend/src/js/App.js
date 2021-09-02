import { BrowserRouter as Router, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./components/HomePage";
import ContactUs from "./components/ContactUs";
import BusinessPage from "./components/BusinessPage";

// import { library } from "@fortawesome/fontawesome-svg-core";

// library.add(fab);

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Route path="/" component={HomePage} exact />
        <Route path="/about_us" component={AboutUs} />
        <Route path="/business" component={BusinessPage} />
        <ContactUs />
      </div>
    </Router>
  );
}

export default App;
