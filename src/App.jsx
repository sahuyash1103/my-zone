import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ProtectedComponent from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useStateValue } from "./context/StateProvider";
import { useTitle } from "./hooks/useTitle";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Checkout from "./components/checkout/Checkout";
import Payment from "./components/payment/Payment";
import Orders from "./components/orders/Orders";
import Login from "./components/login/Login";
import { aboutMe } from "./api/user-api";
import { getToken, removeToken } from "./services/authService";
import "./App.css";
import ProductDetails from "./components/product_details/ProductDetails";

function App() {
  const [, dispatch] = useStateValue();
  const token = getToken()
  useTitle("MyZone");
  useEffect(() => {
    if (token) {
      aboutMe()
        .then((about) => {
          dispatch({
            type: "SET_USER",
            user: about
          });
        })
        .catch((error) => {
          removeToken();
          console.log(error);
        })
    }
  }, [token, dispatch]);

  return (
    <>
      <Router>
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
            path="/product/:product_id"
            element={
              <>
                <Header />
                <ProductDetails />
              </>
            }
          />

          <Route
            path="/checkout"
            element={<ProtectedComponent>
              <>
                <Header />
                <Checkout />
              </>
            </ProtectedComponent>}
          />

          <Route
            path="/payment"
            element={<ProtectedComponent>
              <>
                <Header />
                <Payment />
              </>
            </ProtectedComponent>
            }
          />

          <Route
            path="/orders"
            element={<ProtectedComponent>
              <>
                <Header />
                <Orders />
              </>
            </ProtectedComponent>}
          />

          <Route
            path="/login"
            element={!token ? <Login /> : <Navigate to="/" />}
          />

        </Routes>
      </Router>
    </>
  );
}

export default App;
