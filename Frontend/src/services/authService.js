import API from "./api";

// Register
export const register = async (userData) => {
  const response = await API.post("/auth/register", {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    bankName: userData.bankName,
  });

  return response.data;
};

// Login
export const login = async (userData) => {
  const response = await API.post("/auth/login", {
    email: userData.email,
    password: userData.password,
  });

  localStorage.setItem("token", response.data.token);

  return response.data;
};

// Dashboard
export const getDashboard = async () => {
  const response = await API.get("/dashboard");
  return response.data;
};
export const forgotPassword=async(email)=>{

const response=await API.post("/auth/forgot-password",{

email,

});

return response.data;

};

export const resetPassword=async(data)=>{

const response=await API.post("/auth/reset-password",data);

return response.data;

};
// Logout
export const logout = () => {
  localStorage.removeItem("token");
};

// Authentication
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};