import React from "react";
import "./Admin.css";
const Admin = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Dashboard</h2>
        <div className="comments-section">
          <h3>Comments</h3>
          <p>You have 34 comments</p>
          <ul>
            {[
              "Username 1",
              "Username 2",
              "Username 3",
              "Username 4",
              "Username 5",
              "Username 6",
            ].map((user, index) => (
              <li key={index}>
                <span className="user-avatar" />
                <div className="comment-text">
                  <span>{user}</span>
                  <p>Lorem ipsum dolor sit</p>
                </div>
                <span className="view-icon">👁️</span>
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
                email: "rezaimohammad@gmail.com",
                date: "October 25th, 2020 08:55 AM",
                title:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
              },
              {
                email: "johndoe@gmail.com",
                date: "October 25th, 2020 08:55 AM",
                title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
              },
              {
                email: "janedoe@mail.com",
                date: "October 25th, 2020 08:55 AM",
                title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
              },
            ].map((post, index) => (
              <li key={index} className="post-item">
                <div className="post-info">
                  <span className="post-avatar" />
                  <div className="post-text">
                    <span>{post.email}</span>
                    <p>{post.date}</p>
                    <h4>{post.title}</h4>
                    <p>{post.description}</p>
                  </div>
                </div>
                <div className="post-actions">
                  <button className="action-btn delete-btn">🗑️</button>
                  <button className="action-btn edit-btn">✏️</button>
                  <button className="action-btn view-btn">👁️</button>
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