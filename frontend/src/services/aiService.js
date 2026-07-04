import api from "./api";

export const aiService = {
  generateSummary: async (noteId) => {
    const res = await api.post(`/ai/summary/${noteId}`);
    return res.data;
  },
};