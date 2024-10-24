import axios from "axios";

const API_URL = "http://localhost:5000/api";

// frontend/services/api.js

export const getProducts = async (page = 1, limit = 10) => {
  const response = await fetch(`/api/products?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

export const placeOrder = async (order) => {
  const response = await axios.post(`${API_URL}/orders`, order);
  return response.data;
};
