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

export const getProdeuct = async (id) => {
  try {
    const result = await axios_instance.get(`/products/product/${id}`);

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

export const buyProducts = async (products, total) => {
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
