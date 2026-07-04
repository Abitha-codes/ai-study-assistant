import api from "./api";

export const plannerService = {
  getPlans: async () => {
    const { data } = await api.get("/planner");
    return data;
  },

  createPlan: async (plan) => {
    const { data } = await api.post("/planner", plan);
    return data;
  },

  togglePlan: async (id) => {
    const { data } = await api.patch(`/planner/${id}`);
    return data;
  },

  deletePlan: async (id) => {
    const { data } = await api.delete(`/planner/${id}`);
    return data;
  },
};