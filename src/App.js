import "./Styles/app.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import NavPhone from "./components/NavPhone";

function App() {
  const [user] = useAuthState(auth);
  const [navOn, setNavON] = useState(false);

  return (
    <div className="App">
      <Router>
        <NavPhone navOn={navOn} setNavON={setNavON} />
        <Routes>
          <Route
            path="/"
            element={!user ? <Login /> : <Navigate to="/home" />}
          />

          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/home"
            element={
              user ? (
                <Home navOn={navOn} setNavON={setNavON} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
