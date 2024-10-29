import React, { useState, useEffect } from "react";
import { images } from "../../../../constants";
import DataTable from "../../components/DataTable";
import axios from "axios";
import { FaBan } from "react-icons/fa";
import { FaSort } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Trạng thái sắp xếp

  const account = JSON.parse(localStorage.getItem("account"));
  const token = account?.token;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9999/account/api/getUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Some thing went wrong, cannot get users.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Hàm sắp xếp user theo tổng report
  const sortUsersByReports = () => {
    const sortedUsers = [...users].sort((a, b) => {
      return sortOrder === "asc"
        ? a.totalReport - b.totalReport
        : b.totalReport - a.totalReport;
    });
    setUsers(sortedUsers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Đổi chiều sắp xếp sau mỗi lần bấm
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleBanUser = async (userId, totalReport) => {
    if (totalReport < 5) {
      const confirmBan = window.confirm(
        "This user has less than 5 reports. Are you sure want to ban this user?"
      );
      if (!confirmBan) return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:9999/account/api/changeStatusBan/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.data;
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id
            ? { ...user, isBan: updatedUser.isBan }
            : user
        )
      );
    } catch (error) {
      console.error("Không thể ban user:", error);
    }
  };

  const handleUnbanUser = async (userId) => {
    try {
      const response = await axios.patch(
        `http://localhost:9999/account/api/changeStatusBan/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.data;
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id
            ? { ...user, isBan: updatedUser.isBan }
            : user
        )
      );
    } catch (error) {
      console.error("Không thể unban user:", error);
    }
  };

  return (
    <DataTable
      pageTitle="Manage Users"
      dataListName="Users"
      searchInputPlaceHolder="User's email..."
      searchKeywordOnChangeHandler={(e) => setSearchKeyword(e.target.value)}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        "Name",
        "Email",
        "Created At",
        "Total Report",
        "Status",
        "Action",
      ]}
      data={filteredUsers}
      isLoading={loading}
    >
      <button
        onClick={sortUsersByReports}
        className="mb-4 flex items-center rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <FaSort className="mr-2 text-white" />
        <span>
          Sort by Total Report (
          {sortOrder === "asc" ? "Ascending" : "Descending"})
        </span>
      </button>

      {filteredUsers.map((user) => (
        <tr key={user._id}>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    src={user.avatar || images.userImage}
                    className="mx-auto aspect-square w-10 rounded-lg object-cover"
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="whitespace-no-wrap text-gray-900">{user.name}</p>
              </div>
            </div>
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <p className="whitespace-no-wrap text-gray-900">{user.email}</p>
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <p className="whitespace-no-wrap text-gray-900">
              {new Date(user.createdAt).toLocaleDateString("vi-VN")}
            </p>
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <p className="whitespace-no-wrap text-gray-900">
              {user.totalReport}
            </p>
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            {user.isBan ? (
              <span className="text-red-600">User has been banned</span>
            ) : (
              <span className="text-green-600">User is active</span>
            )}
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <button
              type="button"
              className="disabled:cursor-not-allowed disabled:opacity-70"
              onClick={() =>
                user.isBan
                  ? handleUnbanUser(user._id)
                  : handleBanUser(user._id, user.totalReport)
              }
            >
              {user.isBan ? (
                <FaBan color="green" title="Unban User" fontSize={25} />
              ) : (
                <FaBan color="red" title="Ban User" fontSize={25} />
              )}
            </button>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default Users;
