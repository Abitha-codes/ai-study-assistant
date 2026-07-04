import api from "./api";

export const profileService = {
  getProfile: async () => {
    const { data } = await api.get("/profile");
    return data;
  },

  updateProfile: async (userData) => {
    const { data } = await api.put("/profile", userData);
    return data;
  },

  deleteAccount: async () => {
    const { data } = await api.delete("/profile");
    return data;
  },
};