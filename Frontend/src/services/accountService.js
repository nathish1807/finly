import API from "./api";

// Get all accounts
export const getAccounts = async () => {
  const response = await API.get("/accounts");
  return response.data;
};