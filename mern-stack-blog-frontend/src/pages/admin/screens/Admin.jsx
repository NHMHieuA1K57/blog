import { IconButton, Tooltip } from "@material-tailwind/react";
import React, { useState } from "react";
import { FaBell, FaCheckDouble, FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { images } from "../../../constants";
import { pageUrls } from "../../../constants/pageUrls";
import useGetDataPosts from "../../../hooks/useGetDataPosts";
import "./Admin.css";

const Admin = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const { data, isLoading } = useGetDataPosts();
  const navigate = useNavigate();
  const top3Posts = data.slice(0, 3);

  if (isLoading) {
    return <LoadingSpinner />;
  }
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
                  <span className="text-xl font-bold">Notification</span>
                  <div className="flex cursor-pointer items-center gap-2 text-green-500">
                    <FaCheckDouble />
                    <span>Mark as Read</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  {/* Notifications List */}
                  <div className="flex items-center justify-between rounded-xl bg-cyan-100 ">
                    <div className="flex items-center gap-3">
                      <img
                        src={images.userImage}
                        alt="user"
                        className="h-9 w-9 rounded-full"
                      />
                      <div>
                        <span>Mehbubur just up a post</span>
                        <p className="text-sm text-gray-500">Thursday 3:12pm</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">Today</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-cyan-100 ">
                    <div className="flex items-center gap-3">
                      <img
                        src={images.userImage}
                        alt="user"
                        className="h-9 w-9 rounded-full"
                      />
                      <div>
                        <span>@Mehbubur just up a post</span>
                        <p className="text-sm text-gray-500">Thursday 3:12pm</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">3 hours ago</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-cyan-100">
                    <div className="flex items-center gap-3">
                      <img
                        src={images.userImage}
                        alt="user"
                        className="h-9 w-9 rounded-full"
                      />
                      <div>
                        <span>Alina just up a post</span>
                        <p className="text-sm text-gray-500">Thursday 3:12pm</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">3 hours ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="sidebar" style={{ width: "100%" }}>
          <div className="posts-section">
            <h3>Recent Posts</h3>
            <ul>
              {top3Posts.map((post, index) => (
                <li
                  key={index}
                  className="post-item flex items-center justify-between gap-2"
                >
                  <div className="post-info flex items-center gap-3">
                    <img
                      src={post.images[0]}
                      alt="user"
                      className="h-9 w-9 rounded-full"
                    />
                    <div className="post-text">
                      <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                      <h4>{post.title}</h4>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="view-more-btn"
              onClick={() => navigate(pageUrls.POSTS)}
            >
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
