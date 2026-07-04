import api from "./api";

export const quizService = {
  generate: async (noteId) => {
    const res = await api.post(`/quiz/${noteId}`);
    return res.data;
  },
};