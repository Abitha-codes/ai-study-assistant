import api from "./api";

export const subjectService = {
  getAll: async (search = "") => {
    const res = await api.get("/subjects", { params: search ? { search } : {} });
    return res.data;
  },
  getOne: async (id) => {
    const res = await api.get(`/subjects/${id}`);
    return res.data;
  },
  create: async (data) => {
    const res = await api.post("/subjects", data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/subjects/${id}`, data);
    return res.data;
  },
  remove: async (id) => {
    const res = await api.delete(`/subjects/${id}`);
    return res.data;
  },
};
