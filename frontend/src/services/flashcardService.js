import api from "./api";

export const flashcardService = {
  generate: async (noteId) => {
    const res = await api.post(`/flashcards/${noteId}`);
    return res.data;
  },
};