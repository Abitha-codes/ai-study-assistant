import api from "./api";

export const dashboardService = {
  getDashboard: async () => {
    const { data } = await api.get("/dashboard");
    return data;
  },
};