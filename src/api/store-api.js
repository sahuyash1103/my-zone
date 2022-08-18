import axios from "axios";
import { toast } from "react-toastify";

export const getProdeucts = async () => {
  try {
    const result = await axios.get(
      process.env.REACT_APP_API_END_POINT + "products/"
    );

    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.warn(error.response.data);
    }
  }
};

export const getBanners = async () => {
  try {
    const result = await axios.get(
      process.env.REACT_APP_API_END_POINT + "banners/"
    );

    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.warn(error.response.data);
    }
  }
};
