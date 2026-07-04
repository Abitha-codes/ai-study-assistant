import api from "./api";

export const chatService = {
  askQuestion: async (noteId, question) => {
    const { data } = await api.post(`/chat/${noteId}`, {
      question,
    });

    return data;
  },
};