import React, { useEffect, useState } from "react";
import "./Admin.css";
import axios from "axios";
import { FaRegEye, FaBell, FaCheckDouble } from "react-icons/fa";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { images } from "../../../constants";

const Admin = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Giả sử logginedUserId được lấy từ Redux hoặc state nào đó
  const logginedUserId = "id_người_dùng";

  useEffect(() => {
    if (showPopUp) {
      fetchNotifications();
    }
  }, [showPopUp]);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:9999/api/notifications/${logginedUserId}`);
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Lỗi khi lấy thông báo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async () => {
    try {
      await axios.patch(`http://localhost:9999/api/notifications/mark-all-read`, {
        userId: logginedUserId
      });
      setNotifications(
        notifications.map((notification) => ({
          ...notification,
          isRead: true
        }))
      );
    } catch (error) {
      console.error("Lỗi khi đánh dấu là đã đọc:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar mt-8">
        <h2>Dashboard</h2>
        <div className="comments-section">
          <h3>Comments</h3>
          <p className="mb-5 text-red-500">You have 34 comments</p>
          <ul className="flex flex-col gap-5">
            {[
              "Username 1",
              "Username 2",
              "Username 3",
              "Username 4",
              "Username 5",
              "Username 6",
            ].map((user, index) => (
              <li key={index} className="flex items-center gap-2">
                <img
                  src={images.userImage}
                  alt="user"
                  className="h-9 w-9 rounded-full"
                />
                <div className="comment-text">
                  <span>{user}</span>
                  <p>Lorem ipsum dolor sit</p>
                </div>
                <Tooltip content="View">
                  <IconButton variant="text" className="flex justify-center">
                    <FaRegEye className="h-4 w-4" color="blue" />
                  </IconButton>
                </Tooltip>
              </li>
            ))}
          </ul>
          <button className="view-more-btn">View More</button>
        </div>
      </div>

      <div className="main-content">
        <div className="search-bar flex items-center gap-2.5">
          <input
            type="text"
            placeholder="Search here"
            className="rounded-md border p-2"
          />
          <button className="rounded-md bg-blue-500 px-4 py-2 text-white">
            🔍
          </button>
          <div className="relative">
            <FaBell
              className="h-10 w-10 cursor-pointer text-blue-500"
              onClick={() => setShowPopUp(!showPopUp)}
            />
            <div className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-600"></div>

            {showPopUp && (
              <div className="absolute top-12 right-0 z-50 w-96 rounded-md bg-white p-4 shadow-lg">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xl font-bold">Notifications</span>
                  <div
                    className="flex cursor-pointer items-center gap-2 text-green-500"
                    onClick={handleMarkAsRead}
                  >
                    <FaCheckDouble />
                    <span>Mark as Read</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  {isLoading ? (
                    <div>Đang tải thông báo...</div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification._id}
                        className={`flex items-center justify-between rounded-xl ${notification.isRead ? "bg-gray-100" : "bg-cyan-100"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={images.userImage}
                            alt="user"
                            className="h-9 w-9 rounded-full"
                          />
                          <div>
                            <span>{notification.content}</span>
                            <p className="text-sm text-gray-500">
                              {new Date(notification.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(notification.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="posts-section">
          <h3>Recent Posts</h3>
          <ul>
            {[
              {
                email: "duytran@gmail.com",
                date: "October 25th, 2020 08:55 AM",
                title:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                image: images.userImage,
              },
              {
                email: "duytran@gmail.com",
                date: "October 25th, 2020 08:55 AM",
                title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                image: images.userImage,
              },
              {
                email: "duytran@gmail.com",
                date: "October 25th, 2020 08:55 AM",
                title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                image: images.userImage,
              },
            ].map((post, index) => (
              <li
                key={index}
                className="post-item flex items-center justify-between gap-2"
              >
                <div className="post-info flex items-center gap-3">
                  <img
                    src={post.image}
                    alt="user"
                    className="h-9 w-9 rounded-full"
                  />
                  <div className="post-text">
                    <span>{post.email}</span>
                    <p>{post.date}</p>
                    <h4>{post.title}</h4>
                    <p>{post.description}</p>
                  </div>
                </div>
                {/* <div className="post-actions flex gap-2">
                  <Tooltip content="View">
                    <IconButton variant="text" className="flex justify-center">
                      <FaRegEye className="h-4 w-4" color="blue" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip content="Edit">
                    <IconButton variant="text" className="flex justify-center">
                      <MdModeEdit className="h-4 w-4" color="yellow" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip content="Delete">
                    <IconButton variant="text" className="flex justify-center">
                      <MdDelete className="h-4 w-4" color="red" />
                    </IconButton>
                  </Tooltip>
                </div> */}
              </li>
            ))}
          </ul>
          <button className="view-more-btn">View More</button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
