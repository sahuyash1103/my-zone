import axios from "axios";
import { toast } from "react-toastify";
import { getToken, removeToken } from "../services/authService";

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
    "x-auth-token": token || getToken(),
  };

  try {
    const result = await axios.get(
      process.env.REACT_APP_API_END_POINT + "about-me/",
      { headers }
    );

    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      removeToken();
      toast.warn(error.response.data);
    }
  }
};

export const getCart = async () => {
  const headers = {
    "x-auth-token": getToken(),
  };
  try {
    const result = await axios.get(
      process.env.REACT_APP_API_END_POINT + "user/cart/",
      { headers }
    );
    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.warn(error.response.data);
    }
  }
};

export const addToCart = async (item_id) => {
  const headers = {
    "x-auth-token": getToken(),
  };

  try {
    const result = await axios.patch(
      process.env.REACT_APP_API_END_POINT + "user/add-to-cart/",
      { product_id: item_id },
      { headers }
    );

    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.warn(error.response.data);
    }
  }
};

export const removeFromCart = async (item_id) => {
  const headers = {
    "x-auth-token": getToken(),
  };
  try {
    const result = await axios.patch(
      process.env.REACT_APP_API_END_POINT + "user/remove-from-cart/",
      { product_id: item_id },
      { headers }
    );

    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.warn(error.response.data);
    }
  }
};
