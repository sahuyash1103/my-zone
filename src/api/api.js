import axios from "axios";
import { toast } from "react-toastify";

const success = (event) => {
  // console.info(`success: ${event}`);
  return Promise.resolve(event);
};

const faliaure = (error) => {
  console.warn("AXIOS :", error.response.data);
  return Promise.reject(error);
};

axios.interceptors.response.use(success, faliaure);

export const loginWithEmailAndPassword = async (email, password) => {
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
};

export const signupUserWithEmailAndPassword = async (email, password) => {
  try {
    const result = await axios.post(
      process.env.REACT_APP_API_END_POINT + "signup/",
      {
        username: email.slice(0, email.indexOf("@")),
        email: email,
        password: password,
      }
    );
    return result.headers["x-auth-token"];
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.warn(error.response.data);
    }
  }
};

export const aboutMe = async (token = "") => {
  const headers = {
    "x-auth-token": token || window.localStorage.getItem("x-auth-token"),
  };

  try {
    const result = await axios.get(
      process.env.REACT_APP_API_END_POINT + "about-me/",
      { headers }
    );

    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.warn(error.response.data);
    }
  }
};
