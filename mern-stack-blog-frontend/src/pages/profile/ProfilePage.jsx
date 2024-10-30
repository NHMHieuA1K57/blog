import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MainLayout from "../../components/MainLayout";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiX } from "react-icons/fi";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const account = JSON.parse(localStorage.getItem("account"));
  const token = account?.token;
  const userId = account?.user?.id;

  useEffect(() => {
    const account = JSON.parse(localStorage.getItem("account"));
    const token = account?.token;
    if (!token) {
      toast.error("Please login to access this page.");
      navigate("/login");
    } else {
      // Hiển thị ảnh đại diện của người dùng nếu có
      const userImage = account.user.profileImage; // Giả sử bạn có trường này trong user
      if (userImage) {
        setProfileImage(userImage);
      }
    }
  }, [navigate]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!name && !password && !profileImage) {
      toast("You have not made any changes!", {
        icon: "⚠️",
        style: {
          border: "1px solid #FFA500",
          padding: "16px",
          color: "#FFA500",
        },
      });
      setLoading(false);
      return;
    }
  
    if (password.length > 0 || confirmPassword.length > 0) {
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        setLoading(false);
        return;
      }
  
      if (password !== confirmPassword) {
        toast.error("Passwords do not match. Please try again.");
        setLoading(false);
        return;
      }
    }
  
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("password", password);
      if (profileImage) {
        // Thay đổi thành file blob khi thêm vào formData
        const blob = await fetch(profileImage).then(res => res.blob());
        formData.append("images", blob, "profileImage.png");
      }
  
      const response = await axios.patch(
        `http://localhost:9999/account/api/updateProfile/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Chỉ định loại nội dung
          },
        }
      );
  
      console.log("Profile updated successfully:", response.data);
  
      if (name) {
        localStorage.setItem(
          "account",
          JSON.stringify({
            ...account,
            user: {
              ...account.user,
              username: name,
            },
          })
        );
      }
  
      toast.success(response.data.message);
    } catch (error) {
      if (error.response) {
        console.error("Error updating profile:", error.response.data);
        toast.error(error.response.data.message);
      } else {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-6">
            <label className="block font-semibold text-[#5a7184]">
              Avatar User
            </label>
            <div className="flex items-center justify-center">
              {profileImage ? (
                <div className="relative">
                  <img src={profileImage} alt="Profile" className="rounded" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-0 right-0 m-1 rounded-full bg-red-500 p-1 text-white"
                    aria-label="Remove image"
                  >
                    <FiX />
                  </button>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <label
                    htmlFor="profile-image"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="profile-image"
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                      ref={fileInputRef}
                      accept="image/*"
                    />
                  </label>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </div>
          
          <form onSubmit={submitHandler}>
            <div className="mb-6">
              <label className="block font-semibold text-[#5a7184]">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter new name"
                defaultValue={account.user.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block font-semibold text-[#5a7184]">
                New Password (optional)
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block font-semibold text-[#5a7184]">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="mb-6 w-full rounded-lg bg-primary py-4 px-8 text-lg font-bold text-white"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
