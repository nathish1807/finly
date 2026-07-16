import API from "./api";

export const getBudgets = async () => {
  const response = await API.get("/budgets");
  return response.data;
};

export const createBudget = async (budget) => {
  const response = await API.post("/budgets", budget);
  return response.data;
};

export const deleteBudget = async (id) => {
  const response = await API.delete(`/budgets/${id}`);
  return response.data;
};

export const updateBudget = async (id, budget) => {
  const response = await API.put(`/budgets/${id}`, budget);
  return response.data;
};