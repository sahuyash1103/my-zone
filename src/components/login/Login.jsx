import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <div className="login_logo">My-Zone</div>
      </Link>
      <div className="login_container">
        <h1>sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={signIn} className="login_signInButton">
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the MY-ZONE's Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button onClick={register} className="login_registerButton">
          Create your My-Zone Account
        </button>
      </div>
    </div>
  );
}

export default Login;
