import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { aboutMe, loginWithEmailAndPassword, signupUserWithEmailAndPassword } from '../../api/api';
import './Login.css';
import { useStateValue } from '../../context/StateProvider';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [, dispatch] = useStateValue();

  const login = async (e) => {
    e.preventDefault();
    const token = await loginWithEmailAndPassword(email, password);
    if (token) {
      const about = await aboutMe(token);
      window.localStorage.setItem('x-auth-token', token);
      dispatch({
        type: "SET_USER",
        user: about
      });
      navigate('/');
    }
  };

  const signup = async (e) => {
    e.preventDefault();

    const token = await signupUserWithEmailAndPassword(email, password);
    if (token) {
      const about = await aboutMe(token);
      window.localStorage.setItem('x-auth-token', token);
      dispatch({
        type: "SET_USER",
        user: about
      });
      navigate('/');
    }
  };

  return (
    <div className='login'>
      <Link to='/'>
        <div className='login_logo'>My-Zone</div>
      </Link>
      <div className='login_container'>
        <h1>sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <div className="password_container">
            <input
              type={isVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div id="svg" onClick={() => setVisible(!isVisible)}>
              {isVisible ? <AiOutlineEye id='visible' /> :
                <AiOutlineEyeInvisible id='invisible' />}
            </div>
          </div>

          <button type='submit' onClick={login} className='login_signInButton'>
            Log In
          </button>
        </form>

        <p>
          By signing-in you agree to the MY-ZONE's Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button onClick={signup} className='login_registerButton'>
          Create your My-Zone Account
        </button>
      </div>
    </div>
  );
}

export default Login;
