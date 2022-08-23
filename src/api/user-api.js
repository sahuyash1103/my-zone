import axios_instance, { setTokenHeader } from "./axios";
import { removeToken } from "../services/authService";

const success = (event) => {
  // console.info(`success: ${event}`);
  return Promise.resolve(event);
};

const faliaure = (error) => {
  console.warn("AXIOS :", error.response.data);
  return Promise.reject(error);
};

axios_instance.interceptors.response.use(success, faliaure);

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const result = await axios_instance.post("login/", {
      email: email,
      password: password,
    });
    setTokenHeader(result.data.token);
    return result.data.token;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.warn(error.response.data);
    }
  }
};

export const signupUserWithEmailAndPassword = async (email, password) => {
  try {
    const result = await axios_instance.post("signup/", {
      username: email.slice(0, email.indexOf("@")),
      email: email,
      password: password,
    });
    setTokenHeader(result.headers["x-auth-token"]);
    return result.headers["x-auth-token"];
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.warn(error.response.data);
    }
  }
};

export const aboutMe = async () => {
  try {
    const result = await axios_instance.get("about-me/");

    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.warn(error.response.data);
    }
    removeToken();
  }
};

export const getCart = async () => {
  try {
    const result = await axios_instance.get("user/cart/");
    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.warn(error.response.data);
    }
    removeToken();
  }
};

export const addToCart = async (item_id) => {
  try {
    const result = await axios_instance.patch("user/add-to-cart/", {
      product_id: item_id,
    });

    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.warn(error.response.data);
    }
    removeToken();
  }
};

export const removeFromCart = async (item_id) => {
  try {
    const result = await axios_instance.patch("user/remove-from-cart/", {
      product_id: item_id,
    });

    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.warn(error.response.data);
    }
    removeToken();
  }
};

export const emptyCart = async () => {
  try {
    const result = await axios_instance.patch("user/empty-cart/");

    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.warn(error.response.data);
    }
    removeToken();
  }
}

export const getOrders = async () => {
  try {
    const result = await axios_instance.get("/orders/");

    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.warn(error.response.data);
    }
    removeToken();
  }
}

export const getOrder = async (id) => {
  try {
    const result = await axios_instance.get(`/orders/order/${id}`);

    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.warn(error.response.data);
    }
  }
}