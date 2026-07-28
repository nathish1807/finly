import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import PageContainer from "../../components/PageContainer/PageContainer";
import Card from "../../components/Card/Card";

import {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfilePhoto,
} from "../../services/profileService";

import { getDashboard } from "../../services/authService";

export default function Profile() {
 const [form, setForm] = useState({
  name: "",
  email: "",
  bankName: "",
  createdAt: "",
});
  const [stats, setStats] = useState({
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
  transactions: 0,
  budgets: 0,
});

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
const [selectedImage, setSelectedImage] = useState("");
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    loadProfile();
loadStats();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setForm({
  name: data.user.name,
  email: data.user.email,
  bankName: data.user.bankName || "",
  createdAt: data.user.createdAt,
  profileImage: data.user.profileImage || "",
});
    } catch (error) {
      console.log(error);
    }
  };
const loadStats = async () => {
  try {
    const data = await getDashboard();

    setStats({
      totalIncome: data.totalIncome,
      totalExpense: data.totalExpense,
      balance: data.balance,
      transactions: data.recentTransactions.length,
      budgets: data.totalBudgets || 0,
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
const handlePhotoUpload = async (e) => {
  try {
    const file = e.target.files[0];

    if (!file) return;

    const data = await uploadProfilePhoto(file);

    setForm((prev) => ({
      ...prev,
      profileImage: data.profileImage,
    }));

    setSelectedImage(URL.createObjectURL(file));

    toast.success("Profile photo updated");

  } catch (error) {
    toast.error("Upload failed");
  }
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
<Card
className="
relative
overflow-hidden
max-w-5xl
mx-auto
rounded-[30px]

bg-gradient-to-br
from-[#181818]
via-[#151515]
to-[#101010]
shadow-[0_25px_70px_rgba(0,0,0,.45)]
"
>
  <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#FFD700]/10 blur-[120px]" />

<div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#8B5E3C]/10 blur-[120px]" />

<div className="relative z-10 p-6 sm:p-10">
<div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">

<div className="relative">

  <img
    src={
      selectedImage
        ? selectedImage
        : form.profileImage
        ? `http://localhost:5000${form.profileImage}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=D4AF37&color=000`
    }
    alt="Profile"
    className="
      h-32
      w-32
      rounded-full
      object-cover
    
      shadow-[0_0_30px_rgba(212,175,55,.35)]
    "
  />

  <label
    className="
absolute
bottom-1
right-1
h-11
w-11
rounded-full
bg-gradient-to-r
from-[#8B5E3C]
to-[#D4AF37]
text-white
border-2
border-[#0E0E0E]
shadow-[0_0_15px_rgba(212,175,55,.35)]
flex
items-center
justify-center
hover:scale-110
transition-all
duration-300
"
  >
    📷

    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handlePhotoUpload}
    />
  </label>

</div>

<div>

<h1 className="text-4xl font-bold text-white">

{form.name}

</h1>

<p className="mt-2 text-gray-400">

Personal Finance User

</p>

<p className="mt-2 text-[#FFD700]">

Member

</p>

</div>

</div>



          {/* VIEW MODE */}

          {!isEditing && !showPassword && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

<Card className="p-5">

<p className="text-gray-400 text-sm">
Full Name
</p>

<h3 className="mt-3 text-xl font-bold text-white">
{form.name}
</h3>

</Card>

<Card className="p-5">

<p className="text-gray-400 text-sm">
Email Address
</p>

<h3 className="mt-3 text-xl font-bold text-white break-all">
{form.email}
</h3>

</Card>

<Card className="p-5">

<p className="text-gray-400 text-sm">
Bank
</p>

<div className="flex items-center gap-2 mt-2">
  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>
  <span className="mt-2 text-red-400 font-medium">
    Not Connected
  </span>
</div>

</Card>

<Card className="p-5">

<p className="text-gray-400 text-sm">
Joined
</p>

<h3 className="mt-3 text-xl font-bold text-white">

{
form.createdAt
?new Date(form.createdAt).toLocaleDateString()
:"-"
}

</h3>

</Card>

<Card className="p-5">

<p className="text-gray-400 text-sm">
Account Status
</p>

<h3 className="mt-3 text-xl font-bold text-green-400">

● Active

</h3>

</Card>

<Card className="p-5">

<p className="text-gray-400 text-sm">
Membership
</p>

<h3 className="mt-3 text-xl font-bold text-[#FFD700]">

Premium

</h3>

</Card>

</div>

<div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={() => setIsEditing(true)}
className="
w-full
sm:w-auto
px-7
py-3.5
rounded-2xl
font-bold
text-black
bg-gradient-to-r
from-[#8B5E3C]
via-[#C89A4A]
to-[#FFD700]
transition-all
duration-300
hover:scale-105
hover:shadow-[0_0_25px_rgba(212,175,55,.35)]
active:scale-95
">
                  Edit Profile
                </button>

                <button
                  onClick={() => setShowPassword(true)}
className="
w-full
sm:w-auto
px-7
py-3.5
rounded-2xl
font-bold
text-white
bg-gradient-to-r
from-[#1E3A8A]
via-[#2563EB]
to-[#3B82F6]
transition-all
duration-300
hover:scale-105
hover:shadow-[0_0_25px_rgba(59,130,246,.35)]
active:scale-95
"                >
                  Change Password
                </button>

              </div>
            </>
          )}
          <Card className="mt-8 p-6 rounded-3xl border border-[#D4AF37]/20">

<h2 className="text-2xl font-bold text-white mb-6">
🔐 Account Security
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

<Card className="p-5 text-center">

<p className="text-gray-400">
Account Status
</p>

<h2 className="mt-3 text-2xl font-bold text-green-400">
Active
</h2>

</Card>

<Card className="p-5 text-center">

<p className="text-gray-400">
Profile Completion
</p>

<h2 className="mt-3 text-2xl font-bold text-[#FFD700]">
100%
</h2>

</Card>

<Card className="p-5 text-center">

<p className="text-gray-400">
Password Status
</p>

<h2 className="mt-3 text-2xl font-bold text-cyan-400">
Secure
</h2>

</Card>

<Card className="p-5 text-center">

<p className="text-gray-400">
Last Login
</p>

<h2 className="mt-3 text-xl font-bold text-white">

{new Date().toLocaleDateString()}

</h2>

</Card>

</div>

</Card>
<Card className="mt-8 p-6 rounded-3xl border border-[#D4AF37]/20">

<h2 className="text-2xl font-bold text-white">
Profile Strength
</h2>

<div className="mt-6">

<div className="h-4 rounded-full bg-[#252525] overflow-hidden">

<div
className="
h-full
rounded-full
bg-gradient-to-r
from-[#8B5E3C]
via-[#D4AF37]
to-[#FFD700]
"
style={{
width:"100%"
}}
/>

</div>

<p className="mt-4 text-[#FFD700] font-semibold">

✔ Your account is fully configured.

</p>

</div>

</Card>

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
                 className="
px-7
py-3.5
rounded-2xl
font-bold
text-black
bg-gradient-to-r
from-[#8B5E3C]
via-[#C89A4A]
to-[#FFD700]
transition-all
duration-300
hover:scale-105
hover:shadow-[0_0_25px_rgba(212,175,55,.35)]
"
                >
                  Save Changes
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="
px-7
py-3.5
rounded-2xl
font-bold
text-white
bg-[#2A2A2A]
border
border-[#444]
transition-all
duration-300
hover:bg-[#333]
"
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

              <div className="mt-6 flex flex-col sm:flex-row gap-4">

                <button
                  onClick={handleChangePassword}
                 className="
px-7
py-3.5
rounded-2xl
font-bold
text-white
bg-gradient-to-r
from-[#5B1010]
via-[#A31F1F]
to-[#D83434]
transition-all
duration-300
hover:scale-105
hover:shadow-[0_0_25px_rgba(220,38,38,.35)]
"
                >
                  Update Password
                </button>

                <button
                  onClick={() => setShowPassword(false)}
                 className="
px-7
py-3.5
rounded-2xl
font-bold
text-white
bg-[#2A2A2A]
border
border-[#444]
transition-all
duration-300
hover:bg-[#333]
"
                >
                  Cancel
                </button>

              </div>
            </>
          )}
</div>
        </Card>
      </PageContainer>
    </MainLayout>
  );
}