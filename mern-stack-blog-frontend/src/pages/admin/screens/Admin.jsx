import React from "react";
import "./Admin.css";
import { FaRegEye } from "react-icons/fa";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { images } from "../../../constants";

const Admin = () => {
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
              <li key={index}>
                <img src={images.userImage} alt="user" className="w-9 h-9"/>
                <div className="comment-text">
                  <span>{user}</span>
                  <p>Lorem ipsum dolor sit</p>
                </div>
                <Tooltip content="View" >
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
        <div className="search-bar">
          <input type="text" placeholder="Search here" />
          <button>🔍</button>
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
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
                image: images.userImage,
              },
              {
                email: "duytran@gmail.com",
                date: "October 25th, 2020 08:55 AM",
                title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
                image: images.userImage,
              },
              {
                email: "duytran@gmail.com",
                date: "October 25th, 2020 08:55 AM",
                title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
                image: images.userImage,
              },
            ].map((post, index) => (
              <li key={index} className="post-item">
                <div className="post-info gap-2">
                  <img src={post.image} alt="user" className="w-9 h-9"/>
                  <div className="post-text">
                    <span>{post.email}</span>
                    <p>{post.date}</p>
                    <h4>{post.title}</h4>
                    <p>{post.description}</p>
                  </div>
                </div>
                <div className="post-actions">
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
                </div>
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