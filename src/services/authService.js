export const getToken = () => {
  return window.localStorage.getItem("x-auth-token");
};

export const setToken = (token) => {
  window.localStorage.setItem("x-auth-token", token);
};

export const removeToken = () => {
  window.localStorage.removeItem("x-auth-token");
};
