import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase/firebase";
import { useStateValue } from "./context/StateProvider";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Checkout from "./components/checkout/Checkout";
import Login from "./components/login/Login";
import "./App.css";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header /> <Home />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route path="/login" element={user ? <Login /> : <Navigate to="/"/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
