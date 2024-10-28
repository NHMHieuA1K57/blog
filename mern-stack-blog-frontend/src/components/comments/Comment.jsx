import React from "react";
import { FiMessageSquare, FiEdit2, FiTrash, FiFlag } from "react-icons/fi";

import { images } from "../../constants";
import CommentForm from "./CommentForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Comment = ({
  comment,
  logginedUserId,
  affectedComment,
  setAffectedComment,
  addComment,
  deleteComment,
  reportComment,
  updateComment,
  parentId = null,
  replies,
}) => {
  const isUserLoggined = !!logginedUserId;
  const commentBelongsToUser = comment.account?._id === logginedUserId;
  const isReplying =
    affectedComment &&
    affectedComment?.type === "replying" &&
    affectedComment?._id === comment?._id;
  const isEditing =
    affectedComment &&
    affectedComment?.type === "editing" &&
    affectedComment?._id === comment?._id;
  const repliedCommentId = parentId ? parentId : comment?._id;
  const replyOnUserId = comment.user?._id;
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleReport = () => {
    // Add the logic for reporting the comment here
    console.log(`Reported comment ID: ${comment?._id}`);
  };

  return (
    <div
      className="flex flex-nowrap items-start gap-x-3 rounded-lg bg-[#F2F4F5] p-3"
      id={`comment-${comment?._id}`}
    >
      <img
        src={images.PostProfileImage}
        alt="user profile"
        className="h-9 w-9 rounded-full object-cover"
      />
      <div className="flex flex-1 flex-col">
        <h5 className="text-xs font-bold text-dark-hard lg:text-sm">
          {comment.account?._id}
        </h5>
        <span className="text-xs text-dark-light">
          {new Date(comment.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>
        <p className="mt-[10px] font-opensans text-dark-light">
          {comment.content}
        </p>

        {isEditing && (
          <CommentForm
            btnLabel="Update"
            formSubmitHanlder={(value) => updateComment(value, comment._id)}
            formCancelHandler={() => setAffectedComment(null)}
            initialText={comment.content}
          />
        )}
        <div className="mt-3 mb-3 flex items-center gap-x-3 font-roboto text-sm text-dark-light">
          {isUserLoggined && (
            <button
              className="flex items-center space-x-2"
              onClick={() =>
                setAffectedComment({ type: "replying", _id: comment?._id })
              }
            >
              <FiMessageSquare className="h-auto w-4" />
              <span>Reply</span>
            </button>
          )}
          {commentBelongsToUser && (
            <>
              <button
                className="flex items-center space-x-2"
                onClick={() =>
                  setAffectedComment({ type: "editing", _id: comment?._id })
                }
              >
                <FiEdit2 className="h-auto w-4" />
                <span>Edit</span>
              </button>
              <button
                className="flex items-center space-x-2"
                onClick={() => deleteComment(comment?._id)}
              >
                <FiTrash className="h-auto w-4" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
        <button
          className="flex items-center space-x-2 text-red-500"
          onClick={() => reportComment(comment._id)} // Gọi hàm reportComment
        >
          <FiFlag className="h-auto w-4" />
          <span>Report</span>
        </button>

        {isReplying && (
          <CommentForm
            btnLabel={userState.userInfo ? "Reply" : "Login to rep comment"}
            formSubmitHanlder={
              userState.userInfo
                ? (value) => addComment(value, repliedCommentId, replyOnUserId)
                : () => navigate("/login")
            }
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}
        {replies.length > 0 && (
          <div>
            {replies.map((reply) => (
              <Comment
                key={reply._id}
                addComment={addComment}
                affectedComment={affectedComment}
                setAffectedComment={setAffectedComment}
                comment={reply}
                logginedUserId={logginedUserId}
                replies={[]}
                reportComment={reportComment}
                deleteComment={deleteComment}
                updateComment={updateComment}
                parentId={comment?._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
