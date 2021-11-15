import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// import Footer from "./components/views/Footer/Footer";
// import NavBar from "./components/views/NavBar/NavBar";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
				<Route exact path="/" element={<LandingPage />} />
				<Route exact path="/login" element={<LoginPage />} />
				<Route exact path="/register" element={<RegisterPage />} />
			</Routes>
    </Router>
  );
}

export default App;
