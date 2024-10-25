import React, { useEffect, useState } from "react";

import { getCommentsData } from "../../data/comments";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CommentsContainer = ({ className, logginedUserId, comments }) => {
  //!State
  const [affectedComment, setAffectedComment] = useState(null);
  const [comment, setComment] = useState([]);
  const mainComment = comment.filter((comment) => comment.parent === null);
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  //!Function
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const data = await getCommentsData();
    setComment(data);
  };

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    const newComment = {
      _id: Math.random().toString(),
      user: {
        _id: "a",
        name: "Mohammad Rezaii",
      },
      desc: value,
      post: "1",
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: "2022-12-31T17:22:05.092+0000",
    };
    setComment([...comment, newComment]);
  };

  const getRepliesComment = (commentId) => {
    return comment.filter((comment) => comment.parent === commentId);
  };

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
            key={comment._id}
            comment={comment}
            logginedUserId={logginedUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            replies={getRepliesComment(comment._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
