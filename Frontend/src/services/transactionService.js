import API from "./api";

export const getTransactions = async () => {
  const response = await API.get("/transactions");
  return response.data;
};

export const addTransaction = async (transaction) => {
  const response = await API.post("/transactions", transaction);
  return response.data;
};

export const updateTransaction = async (id, transaction) => {
  const response = await API.put(`/transactions/${id}`, transaction);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await API.delete(`/transactions/${id}`);
  return response.data;
};