import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// import Footer from "./components/views/Footer/Footer";
// import NavBar from "./components/views/NavBar/NavBar";
import Auth from "./hoc/auth"
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <Switch>
				<Route exact path="/" component={Auth(LandingPage, null)} />
				<Route exact path="/login" component={Auth(LoginPage, false)} />
				<Route exact path="/register" component={Auth(RegisterPage, false)} />
			</Switch>
    </Router>
  );
}

export default App;
