import api from "./axios";

export const getDashboardGraph = (range) =>
  api.get(`/dashboard/graph?range=${range}`);

export const getDashboardSummary = () => api.get("/dashboard/summary");

export const getHomeDashboard = () => api.get("/dashboard/home");

export const getTopProducts = () => api.get("/dashboard/top-products");

export const getLowStock = () => api.get("/dashboard/low-stock");

export const getExpiringProducts = () => api.get("/dashboard/expiring");

export const getTopStats = () => api.get("/dashboard/top-stats");
