import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCommentsData } from "../../data/comments";
import Comment from "./Comment";
import { jwtDecode } from "jwt-decode";
import CommentForm from "./CommentForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CommentsContainer = ({
  className,
  logginedUserId,
  comments,
  postId,
}) => {
  //!State
  const [affectedComment, setAffectedComment] = useState(null);
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const mainComment = comment.filter((comment) => comment.parent === null);
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [commentByPostId, setCommentByPostId] = useState(null);
  console.log("commentByPostId", commentByPostId);

  //! Lấy logginedUserId từ token
  const token = userState?.userInfo?.token || localStorage.getItem("token");
  logginedUserId = token ? jwtDecode(token).id : null;

  //!Function
  useEffect(() => {
    fetchComments();
    // fetchCommentByPostId();
  }, [comment.length, comment.content]);

  // const fetchComments = async () => {
  //   const data = await getCommentsData();
  //   setComment(data);
  // };

  const fetchComments = async () => {
    console.log("postId", postId);

    try {
      const response = await axios.get(
        `http://localhost:9999/comment/api/posts/${postId}/comments`
      );
      const fetchedComments = response.data.data || [];
      setComment(fetchedComments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setLoading(false);
    }
  };

  //! Add Comment
  const addCommentHandler = async (
    value,
    parent = null,
    replyOnUser = null
  ) => {
    if (!userState.userInfo) {
      navigate("/login");
      return;
    }

    try {
      const token = userState?.userInfo?.token || localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:9999/comment/api/comments",
        {
          postId: postId, // ID của bài post
          content: value,
          parent: parent,
          replyOnUser: replyOnUser,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );

      setComment((comments) =>[...comments, response.data.data]); // Thêm comment mới vào danh sách
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  //! Update Comment
  const updateCommentHandler = async (value, commentId) => {
    try {
      const token = userState?.userInfo?.token || localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:9999/comment/api/comments/${commentId}`,
        {
          content: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token in headers
            "Content-Type": "application/json",
          },
        }
      );
      setComment(
        comment.map((comment) =>
          comment._id === commentId ? response.data : comment
        )
      );
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };
  //report
  const reportCommentHandler = async (commentId) => {
    if (!userState.userInfo) {
      navigate("/login");
      return;
    }

    try {
      const token = userState?.userInfo?.token || localStorage.getItem("token");
      const reason = prompt("Please provide a reason for reporting this comment:");
      if (!reason) return; // Nếu không có lý do, hủy thao tác

      await axios.post(`http://localhost:9999/comment/api/comments/${commentId}/report`, {
        reason: reason,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });

      alert("Comment reported successfully");
    } catch (error) {
      console.error("Error reporting comment:", error);
      alert("An error occurred while reporting the comment.");
    }
  };

  //! Delete Comment
  const deleteCommentHandler = async (commentId) => {
    try {
      const token = userState?.userInfo?.token || localStorage.getItem("token");
      await axios.delete(
        `http://localhost:9999/comment/api/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComment(comment.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  //! Get Replies
  const getReplies = (commentId) => {
    return comment
      ? comment.filter((comment) => comment.parent === commentId)
      : [];
  };

  if (loading) return <div>Loading comments...</div>; // Display loading message

  //! Render

  // const addCommentHandler = (value, parent = null, replyOnUser = null) => {
  //   const newComment = {
  //     _id: Math.random().toString(),
  //     user: {
  //       _id: "a",
  //       name: "Mohammad Rezaii",
  //     },
  //     content: value,
  //     post: "1",
  //     parent: parent,
  //     replyOnUser: replyOnUser,
  //     createdAt: "2022-12-31T17:22:05.092+0000",
  //   };
  //   setComment([...comment, newComment]);
  // };

  // const getRepliesComment = (commentId) => {
  //   return comment.filter((comment) => comment.parent === commentId);
  // };

  //!Render
  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel={userState.userInfo ? "Send" : "Login to comment"}
        formSubmitHanlder={
          userState.userInfo
            ? (value) => addCommentHandler(value)
            : () => navigate("/login")
        }
      />
      <div className="mt-8 space-y-4">
        {mainComment.map((comment) => (
          <Comment
            key={comment?._id}
            comment={comment}
            logginedUserId={logginedUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            // deleteComment={ deleteCommentHandler(comment._id)}
            deleteComment={deleteCommentHandler}
            updateComment={updateCommentHandler}
            reportComment={reportCommentHandler} // Truyền hàm vào đây
            replies={getReplies(comment._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
