import axios from "axios";
import { getToken } from "../services/authService";

/* Base URL to make request to the movie database */
const axios_instance = axios.create({
  baseURL: process.env.REACT_APP_API_END_POINT,
});

export const setTokenHeader = (token) => {
  axios_instance.defaults.headers.common["x-auth-token"] = token || getToken();
};

setTokenHeader();

export default axios_instance;
