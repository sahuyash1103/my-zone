import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(success, faliaure);

function success(event) {
  toast.success(`success: ${event}`);
  return Promise.resolve(event);
}

function faliaure(error) {
  console.warn("AXIOS :", error.response.data);
  return Promise.reject(error);
}

async function loginWithEmailAndPassword(email, password) {
  try {
    const result = await axios.post(
      process.env.REACT_APP_API_END_POINT + "login/",
      {
        email: email,
        password: password,
      }
    );
    return result.data.token;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.warn(error.response.data);
    }
  }
}

async function signupUserWithEmailAndPassword(email, password) {
  try {
    const result = await axios.post(
      process.env.REACT_APP_API_END_POINT + "signup/",
      {
        name: email,
        email: email,
        password: password,
      }
    );
    console.log(result);
    return result.headers["x-auth-token"];
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.warn(error.response.data);
    }
  }
}

let auth = {
  loginWithEmailAndPassword,
  signupUserWithEmailAndPassword,
};

export default auth;
