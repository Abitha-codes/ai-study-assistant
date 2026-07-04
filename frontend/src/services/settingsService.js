import api from "./api";

export const settingsService = {
  changePassword: async (passwords) => {
    const { data } = await api.put("/settings/password", passwords);
    return data;
  },
};