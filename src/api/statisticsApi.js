import api from "./axios";

export const getStatisticsSummary = async () => {
  const { data } = await api.get("/statistics/summary");
  return data;
};

export const getStatisticsGraph = async (range = "monthly") => {
  const { data } = await api.get("/statistics/graph", {
    params: { range },
  });
  return data;
};

export const getStatisticsTopProducts = async () => {
  const { data } = await api.get("/statistics/top-products");
  return data;
};
