import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import PageContainer from "../../components/PageContainer/PageContainer";
import Card from "../../components/Card/Card";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../../services/profileService";

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setForm({
        name: data.user.name,
        email: data.user.email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(form);

      toast.success("Profile Updated");

      setIsEditing(false);
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  const handleChangePassword = async () => {
    if (password.newPassword !== password.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await changePassword({
        currentPassword: password.currentPassword,
        newPassword: password.newPassword,
      });

      toast.success("Password Changed");

      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowPassword(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Password Change Failed"
      );
    }
  };

  return (
    <MainLayout>
      <PageContainer>
<Card className="max-w-3xl mx-auto p-5 sm:p-8 rounded-2xl shadow-lg">
<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8">            My Profile
          </h1>

          {/* VIEW MODE */}

          {!isEditing && !showPassword && (
            <>
              <div className="space-y-6">

                <div>
                  <p className="text-gray-500">
                    Full Name
                  </p>

                  <p className="text-xl font-semibold mt-1">
                    {form.name}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Email
                  </p>

                  <p className="text-xl font-semibold mt-1">
                    {form.email}
                  </p>
                </div>

              </div>

<div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={() => setIsEditing(true)}
className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"                >
                  Edit Profile
                </button>

                <button
                  onClick={() => setShowPassword(true)}
className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition"                >
                  Change Password
                </button>

              </div>
            </>
          )}

          {/* EDIT PROFILE */}

          {isEditing && (
            <>
              <div className="space-y-4">

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"                />

              </div>

              <div className="flex gap-4 mt-6">

                <button
                  onClick={handleUpdateProfile}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                  Save Changes
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-lg"
                >
                  Cancel
                </button>

              </div>
            </>
          )}

          {/* CHANGE PASSWORD */}

          {showPassword && (
            <>
              <div className="space-y-4">

                <input
                  type="password"
                  placeholder="Current Password"
                  value={password.currentPassword}
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

                <input
                  type="password"
                  placeholder="New Password"
                  value={password.newPassword}
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={password.confirmPassword}
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <div className="flex gap-4 mt-6">

                <button
                  onClick={handleChangePassword}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
                >
                  Update Password
                </button>

                <button
                  onClick={() => setShowPassword(false)}
                  className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-lg"
                >
                  Cancel
                </button>

              </div>
            </>
          )}

        </Card>
      </PageContainer>
    </MainLayout>
  );
}