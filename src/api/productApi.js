import api from "./axios.js";

export const getProducts = (page = 1, limit = 10, search = "") =>
  api.get(`/products?page=${page}&limit=${limit}&search=${search}`);

export const createProduct = (formData) => api.post("/products", formData);

export const uploadCSVProducts = (formData) =>
  api.post("/products/csv", formData);

export const buyProduct = (payload) => api.post("/products/buy", payload);
