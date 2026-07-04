import api from "./api";

export const historyService = {
  getHistory: async () => {
    const { data } = await api.get("/history");
    return data;
  },
};