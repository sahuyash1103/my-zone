import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useStateValue } from "./context/StateProvider";
import { useTitle } from "./hooks/useTitle";
import { ToastContainer } from "react-toastify";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Checkout from "./components/checkout/Checkout";
import Payment from "./components/payment/Payment";
import Orders from "./components/orders/Orders";
import Login from "./components/login/Login";
import { aboutMe } from "./api/api";
import "react-toastify/dist/ReactToastify.css"
import "./App.css";


function App() {
  const [{ user }, dispatch] = useStateValue();
  const token = window.localStorage.getItem('x-auth-token');
  useTitle("MyZone");
  useEffect(() => {
    console.log("API END POINT: ", process.env.REACT_APP_API_END_POINT);
    if (token) {
      aboutMe()
        .then((about) => {
          dispatch({
            type: "SET_USER",
            user: about
          });
        })
        .catch((error) => console.log(error))
    }
  }, [token, dispatch]);

  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
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
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Payment />
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
