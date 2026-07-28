import API from "./api";

export const getProfile = async () => {
  const response = await API.get("/profile");
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await API.put("/profile", data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await API.put("/profile/password", data);
  return response.data;
};
export const uploadProfilePhoto = async (file) => {
  const formData = new FormData();

  formData.append("profileImage", file);

  const response = await API.post(
    "/profile/upload-photo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};