import React, { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../../components/MainLayout";
import ProfilePicture from "../../components/ProfilePicture";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const account = JSON.parse(localStorage.getItem("account"));
  const token = account?.token;
  const userId = account?.user?.id;

  useEffect(() => {
    const account = JSON.parse(localStorage.getItem("account"));
    const token = account?.token;
    // Nếu không có token, chuyển hướng đến trang đăng nhập
    if (!token) {
      toast.error("Please login to access this page.");
      navigate("/login"); // Đường dẫn tới trang đăng nhập
    }
  }, [navigate]);
  // Hàm xử lý khi submit form
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Kiểm tra nếu không có thay đổi nào được thực hiện
    if (!name && !password) {
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
    // Nếu có nhập mật khẩu nhưng thiếu confirm password hoặc không khớp
    if (password.length > 0 || confirmPassword.length > 0) {
      // Kiểm tra độ dài mật khẩu
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        setLoading(false);
        return;
      }

      // Kiểm tra confirm password có khớp với password không
      if (password !== confirmPassword) {
        toast.error("Passwords do not match. Please try again.");
        setLoading(false);
        return;
      }
    }

    try {
      // Tạo object chứa dữ liệu cần cập nhật
      const updateData = {};

      if (name) {
        updateData.name = name;
      }
      if (password) {
        updateData.password = password;
      }

      // Gọi API với phương thức PUT hoặc PATCH
      const response = await axios.patch(
        `http://localhost:9999/account/api/updateProfile/${userId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        }
      );

      // Xử lý phản hồi thành công
      console.log("Profile updated successfully:", response.data);

      // Cập nhật localStorage với tên mới nếu cần
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

      // Thông báo thành công
      toast.success(response.data.message);
    } catch (error) {
      // Xử lý lỗi khi gọi API
      if (error.response) {
        // Lỗi trả về từ server
        console.error("Error updating profile:", error.response.data);
        toast.error(error.response.data.message);
      } else {
        // Lỗi khác (như mất kết nối mạng)
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile. Please try again.");
      }
    } finally {
      setLoading(false); // Dừng trạng thái loading
    }
  };

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="mx-auto w-full max-w-sm">
          <ProfilePicture />
          <form onSubmit={submitHandler}>
            <div className="mb-6 flex w-full flex-col">
              <label
                htmlFor="name"
                className="block font-semibold text-[#5a7184]"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter new name"
                defaultValue={account.user.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-6 flex w-full flex-col">
              <label
                htmlFor="password"
                className="block font-semibold text-[#5a7184]"
              >
                New Password (optional)
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter new password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-6 flex w-full flex-col">
              <label
                htmlFor="password"
                className="block font-semibold text-[#5a7184]"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="cf_password"
                placeholder="Enter new password"
                value={confirmPassword || ""}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="mb-6 w-full rounded-lg bg-primary py-4 px-8 text-lg font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
              disabled={loading} // Vô hiệu hóa nút khi đang loading
            >
              {loading ? "Updating..." : "Update"}{" "}
              {/* Thay đổi text khi loading */}
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
