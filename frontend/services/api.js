import axios from "axios";

const API_URL = "https://e-commerce-jczk.onrender.com/api";

export const getProducts = async (page = 1, limit = 10) => {
  const response = await axios.get(
    `${API_URL}/products?page=${page}&limit=${limit}`
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch products");
  }

  return response.data;
};

export const placeOrder = async (products, total, user) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/orders`,
    { products, total, user },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};
