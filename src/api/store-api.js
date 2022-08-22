import axios_instance from "./axios";

export const getProdeucts = async () => {
  try {
    const result = await axios_instance.get("/products/");

    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.warn(error.response.data);
    }
  }
};

export const getBanners = async () => {
  try {
    const result = await axios_instance.get("/banners/");

    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.warn(error.response.data);
    }
  }
};

export const buy = async (products, total) => {
  try {
    const result = await axios_instance.post("/buy/", { products, total });

    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.warn(error.response.data);
    }
  }
};

export const payment = async () => {
  try {
    const result = await axios_instance.post("/pay/");

    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.warn(error.response.data);
    }
  }
};
