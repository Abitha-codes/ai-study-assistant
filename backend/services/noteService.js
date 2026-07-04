import api from "./api";

export const noteService = {
  getAll: async () => {
    const res = await api.get("/notes");
    return res.data;
  },

  upload: async (formData) => {
    const res = await api.post("/notes/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  remove: async (id) => {
    const res = await api.delete(`/notes/${id}`);
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/notes/${id}`);
    return res.data;
  },
};